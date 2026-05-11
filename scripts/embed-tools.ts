/**
 * Backfill embeddings for every tool in Supabase.
 *
 * Idempotent: skips tools whose `embedding_input` already matches the
 * string we'd embed now, so it only re-embeds genuine content changes.
 *
 * Cost (May 2026): text-embedding-3-small is $0.02 per 1M input tokens.
 * ~140 tools × ~100 tokens each = ~14k tokens = ~$0.0003 for a full backfill.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-...                 \
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx  \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...      \
 *   npx tsx scripts/embed-tools.ts
 *
 * Flags:
 *   --force      Re-embed every tool, even ones whose input string is unchanged.
 *   --dry        Show what would change without calling OpenAI or writing to Supabase.
 */

import { createClient } from '@supabase/supabase-js'

// ─── env ─────────────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const openaiKey   = process.env.OPENAI_API_KEY

const force = process.argv.includes('--force')
const dry   = process.argv.includes('--dry')

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
if (!openaiKey && !dry) {
  console.error('Missing OPENAI_API_KEY (add to .env.local). Use --dry to preview without it.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ─── types ───────────────────────────────────────────────────────────
interface ToolRow {
  id: number
  name: string
  tagline: string | null
  description: string | null
  tags: string[] | null
  category: string
  embedding_input: string | null
}

// ─── helpers ─────────────────────────────────────────────────────────
const EMBED_MODEL = 'text-embedding-3-small'
const BATCH_SIZE  = 64 // OpenAI allows up to 2048 inputs/call; 64 is plenty for 140 rows

/**
 * Build the canonical string we embed for a tool. Keeping this in one
 * place means we can re-run the backfill idempotently — anything that
 * changes the output of this function triggers a re-embed for that row.
 */
function buildEmbeddingInput(row: ToolRow): string {
  const parts: string[] = []
  parts.push(row.name)
  if (row.tagline) parts.push(row.tagline)
  if (row.description) parts.push(row.description)
  if (row.tags && row.tags.length) parts.push(`Tags: ${row.tags.join(', ')}`)
  parts.push(`Category: ${row.category}`)
  return parts.join('. ')
}

async function embedBatch(inputs: string[]): Promise<number[][]> {
  if (dry) return inputs.map(() => [])
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`OpenAI embeddings call failed (${res.status}): ${body}`)
  }
  const json = await res.json() as { data: Array<{ embedding: number[] }> }
  return json.data.map(d => d.embedding)
}

// ─── main ────────────────────────────────────────────────────────────
async function main() {
  console.log(`Mode: ${dry ? 'DRY RUN' : 'LIVE'}${force ? ' (force)' : ''}`)

  const { data: rows, error } = await supabase
    .from('tools')
    .select('id, name, tagline, description, tags, category, embedding_input')
    .order('id', { ascending: true })

  if (error) {
    console.error('Supabase select failed:', error.message)
    process.exit(1)
  }
  if (!rows || rows.length === 0) {
    console.log('No tools in the database.')
    return
  }
  console.log(`Loaded ${rows.length} tools.`)

  // Decide which rows need embedding work
  const needsEmbed: Array<{ row: ToolRow; input: string }> = []
  for (const row of rows as ToolRow[]) {
    const input = buildEmbeddingInput(row)
    if (!force && row.embedding_input === input) continue
    needsEmbed.push({ row, input })
  }
  console.log(`${needsEmbed.length} tools need embedding (rest are up-to-date).`)
  if (needsEmbed.length === 0) return

  // Batch through OpenAI
  let totalUpdated = 0
  for (let i = 0; i < needsEmbed.length; i += BATCH_SIZE) {
    const slice = needsEmbed.slice(i, i + BATCH_SIZE)
    const inputs = slice.map(s => s.input)
    process.stdout.write(`Embedding batch ${i / BATCH_SIZE + 1} (${slice.length} items)... `)
    const embeddings = await embedBatch(inputs)
    console.log('done.')

    if (dry) {
      for (const { row, input } of slice) {
        console.log(`  #${row.id} ${row.name}: would embed ${input.length} chars`)
      }
      totalUpdated += slice.length
      continue
    }

    // Update rows one at a time — JSONB writes are tiny so this is fine for ~140 rows
    for (let j = 0; j < slice.length; j++) {
      const { row, input } = slice[j]
      const { error: updateErr } = await supabase
        .from('tools')
        .update({ embedding: embeddings[j], embedding_input: input })
        .eq('id', row.id)
      if (updateErr) {
        console.error(`  failed to update #${row.id} ${row.name}: ${updateErr.message}`)
        continue
      }
      totalUpdated += 1
    }
  }

  console.log(`\n✓ ${totalUpdated} tool${totalUpdated === 1 ? '' : 's'} embedded.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
