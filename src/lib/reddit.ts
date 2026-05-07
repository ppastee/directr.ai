export interface RedditPost {
  title: string
  url: string
  score: number
  subreddit: string
  created: number
}

// Hacker News via Algolia API — reliable from Vercel, no auth needed, great AI signal
const HN_QUERIES = ['AI tool', 'Show HN AI', 'LLM', 'GPT', 'machine learning launch']

export async function fetchRedditPosts(): Promise<{ posts: RedditPost[]; errors: string[] }> {
  const posts: RedditPost[] = []
  const errors: string[] = []
  const seen = new Set<string>()

  const after = Math.floor(Date.now() / 1000) - 86400

  for (const query of HN_QUERIES) {
    try {
      const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=25&numericFilters=${encodeURIComponent(`created_at_i>${after}`)}`
      const res = await fetch(url)
      if (!res.ok) {
        errors.push(`HN "${query}": ${res.status} ${res.statusText}`)
        continue
      }
      const data = await res.json()
      const hits: any[] = data?.hits ?? []
      for (const h of hits) {
        if (seen.has(h.objectID)) continue
        seen.add(h.objectID)
        const score = h.points ?? 0
        if (score < 5) continue
        posts.push({
          title: h.title,
          url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
          score,
          subreddit: 'HackerNews',
          created: h.created_at_i,
        })
      }
    } catch (err: any) {
      errors.push(`HN "${query}": ${err.message}`)
    }
  }

  return { posts: posts.sort((a, b) => b.score - a.score).slice(0, 30), errors }
}
