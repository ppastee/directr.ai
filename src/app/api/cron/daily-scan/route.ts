import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { fetchRedditPosts } from '@/lib/reddit'
import { fetchProductHuntLaunches } from '@/lib/producthunt'
import { runDecayCheck, ToolForCheck } from '@/lib/decayCheck'
import { getSupabase } from '@/lib/supabase'

export const maxDuration = 60

const RECIPIENT = 'platformdirectr.ai@gmail.com'

interface NewTool {
  name: string
  tagline: string
  reason: string
  url: string
  source: 'HN' | 'PH'
  votes?: number
  urgent: boolean
}

interface DecayFlag {
  tool: string
  issue: 'broken_url' | 'redirect' | 'pricing_changed' | 'stale_record'
  detail: string
  confidence: 'high' | 'medium' | 'low'
}

interface Briefing {
  newTools: NewTool[]
  decayFlags: DecayFlag[]
  trendSummary: string
  topHNPost: { title: string; score: number; url: string } | null
  topPHLaunch: { name: string; votes: number; url: string } | null
}

async function loadToolsForCheck(): Promise<ToolForCheck[]> {
  const sb = getSupabase()
  if (!sb) return []
  const { data, error } = await sb
    .from('tools')
    .select('name,category,url,logo_domain,price,updated_at')
  if (error || !data) return []
  return data
    .filter((r) => r.url)
    .map((r) => ({
      name: r.name as string,
      category: r.category as string,
      url: r.url as string,
      logoDomain: r.logo_domain as string,
      price: (r.price as string) ?? '',
      updatedAt: (r.updated_at as string) ?? null,
    }))
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbTools = await loadToolsForCheck()

    const [redditResult, phPosts, decay] = await Promise.all([
      fetchRedditPosts(),
      fetchProductHuntLaunches(),
      runDecayCheck(dbTools),
    ])
    const { posts: hnPosts, errors: hnErrors } = redditResult

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `You are tracking the AI tools industry for Directr (directr.com.au), an AI tools directory.

Today's raw data:

## Hacker News top AI posts (last 24h)
${hnPosts.length ? hnPosts.map((p) => `- ${p.title} (${p.score} pts) — ${p.url}`).join('\n') : 'None.'}

## Product Hunt AI launches (last 24h)
${phPosts.length ? phPosts.map((p) => `- ${p.name}: ${p.tagline} (${p.votesCount} votes) — ${p.url}`).join('\n') : 'None.'}

## Decay check — raw issues found across ${decay.checked.urls} tool URLs
${decay.issues.length ? decay.issues.map((i) => `- ${i.tool} [${i.category}] ${i.issue}: ${i.detail}`).join('\n') : 'None.'}

## Pricing snapshots — compare each snippet to the DB price and flag if they look meaningfully different
${decay.pricingSnippets.length ? decay.pricingSnippets.map((p) => `- ${p.tool} (DB price: "${p.currentDbPrice}"): "${p.snippet}"`).join('\n') : 'None.'}

Return ONLY valid JSON matching this exact shape — no markdown, no explanation:
{
  "newTools": [
    { "name": string, "tagline": string, "reason": string, "url": string, "source": "HN"|"PH", "votes": number|null, "urgent": boolean }
  ],
  "decayFlags": [
    { "tool": string, "issue": "broken_url"|"redirect"|"pricing_changed"|"stale_record", "detail": string, "confidence": "high"|"medium"|"low" }
  ],
  "trendSummary": string,
  "topHNPost": { "title": string, "score": number, "url": string } | null,
  "topPHLaunch": { "name": string, "votes": number, "url": string } | null
}

Rules:
- newTools: only genuinely new tools not already famous. Max 6. Omit if none. Set urgent:true if the tool has high traction (200+ PH votes or 100+ HN pts), is clearly in a category Directr covers, and missing it would be a real gap.
- decayFlags: include every broken_url and redirect issue from the raw data verbatim (these are deterministic, mark confidence "high"). Add pricing_changed only when the pricing snippet clearly disagrees with the DB price (e.g. tier renamed, price moved >20%, free tier removed/added). Include stale_record entries only if the tool also has another decay signal — otherwise the row is just old, not necessarily wrong. Max 12 total.
- trendSummary: 1 sentence, plain text, what theme dominates today.
- topHNPost/topPHLaunch: single highest-signal item from each source.`

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = (message.content[0] as { type: string; text: string }).text
    const briefing: Briefing = JSON.parse(raw)

    const date = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

    const stat = (n: number | string, label: string) => `
    <td style="padding:0 24px 0 0;text-align:left;white-space:nowrap;">
      <div style="font-size:22px;font-weight:700;color:#111;line-height:1;">${n}</div>
      <div style="font-size:11px;color:#888;margin-top:2px;text-transform:uppercase;letter-spacing:.05em;">${label}</div>
    </td>`

    const badge = (text: string, color: string) =>
      `<span style="display:inline-block;padding:1px 7px;border-radius:3px;font-size:11px;font-weight:600;background:${color};color:#fff;margin-left:6px;vertical-align:middle;">${text}</span>`

    const confidenceColor = (c: string) => c === 'high' ? '#dc2626' : c === 'medium' ? '#d97706' : '#6b7280'

    const issueLabel = (i: string) => ({
      broken_url: 'Broken',
      redirect: 'Redirect',
      pricing_changed: 'Price drift',
      stale_record: 'Stale',
    } as Record<string, string>)[i] ?? i

    const issueColor = (i: string) => ({
      broken_url: '#dc2626',
      redirect: '#d97706',
      pricing_changed: '#7c3aed',
      stale_record: '#6b7280',
    } as Record<string, string>)[i] ?? '#6b7280'

    const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:580px;margin:0 auto;background:#fff;color:#111;">

  <!-- Header -->
  <div style="padding:24px 0 16px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#4f46e5;">DIRECTR</div>
    <div style="font-size:13px;color:#888;margin-top:2px;">${date}</div>
  </div>

  <!-- Stats row -->
  <table style="border-collapse:collapse;margin-bottom:24px;">
    <tr>
      ${stat(hnPosts.length, 'HN signals')}
      ${stat(phPosts.length, 'PH launches')}
      ${stat(briefing.newTools.length, 'tools to add')}
      ${stat(briefing.decayFlags.length, 'decay flags')}
    </tr>
  </table>

  <!-- Trend -->
  <div style="background:#f5f5f5;border-left:3px solid #4f46e5;padding:10px 14px;font-size:13px;color:#333;margin-bottom:24px;line-height:1.5;">
    ${briefing.trendSummary}
  </div>

  <!-- Top signals -->
  ${briefing.topHNPost || briefing.topPHLaunch ? `
  <table style="border-collapse:collapse;width:100%;margin-bottom:24px;">
    <tr>
      ${briefing.topHNPost ? `
      <td style="width:50%;padding-right:12px;vertical-align:top;">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:6px;">Top HN</div>
        <div style="font-size:13px;font-weight:600;line-height:1.4;margin-bottom:3px;">${briefing.topHNPost.title}</div>
        <div style="font-size:12px;color:#4f46e5;font-weight:600;">${briefing.topHNPost.score} pts</div>
        <a href="${briefing.topHNPost.url}" style="font-size:11px;color:#888;text-decoration:none;">View →</a>
      </td>` : '<td></td>'}
      ${briefing.topPHLaunch ? `
      <td style="width:50%;padding-left:12px;vertical-align:top;border-left:1px solid #eee;">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:6px;">Top PH</div>
        <div style="font-size:13px;font-weight:600;line-height:1.4;margin-bottom:3px;">${briefing.topPHLaunch.name}</div>
        <div style="font-size:12px;color:#4f46e5;font-weight:600;">${briefing.topPHLaunch.votes} votes</div>
        <a href="${briefing.topPHLaunch.url}" style="font-size:11px;color:#888;text-decoration:none;">View →</a>
      </td>` : '<td></td>'}
    </tr>
  </table>` : ''}

  <!-- New tools -->
  <div style="margin-bottom:24px;">
    <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:10px;">
      ADD TO DIRECTORY (${briefing.newTools.length})
    </div>
    ${briefing.newTools.length ? [...briefing.newTools].sort((a, b) => Number(b.urgent) - Number(a.urgent)).map((t) => `
    <div style="padding:10px 0;border-top:1px solid #f0f0f0;${t.urgent ? 'background:#fff7ed;margin:0 -12px;padding:10px 12px;' : ''}">
      <div>
        ${t.urgent ? `<span style="display:inline-block;padding:2px 7px;border-radius:3px;font-size:10px;font-weight:800;background:#dc2626;color:#fff;letter-spacing:.06em;margin-right:6px;vertical-align:middle;">URGENT</span>` : ''}
        <span style="font-size:13px;font-weight:700;">${t.name}</span>
        ${badge(t.source, t.source === 'HN' ? '#f97316' : '#8b5cf6')}
        ${t.votes ? `<span style="font-size:11px;color:#888;margin-left:6px;">${t.votes} ${t.source === 'HN' ? 'pts' : 'votes'}</span>` : ''}
      </div>
      <div style="font-size:12px;color:#555;margin-top:2px;">${t.tagline}</div>
      <div style="font-size:11px;color:#888;margin-top:2px;">${t.reason}</div>
      <a href="${t.url}" style="font-size:11px;color:#4f46e5;text-decoration:none;margin-top:3px;display:inline-block;">${t.url.replace(/^https?:\/\//, '')}</a>
    </div>`).join('') : '<div style="font-size:13px;color:#888;">Nothing notable today.</div>'}
  </div>

  <!-- Decay check -->
  <div style="margin-bottom:24px;">
    <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:10px;">
      DECAY CHECK (${briefing.decayFlags.length})
    </div>
    ${briefing.decayFlags.length ? briefing.decayFlags.map((f) => `
    <div style="padding:8px 0;border-top:1px solid #f0f0f0;display:flex;align-items:baseline;gap:10px;">
      <span style="font-size:13px;font-weight:700;min-width:90px;">${f.tool}</span>
      <span style="font-size:10px;font-weight:700;color:#fff;background:${issueColor(f.issue)};padding:1px 6px;border-radius:3px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;">${issueLabel(f.issue)}</span>
      <span style="font-size:12px;color:#333;flex:1;">${f.detail}</span>
      <span style="font-size:10px;font-weight:700;color:${confidenceColor(f.confidence)};text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;">${f.confidence}</span>
    </div>`).join('') : '<div style="font-size:13px;color:#888;">All tools healthy. ✓</div>'}
  </div>

  <!-- Footer -->
  <div style="border-top:1px solid #eee;padding-top:12px;font-size:11px;color:#bbb;">
    ${hnPosts.length} HN · ${phPosts.length} PH · ${decay.checked.urls} URLs · ${decay.checked.pricing} pricing pages
    ${hnErrors.length ? ` · <span style="color:#f87171;">errors: ${hnErrors.join(', ')}</span>` : ''}
  </div>

</div>`

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Directr Scanner <onboarding@resend.dev>',
      to: RECIPIENT,
      subject: `Directr — ${briefing.newTools.filter(t => t.urgent).length ? `🚨 ${briefing.newTools.filter(t => t.urgent).length} urgent · ` : ''}${briefing.newTools.length} tools · ${briefing.decayFlags.length} decay · ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}`,
      html,
    })

    return NextResponse.json({ ok: true, decay: { issues: decay.issues.length, pricing: decay.pricingSnippets.length } })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
