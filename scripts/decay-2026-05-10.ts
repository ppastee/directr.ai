/**
 * Applies decay-check actions from the Directr daily brief — 10 May 2026.
 *
 * Skipped (verified live, scraper false positives): Midjourney (101), Leonardo AI (106).
 *
 * Actions:
 *   - URL fixes: Claude Agent SDK, Kling AI, Sora, Flux, Playground AI, Windsurf
 *   - Price fixes: Jasper, Descript
 *   - Rebrand: Obviously AI → Zams (also moves to marketing category)
 *   - Delete: FlowMarket (404)
 *
 * Usage: npx tsx scripts/decay-2026-05-10.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const envPath = join(process.cwd(), '.env.local')
const envText = readFileSync(envPath, 'utf8')
const env: Record<string, string> = {}
for (const line of envText.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

type Update = { id: number; label: string; patch: Record<string, unknown> }

const updates: Update[] = [
  {
    id: 1604,
    label: 'Claude Agent SDK — url',
    patch: { url: 'https://code.claude.com/docs/en/agent-sdk' },
  },
  { id: 3, label: 'Kling AI — url', patch: { url: 'https://kling.ai', logo_domain: 'kling.ai' } },
  { id: 4, label: 'Sora — url', patch: { url: 'https://sora.chatgpt.com' } },
  { id: 108, label: 'Flux — url', patch: { url: 'https://bfl.ai', logo_domain: 'bfl.ai' } },
  {
    id: 110,
    label: 'Playground AI — url',
    patch: { url: 'https://playground.com', logo_domain: 'playground.com' },
  },
  {
    id: 304,
    label: 'Windsurf — url',
    patch: { url: 'https://windsurf.com', logo_domain: 'windsurf.com' },
  },
  { id: 202, label: 'Jasper — price', patch: { price: 'From $59/mo' } },
  { id: 405, label: 'Descript — price', patch: { price: 'From $16/mo' } },
  {
    id: 1406,
    label: 'Obviously AI → Zams (rebrand + recategorise)',
    patch: {
      name: 'Zams',
      category: 'marketing',
      url: 'https://zams.com',
      logo_domain: 'zams.com',
      tagline: 'AI workers for revenue teams',
      description:
        "Always-on AI workers that plug into Salesforce, Outreach, Clay, and the rest of the revenue stack — enriching leads, syncing data, and running outbound sequences without a human in the loop. The pivot of the old Obviously AI no-code ML platform into agent territory, now squarely aimed at sales ops teams who want to cut hours of manual list-building per week.",
      tags: ['Sales agents', 'Revenue', 'Lead enrichment'],
      price: 'Contact for pricing',
      free: false,
      free_tier_label: null,
    },
  },
]

const deletes: { id: number; label: string }[] = [
  { id: 809, label: 'FlowMarket — 404 broken' },
]

async function run() {
  console.log(`Applying ${updates.length} updates and ${deletes.length} deletes…\n`)

  for (const u of updates) {
    const { error } = await supabase.from('tools').update(u.patch).eq('id', u.id)
    if (error) {
      console.error(`✗ ${u.id} · ${u.label} · ${error.message}`)
      process.exit(1)
    }
    console.log(`✓ ${u.id} · ${u.label}`)
  }

  for (const d of deletes) {
    const { error } = await supabase.from('tools').delete().eq('id', d.id)
    if (error) {
      console.error(`✗ DELETE ${d.id} · ${d.label} · ${error.message}`)
      process.exit(1)
    }
    console.log(`✓ DELETE ${d.id} · ${d.label}`)
  }

  console.log('\nDone.')
}

run()
