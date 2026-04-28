import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES, TOOLS, nameToSlug } from '@/data/tools'
import CategoryRoute from '@/components/CategoryRoute'

const BASE = 'https://directr.com.au'

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const cat = CATEGORIES.find((c) => c.slug === id)
  if (!cat) return {}
  const tools = TOOLS[cat.id] ?? []
  const topTools = tools.slice(0, 3).map((t) => t.name).join(', ')
  const url = `${BASE}/category/${cat.slug}`
  return {
    title: `Best ${cat.name} AI Tools 2026 — Compare ${cat.count} Tools`,
    description: `Compare the ${cat.count} best AI tools for ${cat.name.toLowerCase()} in 2026. Top picks: ${topTools}. Unbiased ratings, real pricing and reviews — updated weekly.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Best ${cat.name} AI Tools 2026`,
      description: `Compare ${cat.count} tools · Top picks: ${topTools} · Updated weekly`,
      url,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = CATEGORIES.find((c) => c.slug === id)
  if (!cat) notFound()

  const tools = TOOLS[cat.id] ?? []
  const url = `${BASE}/category/${cat.slug}`

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${cat.name} AI Tools 2026`,
    description: `The top ${cat.count} AI tools for ${cat.name.toLowerCase()}`,
    url,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `${BASE}/tool/${nameToSlug(t.name)}`,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: `Best ${cat.name} AI Tools`, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CategoryRoute cat={cat} />
    </>
  )
}
