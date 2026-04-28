import type { Metadata } from 'next'
import HomeClient from './HomeClient'

const BASE = 'https://directr.com.au'

export const metadata: Metadata = {
  title: { absolute: 'Directr — Find the Best AI Tools (2026 Directory)' },
  description: 'Search and compare 60+ AI tools across video, images, writing, coding, audio and more. Unbiased rankings, real reviews, and up-to-date pricing — updated weekly.',
  alternates: { canonical: BASE },
  openGraph: {
    title: 'Directr — Find the Best AI Tools',
    description: 'Search and compare 60+ AI tools across 16 categories. Updated weekly.',
    url: BASE,
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Directr',
  url: BASE,
  description: 'AI tools search engine and directory',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Directr',
  url: BASE,
  logo: `${BASE}/logo-icon.png`,
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <HomeClient />
    </>
  )
}
