/**
 * Moves Zams from the off-block id 1406 (squatting inside the data block)
 * to its proper marketing slot 809.
 *
 * Approach: insert new row with id 809 cloned from 1406, then delete 1406.
 * (Supabase doesn't allow updating a primary key directly via the client.)
 *
 * Code refs updated separately: tools.ts, examples.ts, professions.ts, tasks.ts.
 *
 * Usage: npx tsx scripts/move-zams-2026-05-14.ts
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

async function run() {
  const { data: existing, error: selErr } = await supabase
    .from('tools')
    .select('*')
    .eq('id', 1406)
    .single()

  if (selErr || !existing) {
    console.error('Could not load id 1406:', selErr?.message)
    process.exit(1)
  }
  if (existing.name !== 'Zams') {
    console.error(`Safety check failed — id 1406 is "${existing.name}", not Zams. Aborting.`)
    process.exit(1)
  }

  const { id: _oldId, ...rest } = existing
  const newRow = { ...rest, id: 809 }

  const { data: clash } = await supabase.from('tools').select('id, name').eq('id', 809).maybeSingle()
  if (clash) {
    console.error(`Safety check failed — id 809 already taken by "${clash.name}". Aborting.`)
    process.exit(1)
  }

  const { error: insErr } = await supabase.from('tools').insert(newRow)
  if (insErr) {
    console.error('Insert into 809 failed:', insErr.message)
    process.exit(1)
  }
  console.log('✓ Inserted Zams at id 809.')

  const { error: delErr } = await supabase.from('tools').delete().eq('id', 1406)
  if (delErr) {
    console.error('Delete of 1406 failed (rollback needed):', delErr.message)
    process.exit(1)
  }
  console.log('✓ Deleted old id 1406.')

  console.log('\nDone. Zams moved 1406 → 809.')
}

run()
