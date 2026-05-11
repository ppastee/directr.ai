import { NextRequest } from 'next/server'
import { getAllToolsWithEmbeddings, getCategories } from '@/lib/db'
import { scoreToolsHybrid, scoreTools } from '@/lib/search'
import { embedQuery } from '@/lib/embed'
import type { Tool } from '@/data/tools'

/**
 * POST /api/search
 * Body: { query: string, limit?: number }
 * Returns: { results: Result[], mode: 'hybrid' | 'keyword' }
 *
 * Embeds the query (shared cache via lib/embed), runs hybrid ranking
 * against tools loaded server-side (with their stored embeddings), and
 * returns scored results stripped of embeddings.
 */

function stripEmbedding(t: Tool): Tool {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { embedding: _embedding, ...rest } = t
  return rest as Tool
}

export async function POST(req: NextRequest) {
  let body: { query?: string; limit?: number }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const query = body.query?.trim()
  if (!query) return Response.json({ error: 'missing_query' }, { status: 400 })

  const limit = typeof body.limit === 'number' && body.limit > 0 ? body.limit : 0

  const [tools, categories, queryEmbedding] = await Promise.all([
    getAllToolsWithEmbeddings(),
    getCategories(),
    embedQuery(query),
  ])

  const results = queryEmbedding
    ? scoreToolsHybrid(query, queryEmbedding, tools, categories, { limit })
    : scoreTools(query, tools, categories, limit)

  // Strip tool embeddings before sending to the browser
  const safeResults = results.map(r => ({ ...r, tool: stripEmbedding(r.tool) }))

  return Response.json({
    results: safeResults,
    mode: queryEmbedding ? 'hybrid' : 'keyword',
    count: safeResults.length,
  })
}
