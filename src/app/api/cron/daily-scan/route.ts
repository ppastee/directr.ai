import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { fetchRedditPosts } from '@/lib/reddit'
import { fetchProductHuntLaunches } from '@/lib/producthunt'
import { scrapePricingPages } from '@/lib/pricingScraper'

export const maxDuration = 60

const RECIPIENT = 'platformdirectr.ai@gmail.com'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [redditPosts, phPosts, pricingResults] = await Promise.all([
    fetchRedditPosts(),
    fetchProductHuntLaunches(),
    scrapePricingPages(),
  ])

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const prompt = `You are a researcher tracking the AI tools industry for a directory called Directr (directr.com.au).

Today's data:

## Reddit top posts (last 24h)
${redditPosts.map((p) => `- [${p.subreddit}] ${p.title} (${p.score} upvotes) — ${p.url}`).join('\n')}

## Product Hunt AI launches (last 24h)
${phPosts.length ? phPosts.map((p) => `- ${p.name}: ${p.tagline} — ${p.url} (${p.votesCount} votes)`).join('\n') : 'No AI launches today.'}

## Pricing page snapshots
${pricingResults.map((r) => `- ${r.toolName} (${r.pricingUrl}): "${r.snippet}"`).join('\n')}

Based on this data, write a concise daily briefing with these sections:

**NEW TOOLS TO CONSIDER ADDING**
List any genuinely new AI tools mentioned that aren't already common knowledge. Include name, what it does, why it's interesting, and the source URL. Only include tools that seem real and launched. If none, say "Nothing notable today."

**PRICING CHANGES DETECTED**
Based on the pricing snippets, flag any prices that look different from what you'd expect for well-known tools. Be conservative — only flag if something looks clearly changed. If none, say "No changes detected."

**TRENDING THIS WEEK**
2-3 sentences on what topics/tools are generating the most buzz on Reddit today.

Be factual and concise. Do not fabricate anything. If you're unsure about something, say so.`

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const briefing = (message.content[0] as { type: string; text: string }).text

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Directr Scanner <onboarding@resend.dev>',
    to: RECIPIENT,
    subject: `Directr Daily Brief — ${new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #4f46e5;">Directr Daily Brief</h2>
        <p style="color: #666; font-size: 14px;">${new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <div style="white-space: pre-wrap; line-height: 1.7; font-size: 15px;">${briefing.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')}</div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 12px; color: #999;">Sources: ${redditPosts.length} Reddit posts · ${phPosts.length} Product Hunt launches · ${pricingResults.length} pricing pages checked</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true, briefing })
}
