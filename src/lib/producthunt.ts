export interface PHPost {
  name: string
  tagline: string
  url: string
  votesCount: number
  topics: string[]
}

export async function fetchProductHuntLaunches(): Promise<PHPost[]> {
  const query = `{
    posts(order: VOTES, postedAfter: "${new Date(Date.now() - 86400000).toISOString()}", first: 20) {
      edges {
        node {
          name
          tagline
          url
          votesCount
          topics { edges { node { name } } }
        }
      }
    }
  }`

  const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRODUCT_HUNT_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })

  if (!res.ok) return []
  const { data } = await res.json()

  return (data?.posts?.edges ?? [])
    .map(({ node }: any) => ({
      name: node.name,
      tagline: node.tagline,
      url: node.url,
      votesCount: node.votesCount,
      topics: node.topics?.edges?.map(({ node: t }: any) => t.name) ?? [],
    }))
    .filter((p: PHPost) => {
      const topics = p.topics.map((t) => t.toLowerCase())
      return topics.some((t) => ['artificial intelligence', 'ai', 'machine learning', 'productivity', 'developer tools'].includes(t))
    })
    .slice(0, 15)
}
