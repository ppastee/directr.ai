/**
 * Read-only: dump current DB state for decay flags + candidate dupes from 10 May brief.
 * Usage: npx tsx scripts/check-decay-2026-05-10.ts
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

const decayNames = [
  'Claude Agent SDK',
  'FlowMarket',
  'Kling AI',
  'Sora',
  'Midjourney',
  'Flux',
  'Leonardo AI',
  'Playground AI',
  'Windsurf',
  'Obviously AI',
  'Jasper',
  'Descript',
]

const candidateNames = ['Tailgrids', 'deepsec', 'Adject', 'AgentPeek', 'Keel', 'Cohesivity']

async function run() {
  console.log('=== DECAY ROWS (current DB state) ===')
  for (const name of decayNames) {
    const { data, error } = await supabase
      .from('tools')
      .select('id, name, category, url, price, free_tier_label')
      .ilike('name', name)
    if (error) {
      console.error(name, 'ERR', error.message)
      continue
    }
    if (!data || data.length === 0) {
      console.log(`${name}: NOT FOUND`)
      continue
    }
    for (const r of data) {
      console.log(`${r.id} · ${r.name} · ${r.category} · url=${r.url} · price=${r.price} · ftl=${r.free_tier_label}`)
    }
  }

  console.log('\n=== CANDIDATE DUPES (should be empty for new tools) ===')
  for (const name of candidateNames) {
    const { data } = await supabase.from('tools').select('id, name, category').ilike('name', `%${name}%`)
    if (data && data.length > 0) {
      for (const r of data) console.log(`MATCH ${name}: ${r.id} · ${r.name} · ${r.category}`)
    } else {
      console.log(`${name}: clear`)
    }
  }

  console.log('\n=== ai-agents category sanity (should already exist after 9 May insert) ===')
  const { data: aa } = await supabase
    .from('tools')
    .select('id, name')
    .eq('category', 'ai-agents')
    .order('id')
  console.log(aa)
}

run()
