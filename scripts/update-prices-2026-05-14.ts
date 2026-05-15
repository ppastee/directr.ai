/**
 * Patches pricing for 3 of the 6 tools inserted by insert-2026-05-14.ts,
 * using real pricing pages Casey verified.
 *
 *   711 Spellar 3.0      → Pro $11.99/mo (annual), no free tier visible
 *   712 Tendem by Toloka → Per-task pricing, no free trial visible
 *   1618 Asteroid        → Pay-as-you-go / $300+/mo tiers
 *
 * Fei, Naptick, Raindrop unchanged.
 *
 * Usage: npx tsx scripts/update-prices-2026-05-14.ts
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

const updates = [
  {
    id: 711,
    name: 'Spellar 3.0',
    patch: {
      price: 'From $11.99/mo',
      free: false,
      free_tier: null,
      free_tier_label: null,
    },
  },
  {
    id: 712,
    name: 'Tendem by Toloka',
    patch: {
      price: 'Per-task pricing (~$28+)',
      free: false,
      free_tier: null,
      free_tier_label: null,
    },
  },
  {
    id: 1618,
    name: 'Asteroid',
    patch: {
      price: 'Pay as you go / From $300/mo',
      free: false,
      free_tier: null,
      free_tier_label: null,
    },
  },
]

async function run() {
  for (const u of updates) {
    const { error } = await supabase.from('tools').update(u.patch).eq('id', u.id)
    if (error) {
      console.error(`  ✗ ${u.id}\t${u.name}\t${error.message}`)
      process.exit(1)
    }
    console.log(`  ✓ ${u.id}\t${u.name}\t${u.patch.price}`)
  }
  console.log('\nDone.')
}

run()
