import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES } from '@/data/tools'
import { dbFindToolBySlug, dbGetAllToolSlugs, getToolsByCategory } from '@/lib/db'
import ToolRoute from '@/components/ToolRoute'

const BASE = 'https://directr.com.au'

const APP_CATEGORY: Record<string, string> = {
  animation: 'MultimediaApplication',
  image: 'DesignApplication',
  writing: 'BusinessApplication',
  coding: 'DeveloperApplication',
  audio: 'MultimediaApplication',
  chat: 'BusinessApplication',
  '3d': 'DesignApplication',
  productivity: 'BusinessApplication',
  marketing: 'BusinessApplication',
  finance: 'FinanceApplication',
  accounting: 'FinanceApplication',
  legal: 'BusinessApplication',
  hr: 'BusinessApplication',
  construction: 'BusinessApplication',
  data: 'BusinessApplication',
  education: 'EducationalApplication',
  'ai-agents': 'BusinessApplication',
}

export async function generateStaticParams() {
  const slugs = await dbGetAllToolSlugs()
  return slugs.map(({ slug, categoryId }) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId)
    return { id: cat?.slug ?? categoryId, slug }
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}): Promise<Metadata> {
  const { id, slug } = await params
  const result = await dbFindToolBySlug(slug)
  if (!result) return {}
  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const url = `${BASE}/category/${id}/${slug}`
  return {
    title: `${tool.name} Review (2026) — Pricing, Alternatives & Features`,
    description: `${tool.tagline}. ${tool.desc.slice(0, 120)} Compare pricing (${tool.price}), alternatives and a ${tool.rating}★ rating from ${tool.reviews.toLocaleString()} reviews.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} — ${tool.tagline}`,
      description: `${tool.price} · ${tool.rating}★ (${tool.reviews.toLocaleString()} reviews) · Compare with ${cat?.name ?? ''} alternatives`,
      url,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}) {
  const { id, slug } = await params
  const result = await dbFindToolBySlug(slug)
  if (!result) notFound()

  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const categoryTools = await getToolsByCategory(categoryId)
  const url = `${BASE}/category/${id}/${slug}`

  const priceMatch = tool.price.match(/\$(\d+(?:\.\d+)?)/)
  const offerPrice = tool.price.toLowerCase() === 'free' ? '0' : priceMatch?.[1]

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.desc,
    url: tool.url,
    applicationCategory: APP_CATEGORY[categoryId] ?? 'WebApplication',
    ...(offerPrice !== undefined && {
      offers: {
        '@type': 'Offer',
        price: offerPrice,
        priceCurrency: 'USD',
        description: tool.price,
      },
    }),
    ...(tool.reviews > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating.toString(),
        reviewCount: tool.reviews.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: cat?.name ?? 'Category', item: `${BASE}/category/${id}` },
      { '@type': 'ListItem', position: 3, name: tool.name, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolRoute tool={tool} categoryId={categoryId} categoryTools={categoryTools} />
    </>
  )
}
