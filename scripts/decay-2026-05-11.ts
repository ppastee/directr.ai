/**
 * Applies decay-check actions from the Directr daily brief — 11 May 2026.
 *
 * Skipped (Casey verified live, scraper false positives — bot blocks / transient timeouts):
 *   Perplexity (879), Meta AI (935), Notion AI (1098), Composer (1414),
 *   Intuit Assist (1460), Quizlet (1996), Tableau (1881).
 *
 * Actions:
 *   - URL fixes: NightCafe (redirect to creator.), Spellbook (.legal → .com), Power BI (canonical microsoft.com path)
 *   - Price fixes: Runway (drop to From $12/mo), Copy.ai (drop to From $29/mo)
 *
 * Usage: npx tsx scripts/decay-2026-05-11.ts
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
    id: 111,
    label: 'NightCafe — url (follow redirect to creator subdomain)',
    patch: { url: 'https://creator.nightcafe.studio' },
  },
  {
    id: 1102,
    label: 'Spellbook — url (.legal → .com)',
    patch: { url: 'https://spellbook.com', logo_domain: 'spellbook.com' },
  },
  {
    id: 1403,
    label: 'Power BI — url (canonical microsoft.com path)',
    patch: {
      url: 'https://www.microsoft.com/en-us/power-bi',
      logo_domain: 'microsoft.com',
    },
  },
  {
    id: 1,
    label: 'Runway — price drift (entry tier dropped to $12/mo)',
    patch: { price: 'From $12/mo' },
  },
  {
    id: 203,
    label: 'Copy.ai — price drift ($36 → $29/mo)',
    patch: { price: 'From $29/mo' },
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
