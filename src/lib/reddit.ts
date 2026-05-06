export interface RedditPost {
  title: string
  url: string
  score: number
  subreddit: string
  created: number
}

const SUBREDDITS = ['artificial', 'MachineLearning', 'ChatGPT', 'singularity', 'AItools']

export async function fetchRedditPosts(): Promise<RedditPost[]> {
  const posts: RedditPost[] = []

  for (const sub of SUBREDDITS) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/top.json?t=day&limit=25`,
        { headers: { 'User-Agent': 'directr.ai/1.0 daily-scan' } }
      )
      if (!res.ok) continue
      const data = await res.json()
      const children = data?.data?.children ?? []
      for (const { data: p } of children) {
        if (p.score < 50) continue
        posts.push({
          title: p.title,
          url: `https://reddit.com${p.permalink}`,
          score: p.score,
          subreddit: sub,
          created: p.created_utc,
        })
      }
    } catch {
      // skip failed subreddits
    }
  }

  return posts.sort((a, b) => b.score - a.score).slice(0, 30)
}
