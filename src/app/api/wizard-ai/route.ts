import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getAllTools, getCategories } from '@/lib/db'
import { scoreTools } from '@/lib/search'
import { getQuestionById } from '@/lib/wizard'
import type { Question } from '@/lib/wizard'

const CATEGORY_IDS = [
  'animation', 'image', 'writing', 'coding', 'audio', 'chat', '3d',
  'productivity', 'marketing', 'finance', 'accounting', 'legal', 'hr',
  'construction', 'data', 'education',
]

const VALID_QUESTION_IDS =
  'budget, skill, use_case, watermark, commercial, privacy, cloning, citations, ' +
  'context, duration, realism, volume, voice, project, source, engine, team, ' +
  'stack, channel, level, scale, firm, subject, quality'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { step, query, answers } = body as {
    step: string
    query: string
    answers?: Record<string, string>
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
      ? topCandidates.map(r => `• ${r.tool.name} [${r.catId}]: ${r.tool.tagline}`).join('\n')
      : '(no keyword matches yet)'

    let raw: string | null = null
    try {
      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: `You interpret search queries for an AI tools marketplace. Return JSON only — no markdown, no fences.

Available categories: ${CATEGORY_IDS.join(', ')}
Valid question IDs: ${VALID_QUESTION_IDS}`,
        messages: [{
          role: 'user',
          content: `Query: "${query}"

Top tools currently matching:
${toolSummaries}

Return this JSON structure exactly:
{
  "categoryId": "one of the available categories, or null if unclear",
  "intentSummary": "one plain sentence describing what the user wants to accomplish",
  "prefilled": {
    "questionId": { "value": "optionValue", "reason": "short phrase shown to user" }
  },
  "questionIds": ["2-3 most useful question IDs for this specific query"],
  "noIntent": false
}

For prefilled, only include entries clearly implied by the query:
  budget: "free" | "low" | "mid" | "any"
  skill: "none" | "some" | "dev"
  use_case: depends on category (e.g. "marketing", "social", "tts", "coding")
  commercial: "commercial" | "personal" if client/business use is obvious`,
        }],
      })
      raw = response.content[0].type === 'text' ? response.content[0].text.trim() : null
    } catch {
      return Response.json({ error: 'api_error' }, { status: 500 })
    }

    if (!raw) return Response.json({ error: 'no_response' }, { status: 500 })

    let parsed: {
      categoryId: string | null
      intentSummary: string
      prefilled: Record<string, { value: string; reason: string }>
      questionIds: string[]
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
    const questions: Question[] = []
    for (const id of (parsed.questionIds ?? [])) {
      if (prefilled[id]) continue
      const q = getQuestionById(id, parsed.categoryId)
      if (q) questions.push(q)
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

    const answersText = answers && Object.keys(answers).length
      ? Object.entries(answers).map(([k, v]) => `${k}=${v}`).join(', ')
      : 'none provided'

    let raw: string | null = null
    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1400,
        system: `You are the recommendation engine for an AI tools marketplace. Rank tools for a specific user's exact need. Return JSON only — no markdown, no fences.`,
        messages: [{
          role: 'user',
          content: `User query: "${query}"
User answers: ${answersText}

Tools to rank (rank best-to-worst fit for this specific user):
${JSON.stringify(toolDetails)}

Return:
{
  "results": [
    {
      "toolId": 123,
      "catId": "categoryId",
      "reason": "one specific sentence about why this fits or doesn't fit this exact user's stated need",
      "strengths": ["up to 2 concrete strengths relevant to this user"],
      "mismatches": ["at most 1 significant mismatch — omit array if none"]
    }
  ]
}`,
        }],
      })
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
