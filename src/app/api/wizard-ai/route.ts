import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getAllTools, getCategories } from '@/lib/db'
import { scoreTools } from '@/lib/search'
import type { Question, QuestionOption } from '@/lib/wizard'

const CATEGORY_IDS = [
  'animation', 'image', 'writing', 'coding', 'audio', 'chat', '3d',
  'productivity', 'marketing', 'finance', 'accounting', 'legal', 'hr',
  'construction', 'data', 'education',
]

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { step, query, answers, qaPairs } = body as {
    step: string
    query: string
    answers?: Record<string, string>
    qaPairs?: Array<{ q: string; a: string; inferred?: string }>
  }

  if (!query?.trim()) {
    return Response.json({ error: 'missing_query' }, { status: 400 })
  }

  const client = new Anthropic({ apiKey: process.env.CLAUDE_KEY ?? process.env.ANTHROPIC_API_KEY })

  // ── Layer 1+2: Interpret query and select personalised questions ───────────
  if (step === 'plan') {
    const [tools, categories] = await Promise.all([getAllTools(), getCategories()])
    const allCandidates = scoreTools(query, tools, categories, 0)
    const topCandidates = allCandidates.slice(0, 8)

    const toolSummaries = topCandidates.length
      ? topCandidates.map(r => {
          const t = r.tool
          const free = t.freeTierLabel ? ` · ${t.freeTierLabel}` : ''
          const api = t.apiAccess ? ' · API' : ''
          const wm = t.watermark ? ' · watermarks output' : ''
          const tags = t.tags?.length ? ` · tags: ${t.tags.join(', ')}` : ''
          return `• ${t.name} [${r.catId}] — ${t.tagline} (${t.price}${free}${api}${wm}${tags})`
        }).join('\n')
      : '(no keyword matches yet)'

    let raw: string | null = null
    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: `You design clarifying questions for an AI-tools search wizard. The user just typed a search; the goal of the questions is to discriminate between the actual candidate tools so the final ranking lands on the right one. Return JSON only — no markdown, no fences.

Available categories: ${CATEGORY_IDS.join(', ')}`,
        messages: [{
          role: 'user',
          content: `User query: "${query}"

Candidate tools (top keyword matches — these are who we're choosing between):
${toolSummaries}

Design 0–3 clarifying questions whose answers would meaningfully change which of these candidates wins. Each question MUST:
- Target a real differentiator visible in the candidate set above (price tier, watermark, API access, output style, use case, scale, etc.) — not a generic survey question.
- Have 3–5 concrete options. Option labels should describe a real-world situation, not abstract values. Each option may include a short \`hint\` that names the kind of tool it favours.
- Skip the question entirely if the answer is already implied by the query — put it in \`prefilled\` instead.
- Be useful: if the user picks differently, a different candidate should win. If two options collapse to the same ranking, drop one.

Return ZERO questions when the query already names a specific tool, or when the candidates are essentially interchangeable for the stated need.

Return this JSON exactly:
{
  "categoryId": "<one category id from the list, or null if unclear>",
  "intentSummary": "<one plain sentence describing what the user wants to accomplish>",
  "prefilled": {
    "<questionId>": { "value": "<optionValue>", "reason": "<short phrase shown to the user>" }
  },
  "questions": [
    {
      "id": "<kebab-case-slug>",
      "text": "<the question, addressed to the user>",
      "helper": "<one short line explaining how this changes the recommendation>",
      "options": [
        { "value": "<slug>", "label": "<short concrete answer>", "hint": "<optional: names the kind of tool this favours>" }
      ]
    }
  ],
  "noIntent": false
}

Set noIntent=true ONLY if the query has no recognisable AI-tool intent at all (e.g. gibberish, a personal question). Use prefilled for anything obvious from the query: budget hints ("free", "cheap", "enterprise"), skill ("developer", "non-technical"), commercial use ("for clients"), watermark concerns, etc. Keep questionIds short and lowercase.`,
        }],
      })
      console.log('[wizard-ai] plan usage', { model: response.model, ...response.usage })
      raw = response.content[0].type === 'text' ? response.content[0].text.trim() : null
    } catch {
      return Response.json({ error: 'api_error' }, { status: 500 })
    }

    if (!raw) return Response.json({ error: 'no_response' }, { status: 500 })

    let parsed: {
      categoryId: string | null
      intentSummary: string
      prefilled: Record<string, { value: string; reason: string }>
      questions: Question[]
      noIntent: boolean
    }

    try {
      // Strip any accidental markdown fences before parsing
      const clean = raw.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '')
      parsed = JSON.parse(clean)
    } catch {
      return Response.json({ error: 'parse_error' }, { status: 500 })
    }

    const prefilled = parsed.prefilled ?? {}

    // Validate question shape: id + text + 2+ option {value,label}. Drop any question
    // whose id collides with a prefilled answer (already known).
    const seen = new Set<string>()
    const questions: Question[] = []
    for (const q of (parsed.questions ?? [])) {
      if (!q || typeof q.id !== 'string' || typeof q.text !== 'string') continue
      if (prefilled[q.id] || seen.has(q.id)) continue
      const opts: QuestionOption[] = []
      for (const o of (q.options ?? [])) {
        if (o && typeof o.value === 'string' && typeof o.label === 'string') {
          opts.push({ value: o.value, label: o.label, hint: typeof o.hint === 'string' ? o.hint : undefined })
        }
      }
      if (opts.length < 2) continue
      seen.add(q.id)
      questions.push({
        id: q.id,
        text: q.text,
        helper: typeof q.helper === 'string' ? q.helper : undefined,
        options: opts,
      })
    }

    return Response.json({
      categoryId: parsed.categoryId ?? null,
      intentSummary: parsed.intentSummary ?? '',
      prefilled,
      questions,
      noIntent: parsed.noIntent ?? false,
      candidateCount: allCandidates.length,
    })
  }

  // ── Layer 3: Holistic final ranking ───────────────────────────────────────
  if (step === 'rank') {
    const [tools, categories] = await Promise.all([getAllTools(), getCategories()])
    const candidates = scoreTools(query, tools, categories, 10)

    if (!candidates.length) {
      return Response.json({ results: [] })
    }

    // Skip Opus when ranking is already decided by keyword score:
    //  - only one candidate, or
    //  - top candidate dominates #2 (≥2× score) and has a strong absolute score.
    // The client treats missing strengths/mismatches/reason as empty.
    const top = candidates[0]
    const second = candidates[1]
    const dominant = !second || (top.score >= 100 && top.score >= second.score * 2)
    if (dominant) {
      const passthrough = candidates.slice(0, second ? 3 : 1).map(r => ({
        toolId: r.tool.id,
        catId: r.catId,
      }))
      return Response.json({ results: passthrough })
    }

    const toolDetails = candidates.map(r => ({
      id: r.tool.id,
      catId: r.catId,
      name: r.tool.name,
      tagline: r.tool.tagline,
      desc: r.tool.desc.slice(0, 140),
      price: r.tool.price,
      freeTierLabel: r.tool.freeTierLabel,
      apiAccess: r.tool.apiAccess,
      watermark: r.tool.watermark,
      rating: r.tool.rating,
      tags: r.tool.tags,
    }))

    const answersText = qaPairs?.length
      ? qaPairs.map(p => p.inferred
          ? `• ${p.q}: ${p.a} (inferred from query: ${p.inferred})`
          : `• ${p.q}: ${p.a}`).join('\n')
      : answers && Object.keys(answers).length
        ? Object.entries(answers).map(([k, v]) => `${k}=${v}`).join(', ')
        : 'none provided'

    let raw: string | null = null
    try {
      const response = await client.messages.create({
        model: 'claude-opus-4-7',
        max_tokens: 1400,
        system: `You are the recommendation engine for an AI tools marketplace. Rank tools for a specific user's exact need. Return JSON only — no markdown, no fences.`,
        messages: [{
          role: 'user',
          content: `User query: "${query}"

User context (their stated answers — read these as facts about the user's situation):
${answersText}

Tools to rank (rank best-to-worst fit for this specific user):
${JSON.stringify(toolDetails)}

CRITICAL — mismatches must reflect the user's actual situation, not the tool's defaults:
- Only flag a mismatch if it would genuinely affect THIS user given their answers above. If their context already neutralises the concern, OMIT it.
- Examples of mismatches to OMIT: "no free tier" when the user said they already pay for the parent service (e.g. ChatGPT Plus includes DALL·E 3 and Codex; Google One AI includes Gemini Advanced); "no GUI" when the user said they're a developer building something programmatic; "watermark" when the user said watermarks are fine; "expensive" when the user said price isn't a concern.
- Strengths must reference the user's stated context too — don't list generic strengths the user doesn't care about.

Return:
{
  "results": [
    {
      "toolId": 123,
      "catId": "categoryId",
      "reason": "one specific sentence tying this tool to the user's stated need and context",
      "strengths": ["up to 2 concrete strengths that matter given the user's answers"],
      "mismatches": ["at most 1 mismatch that survives the user's context — omit the array entirely if none"]
    }
  ]
}`,
        }],
      })
      console.log('[wizard-ai] rank usage', { model: response.model, ...response.usage })
      raw = response.content[0].type === 'text' ? response.content[0].text.trim() : null
    } catch {
      return Response.json({ error: 'api_error' }, { status: 500 })
    }

    if (!raw) return Response.json({ error: 'no_response' }, { status: 500 })

    try {
      const clean = raw.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '')
      const ranking = JSON.parse(clean)
      return Response.json(ranking)
    } catch {
      return Response.json({ error: 'parse_error' }, { status: 500 })
    }
  }

  return Response.json({ error: 'invalid_step' }, { status: 400 })
}
