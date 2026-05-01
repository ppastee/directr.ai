import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { findToolBySlug, getAllToolSlugs, CATEGORIES, TOOLS, nameToSlug } from '@/data/tools'
import { COMPARISONS } from '@/data/comparisons'
import AlternativesRoute from '@/components/AlternativesRoute'

const BASE = 'https://directr.com.au'

export async function generateStaticParams() {
  return getAllToolSlugs().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = findToolBySlug(slug)
  if (!result) return {}
  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const url = `${BASE}/alternatives/${slug}`
  const entry = COMPARISONS[slug]

  return {
    title: `Best ${tool.name} Alternatives in 2026 — Top ${cat?.name ?? ''} AI Tools`,
    description: entry?.intro.slice(0, 160) ??
      `The best alternatives to ${tool.name} in 2026. Compare pricing, ratings, and free tiers across the top ${cat?.name?.toLowerCase() ?? ''} AI tools.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Best ${tool.name} Alternatives in 2026`,
      description: `Compare the top alternatives to ${tool.name} — pricing, ratings, free tiers, and which to choose for your use case.`,
      url,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = findToolBySlug(slug)
  if (!result) notFound()

  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  if (!cat) notFound()

  const entry = COMPARISONS[slug]
  const url = `${BASE}/alternatives/${slug}`

  const alternatives = (TOOLS[categoryId] ?? [])
    .filter((t) => t.id !== tool.id)
    .sort((a, b) => b.rating - a.rating)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${tool.name} Alternatives in 2026`,
    description: `Top alternatives to ${tool.name} in the ${cat.name} AI tools category`,
    url,
    numberOfItems: alternatives.length,
    itemListElement: alternatives.slice(0, 10).map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      description: t.tagline,
      url: `${BASE}/tool/${nameToSlug(t.name)}`,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: cat.name, item: `${BASE}/category/${cat.slug}` },
      { '@type': 'ListItem', position: 3, name: tool.name, item: `${BASE}/tool/${slug}` },
      { '@type': 'ListItem', position: 4, name: `${tool.name} Alternatives`, item: url },
    ],
  }

  const freeAlts = alternatives.filter((t) => t.free)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best alternative to ${tool.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: alternatives[0]
            ? `${alternatives[0].name} is the highest-rated alternative to ${tool.name} with a ${alternatives[0].rating}★ rating. Other top alternatives include ${alternatives.slice(1, 3).map(t => t.name).join(' and ')}.`
            : `Browse all ${cat.name} AI tools on Directr to find the best alternative for your needs.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is there a free alternative to ${tool.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: freeAlts.length > 0
            ? `Yes — ${freeAlts.slice(0, 3).map(t => t.name).join(', ')} ${freeAlts.length === 1 ? 'is a free alternative' : 'are free alternatives'} to ${tool.name}.`
            : `There are no completely free alternatives to ${tool.name} in the ${cat.name.toLowerCase()} category. Some tools offer free trials — check individual tool pages for details.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is better than ${tool.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry?.useCases && entry.useCases.length > 0
            ? `It depends on your use case. ${entry.useCases.slice(0, 2).map(uc => `${uc.toolName} is better for ${uc.label.toLowerCase()}`).join('; ')}. See the full comparison at directr.com.au/alternatives/${slug}.`
            : `The best choice depends on your needs. Compare ${alternatives.slice(0, 3).map(t => t.name).join(', ')} at directr.com.au/alternatives/${slug}.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AlternativesRoute tool={tool} categoryId={categoryId} entry={entry} />
    </>
  )
}
