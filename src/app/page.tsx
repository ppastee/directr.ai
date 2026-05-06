import type { Metadata } from 'next'
import HomeClient from './HomeClient'
import { getAllTools, getCategories } from '@/lib/db'

const BASE = 'https://directr.com.au'

export const metadata: Metadata = {
  title: { absolute: 'Directr — Find the Best AI Tools (2026 Directory)' },
  description: 'Search and compare 120+ AI tools across video, images, writing, coding, audio and more. Unbiased rankings, real reviews, and up-to-date pricing — updated weekly.',
  alternates: { canonical: BASE },
  openGraph: {
    title: 'Directr — Find the Best AI Tools',
    description: 'Search and compare 120+ AI tools across 16 categories. Updated weekly.',
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

export default async function Page() {
  const [allTools, categories] = await Promise.all([getAllTools(), getCategories()])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <section className="sr-only">
        <h1>AI Tools Directory — Find the Best AI Tools for Any Task (2026)</h1>
        <p>Directr is an AI tools search engine and directory. Search and compare 139+ AI tools across 16 categories including animation, image generation, writing, coding, audio, chat, 3D, productivity, marketing, finance, legal, HR, and more. All tools include unbiased ratings, real pricing, free tier details, and weekly updates.</p>
        <p>Browse by category or search by intent — describe what you want to do and Directr finds the right AI tool for your task. Updated weekly with the latest AI tools, pricing changes, and new releases.</p>
      </section>
      <HomeClient allTools={allTools} categories={categories} />
    </>
  )
}
