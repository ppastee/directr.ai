import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { findToolBySlug, getAllToolSlugs, CATEGORIES } from '@/data/tools'
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
}

export async function generateStaticParams() {
  return getAllToolSlugs().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = findToolBySlug(slug)
  if (!result) return {}
  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const url = `${BASE}/tool/${slug}`
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = findToolBySlug(slug)
  if (!result) notFound()

  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const url = `${BASE}/tool/${slug}`

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
      { '@type': 'ListItem', position: 2, name: cat?.name ?? 'Category', item: `${BASE}/category/${cat?.slug}` },
      { '@type': 'ListItem', position: 3, name: tool.name, item: url },
    ],
  }

  const freeAnswer = tool.freeTierLabel === 'Free'
    ? `Yes, ${tool.name} is completely free to use.`
    : tool.freeTierLabel === 'Free tier available'
    ? `${tool.name} offers a free tier with limited features. Paid plans start at ${tool.price}.`
    : tool.freeTierLabel === 'Free trial'
    ? `${tool.name} offers a free trial. After the trial, paid plans start at ${tool.price}.`
    : `${tool.name} does not offer a free plan. Pricing starts at ${tool.price}.`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${tool.name} free?`,
        acceptedAnswer: { '@type': 'Answer', text: freeAnswer },
      },
      {
        '@type': 'Question',
        name: `What is ${tool.name} used for?`,
        acceptedAnswer: { '@type': 'Answer', text: `${tool.name} is used for ${tool.tags.join(', ')}. ${tool.desc}` },
      },
      {
        '@type': 'Question',
        name: `What are the best ${tool.name} alternatives?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The best alternatives to ${tool.name} are listed on our ${cat?.name ?? ''} AI tools page at directr.com.au/category/${cat?.slug ?? ''}. We compare pricing, features, and ratings across all top ${cat?.name?.toLowerCase() ?? ''} AI tools.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolRoute tool={tool} categoryId={categoryId} />
    </>
  )
}
