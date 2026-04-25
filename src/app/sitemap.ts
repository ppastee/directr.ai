import { CATEGORIES, getAllToolSlugs } from '@/data/tools'

const BASE = 'https://directr.ai'

export default function sitemap() {
  const categoryUrls = CATEGORIES.map((c) => ({
    url: `${BASE}/category/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const toolUrls = getAllToolSlugs().map(({ slug }) => ({
    url: `${BASE}/tool/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    ...categoryUrls,
    ...toolUrls,
  ]
}
