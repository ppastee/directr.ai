import { CATEGORIES, getAllToolSlugs } from '@/data/tools'
import { getAllVsPairs } from '@/data/vs'
import { getAllProfessionSlugs } from '@/data/professions'
import { getAllTaskSlugs } from '@/data/tasks'

const BASE = 'https://directr.com.au'

export default function sitemap() {
  const categoryUrls = CATEGORIES.map((c) => ({
    url: `${BASE}/category/${c.slug}`,
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

  const alternativeUrls = getAllToolSlugs().map(({ slug }) => ({
    url: `${BASE}/alternatives/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const compareUrls = getAllVsPairs().map((pair) => ({
    url: `${BASE}/compare/${pair}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const professionUrls = getAllProfessionSlugs().map((slug) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const taskUrls = getAllTaskSlugs().map((slug) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE}/tools/free`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    ...categoryUrls,
    ...toolUrls,
    ...alternativeUrls,
    ...compareUrls,
    ...professionUrls,
    ...taskUrls,
  ]
}
