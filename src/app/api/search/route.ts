import { NextRequest } from 'next/server'
import { getAllToolsWithEmbeddings, getCategories } from '@/lib/db'
import { scoreToolsHybrid, scoreTools } from '@/lib/search'
import type { Tool } from '@/data/tools'

/**
 * POST /api/search
 * Body: { query: string, limit?: number }
 * Returns: { results: Result[], mode: 'hybrid' | 'keyword' }
 *
 * Embeds the query (using the same /api/embed cache), runs hybrid ranking
 * against tools loaded server-side (with their stored embeddings), and
 * returns scored results stripped of embeddings.
 */

const EMBED_MODEL = 'text-embedding-3-small'
const CACHE_MAX = 500
const queryEmbedCache = new Map<string, number[]>()

function normalize(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, ' ')
}

function cacheGet(key: string): number[] | undefined {
  const hit = queryEmbedCache.get(key)
  if (!hit) return undefined
  queryEmbedCache.delete(key)
  queryEmbedCache.set(key, hit)
  return hit
}

function cacheSet(key: string, value: number[]): void {
  if (queryEmbedCache.has(key)) queryEmbedCache.delete(key)
  queryEmbedCache.set(key, value)
  if (queryEmbedCache.size > CACHE_MAX) {
    const oldest = queryEmbedCache.keys().next().value
    if (oldest !== undefined) queryEmbedCache.delete(oldest)
  }
}

async function embedQuery(query: string): Promise<number[] | null> {
  const key = normalize(query)
  const cached = cacheGet(key)
  if (cached) return cached

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: EMBED_MODEL, input: query }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[/api/search] OpenAI ${res.status}: ${body.slice(0, 200)}`)
      return null
    }
    const data = await res.json() as { data: Array<{ embedding: number[] }> }
    const embedding = data.data?.[0]?.embedding
    if (!Array.isArray(embedding)) return null
    cacheSet(key, embedding)
    return embedding
  } catch (err) {
    console.error('[/api/search] embed fetch error:', err)
    return null
  }
}

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
