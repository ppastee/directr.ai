import { NextRequest } from 'next/server'

/**
 * POST /api/embed
 * Body: { query: string }
 * Returns: { embedding: number[] } — 1536-dim text-embedding-3-small vector
 *
 * Caches by normalized query in an in-memory LRU so repeat searches don't
 * hit OpenAI. Per-call cost is ~$0.0000002 anyway, but cache also cuts
 * latency from ~150ms to <1ms for popular queries.
 */

const EMBED_MODEL = 'text-embedding-3-small'
const CACHE_MAX   = 500

// Simple Map-based LRU. JS Maps preserve insertion order, so we delete-then-set
// to bump a key to "most recently used", and evict the oldest when over capacity.
const cache = new Map<string, number[]>()

function normalize(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, ' ')
}

function cacheGet(key: string): number[] | undefined {
  const hit = cache.get(key)
  if (!hit) return undefined
  // Move to most-recent position
  cache.delete(key)
  cache.set(key, hit)
  return hit
}

function cacheSet(key: string, value: number[]): void {
  if (cache.has(key)) cache.delete(key)
  cache.set(key, value)
  if (cache.size > CACHE_MAX) {
    // Evict oldest (first inserted)
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
}

export async function POST(req: NextRequest) {
  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const query = body.query?.trim()
  if (!query) return Response.json({ error: 'missing_query' }, { status: 400 })

  const key = normalize(query)
  const cached = cacheGet(key)
  if (cached) {
    return Response.json({ embedding: cached, cached: true })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'embeddings_not_configured' }, { status: 503 })
  }

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
      const errBody = await res.text().catch(() => '')
      console.error(`[/api/embed] OpenAI ${res.status}: ${errBody.slice(0, 200)}`)
      return Response.json({ error: 'embedding_failed', status: res.status }, { status: 502 })
    }

    const data = await res.json() as { data: Array<{ embedding: number[] }> }
    const embedding = data.data?.[0]?.embedding
    if (!Array.isArray(embedding)) {
      return Response.json({ error: 'malformed_response' }, { status: 502 })
    }

    cacheSet(key, embedding)
    return Response.json({ embedding, cached: false })
  } catch (err) {
    console.error('[/api/embed] fetch error:', err)
    return Response.json({ error: 'embedding_failed' }, { status: 502 })
  }
}
