import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { dbFindToolBySlug } from '@/lib/db'
import { VS_PAIRS, getAllVsPairs } from '@/data/vs'
import ComparisonRoute from '@/components/ComparisonRoute'

const BASE = 'https://directr.com.au'

export async function generateStaticParams() {
  return getAllVsPairs().map((pair) => ({ pair }))
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params
  const vs = VS_PAIRS[pair]
  if (!vs) return {}
  const [resA, resB] = await Promise.all([dbFindToolBySlug(vs.a), dbFindToolBySlug(vs.b)])
  const toolA = resA?.tool
  const toolB = resB?.tool
  if (!toolA || !toolB) return {}
  const url = `${BASE}/compare/${pair}`
  const title = `${toolA.name} vs ${toolB.name}: Which is Better in 2026?`
  const description = vs.verdict.slice(0, 160)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

export default async function Page({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const vs = VS_PAIRS[pair]
  if (!vs) notFound()

  const [resultA, resultB] = await Promise.all([dbFindToolBySlug(vs.a), dbFindToolBySlug(vs.b)])
  if (!resultA || !resultB) notFound()

  const { tool: toolA } = resultA
  const { tool: toolB } = resultB
  const url = `${BASE}/compare/${pair}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: vs.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: `${toolA.name} vs ${toolB.name}`, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ComparisonRoute pair={pair} vs={vs} toolA={toolA} toolB={toolB} />
    </>
  )
}
