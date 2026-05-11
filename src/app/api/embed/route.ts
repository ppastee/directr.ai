import { NextRequest } from 'next/server'
import { embedQuery, isQueryEmbeddingCached } from '@/lib/embed'

/**
 * POST /api/embed
 * Body: { query: string }
 * Returns: { embedding: number[], cached: boolean }
 *
 * Thin wrapper around the shared embedQuery helper so the cache is shared
 * with /api/search and /api/wizard-ai. Most search traffic now goes
 * through /api/search directly, but this endpoint stays useful for
 * client-side experimentation and any future feature that needs
 * just-an-embedding without running the ranker.
 */
export async function POST(req: NextRequest) {
  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const query = body.query?.trim()
  if (!query) return Response.json({ error: 'missing_query' }, { status: 400 })

  const wasCached = isQueryEmbeddingCached(query)
  const embedding = await embedQuery(query)

  if (!embedding) {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'embeddings_not_configured' }, { status: 503 })
    }
    return Response.json({ error: 'embedding_failed' }, { status: 502 })
  }

  return Response.json({ embedding, cached: wasCached })
}
