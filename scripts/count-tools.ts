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

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  const { data, error } = await sb.from('tools').select('category')
  if (error) { console.error(error); process.exit(1) }

  const byCat: Record<string, number> = {}
  for (const row of data!) byCat[row.category] = (byCat[row.category] ?? 0) + 1

  console.log('Total tools:', data!.length)
  console.log('Categories:', Object.keys(byCat).length)
  console.log('---')
  for (const [cat, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    console.log(`${cat.padEnd(16)} ${n}`)
  }
}
main()
