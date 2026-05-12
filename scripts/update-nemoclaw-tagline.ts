/**
 * Strengthen NemoClaw tagline so it stands on its own without OpenClaw context.
 * Usage: npx tsx scripts/update-nemoclaw-tagline.ts
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

;(async () => {
  const { error } = await supabase
    .from('tools')
    .update({ tagline: 'Sandboxed runtime for autonomous AI agents' })
    .eq('id', 1611)
  if (error) { console.error(error.message); process.exit(1) }
  console.log('NemoClaw tagline updated.')
})()
