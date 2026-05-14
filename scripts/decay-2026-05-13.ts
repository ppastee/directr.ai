/**
 * Applies decay-check actions from the Directr daily briefs — 12 & 13 May 2026.
 *
 * Skipped per Casey (likely scraper false positives — bot blocks / transient timeouts,
 * same pattern as the 11 May skips):
 *   Meta AI (511), Claude chat (508), Claude writing (201), Composer (903),
 *   Intuit Assist (1001), Quizlet (1503), Tableau (1402), Codex in Chrome (1601),
 *   Sora (4), Ideogram (105), Canva AI (107), Perplexity (502), Gamma (708),
 *   NightCafe (111) — Casey confirmed live.
 *
 * Also skipped: Descript (405) price drift — entry tier $16/mo still matches; defer.
 *
 * Actions:
 *   - Power BI (1403) — canonical URL has moved under /power-platform/products/
 *   - Keel (512)      — keel-labs.org is now the canonical home
 *
 * Usage: npx tsx scripts/decay-2026-05-13.ts
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

type Update = { id: number; label: string; patch: Record<string, unknown> }

const updates: Update[] = [
  {
    id: 1403,
    label: 'Power BI — url (canonical moved to /power-platform/products/)',
    patch: { url: 'https://www.microsoft.com/en-us/power-platform/products/power-bi' },
  },
  {
    id: 512,
    label: 'Keel — url + logo_domain (keel-labs.org is new home)',
    patch: { url: 'https://keel-labs.org', logo_domain: 'keel-labs.org' },
  },
]

async function run() {
  console.log(`Applying ${updates.length} updates…\n`)
  for (const u of updates) {
    const { error } = await supabase.from('tools').update(u.patch).eq('id', u.id)
    if (error) {
      console.error(`✗ ${u.id} · ${u.label} · ${error.message}`)
      process.exit(1)
    }
    console.log(`✓ ${u.id} · ${u.label}`)
  }
  console.log('\nDone.')
}

run()
