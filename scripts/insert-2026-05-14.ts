/**
 * Inserts tools from the 14 May 2026 daily brief.
 *
 * 6 tools — IDs follow CLAUDE.md per-category blocks:
 *   coding (301–):       320 Fei Design Mode (Autonomy)
 *   productivity (701–): 711 Spellar 3.0, 712 Tendem by Toloka
 *   ai-agents (1601–):   1617 Raindrop Workshop, 1618 Asteroid
 *   hardware (1701–):    1702 Naptick AI
 *
 * Skipped per Casey: all 12 decay flags (HTTP 403 false-positives — scraper
 * appears IP/UA-blocked by major AI sites; rows untouched).
 *
 * Pricing for Spellar, Naptick, Fei, Tendem is best-effort — listed sites
 * either don't publish tiers or are pre-launch waitlists. Casey to refine.
 *
 * Usage: npx tsx scripts/insert-2026-05-14.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const envText = readFileSync(join(process.cwd(), '.env.local'), 'utf8')
const env: Record<string, string> = {}
for (const line of envText.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const rows = [
  {
    id: 320,
    category: 'coding',
    name: 'Fei Design Mode',
    emoji: '🎨',
    logo_domain: 'autonomyai.io',
    url: 'https://autonomyai.io',
    tagline: 'Edit UI pixels live with AI agents and push to code',
    description:
      "From Autonomy AI — a live design surface that lets designers tweak UI elements visually and have those changes flow straight into the codebase, without a developer handoff loop. Sits between Figma/Claude Design and a real running app: what you adjust in the canvas becomes production code. PH launch 14 May 2026 with 126 votes.",
    price: 'Contact for pricing',
    free: true,
    free_tier: '3-month free trial',
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['UI editing', 'Figma to code', 'Design-to-code'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 711,
    category: 'productivity',
    name: 'Spellar 3.0',
    emoji: '🎙️',
    logo_domain: 'spellar.ai',
    url: 'https://spellar.ai',
    tagline: 'Intelligent meeting companion with cross-meeting memory',
    description:
      'AI meeting assistant that joins your calls, transcribes and summarises, and crucially keeps context across meetings — so it can answer "what did we agree last Thursday?" without you re-uploading transcripts. Supports 100+ languages and routes through GPT, Gemini, Claude, or Perplexity depending on task. 3.0 release topped PH on 14 May 2026 with 395 votes.',
    price: 'Free / From $20/mo',
    free: true,
    free_tier: 'Limited meetings/mo',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Meeting AI', 'Transcription', 'Cross-meeting memory'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 712,
    category: 'productivity',
    name: 'Tendem by Toloka',
    emoji: '🤝',
    logo_domain: 'tendem.ai',
    url: 'https://tendem.ai',
    tagline: 'Hand off any task to a human expert, AI-first',
    description:
      "Task-delegation platform that pairs AI execution with Toloka's network of 10,000+ vetted human specialists across design, development, copy, and research. Every task runs through AI first, then a human expert reviews, corrects, or completes it before delivery — high-stakes work without the long-term contract overhead. PH launch 14 May 2026 with 195 votes; novel human-in-the-loop angle in a market saturated by autonomy claims.",
    price: 'Per-task pricing',
    free: true,
    free_tier: '$20 first task credit',
    free_tier_label: 'Free trial',
    rating: 0,
    reviews: 0,
    tags: ['Human-in-loop', 'Task delegation', 'Expert network'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
  {
    id: 1617,
    category: 'ai-agents',
    name: 'Raindrop Workshop',
    emoji: '💧',
    logo_domain: 'raindrop.ai',
    url: 'https://www.raindrop.ai',
    tagline: 'Open-source local debugger for AI agents',
    description:
      "Open-source agent observability and debugging tool — token-by-token trace streaming, replay, evaluation harnesses, and self-healing suggestions that propose and test fixes for production agent failures. Integrates with Claude Code via MCP. Runs locally so traces never leave the dev machine. PH launch 14 May 2026 with 139 votes; fills a real gap in the agent-dev-tooling shelf alongside Statewright and Voker.",
    price: 'Free / Open-source',
    free: true,
    free_tier: 'Fully open-source',
    free_tier_label: 'Free',
    rating: 0,
    reviews: 0,
    tags: ['Agent debugger', 'Open-source', 'Local-first'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1618,
    category: 'ai-agents',
    name: 'Asteroid',
    emoji: '☄️',
    logo_domain: 'asteroid.ai',
    url: 'https://asteroid.ai',
    tagline: 'Build browser, Linux, and Windows AI agents in seconds',
    description:
      'No-code computer-use agent builder — describe the workflow and Astro, Asteroid\'s meta-agent, constructs and debugs the agent autonomously, producing reusable scripts you can hand off. Targets messy real-world automation: EHRs, insurance portals, desktop apps, VPN-protected systems. API-first with webhooks, MCPs, SDKs, persistent sessions, and human-in-the-loop checkpoints. PH launch 14 May 2026 with 129 votes.',
    price: 'Usage-based',
    free: true,
    free_tier: '$10 free credits',
    free_tier_label: 'Free tier available',
    rating: 0,
    reviews: 0,
    tags: ['Computer-use agents', 'Browser automation', 'No-code agents'],
    sponsored: false,
    api_access: true,
    output_res: null,
    watermark: false,
  },
  {
    id: 1702,
    category: 'hardware',
    name: 'Naptick AI',
    emoji: '🌙',
    logo_domain: 'naptick.com',
    url: 'https://launch.naptick.com',
    tagline: 'Bedside AI sleep companion that helps you fall asleep',
    description:
      "Physical bedside device combining circadian lighting, adaptive soundscapes, environmental sensors (temperature, noise, light, air), and an on-device AI sleep coach you can talk to. Phone-free by design — physical controls (tap, rotate, long-press) so you don't doomscroll your way out of falling asleep. Companion app for setup and reviewing journaled notes only. PH launch 14 May 2026 with 318 votes.",
    price: 'Contact for pricing',
    free: false,
    free_tier_label: null,
    rating: 0,
    reviews: 0,
    tags: ['Sleep AI', 'Bedside device', 'Circadian lighting'],
    sponsored: false,
    api_access: false,
    output_res: null,
    watermark: false,
  },
]

async function run() {
  console.log(`Inserting ${rows.length} tools…\n`)

  // Pre-flight: confirm none of these IDs already exist
  const ids = rows.map(r => r.id)
  const { data: existing } = await supabase.from('tools').select('id, name').in('id', ids)
  if (existing && existing.length > 0) {
    console.error('ID collisions — aborting:')
    for (const e of existing) console.error(`  ${e.id} already used by "${e.name}"`)
    process.exit(1)
  }

  const { error } = await supabase.from('tools').insert(rows)
  if (error) {
    console.error('Insert failed:', error.message)
    process.exit(1)
  }

  for (const r of rows) console.log(`  ✓ ${r.id}\t${r.category}\t${r.name}`)
  console.log('\nDone.')
}

run()
