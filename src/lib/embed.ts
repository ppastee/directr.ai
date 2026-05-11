/**
 * Shared OpenAI query-embedding helper. Used by /api/embed, /api/search,
 * and the wizard pre-filter so all three see the same 500-entry LRU
 * cache — a query that's already been embedded for search costs nothing
 * to re-use for the wizard.
 */

const EMBED_MODEL = 'text-embedding-3-small'
const CACHE_MAX   = 500

const cache = new Map<string, number[]>()

export function normalizeQuery(q: string): string {
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
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
}

/**
 * Embed a query via OpenAI. Returns null on failure or missing API key
 * so callers can fall back to keyword-only behaviour.
 */
export async function embedQuery(query: string): Promise<number[] | null> {
  const key = normalizeQuery(query)
  if (!key) return null

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
      console.error(`[embedQuery] OpenAI ${res.status}: ${body.slice(0, 200)}`)
      return null
    }
    const data = await res.json() as { data: Array<{ embedding: number[] }> }
    const embedding = data.data?.[0]?.embedding
    if (!Array.isArray(embedding)) return null
    cacheSet(key, embedding)
    return embedding
  } catch (err) {
    console.error('[embedQuery] fetch error:', err)
    return null
  }
}

/** True when the cache already has a normalised version of this query. */
export function isQueryEmbeddingCached(query: string): boolean {
  return cache.has(normalizeQuery(query))
}
