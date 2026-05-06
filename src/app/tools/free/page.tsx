import type { Metadata } from 'next'
import { CATEGORIES, nameToSlug } from '@/data/tools'
import { getAllTools } from '@/lib/db'
import FreeToolsClient, { FreeTool } from '@/components/FreeToolsClient'

const BASE = 'https://directr.com.au'

const FREE_FAQS = [
  {
    q: 'What are the best free AI tools in 2026?',
    a: 'The best free AI tools in 2026 include ChatGPT (chat and writing), Claude (reasoning and coding), GitHub Copilot (coding, free for students and open-source), Adobe Firefly (commercially safe image generation), ElevenLabs (voice synthesis with a free tier), and Kling AI (video generation with a permanent free plan). All offer meaningful free access without a credit card.',
  },
  {
    q: 'Are there AI tools that are completely free — no credit card required?',
    a: 'Yes. ChatGPT, Claude, Gemini, Perplexity, Adobe Firefly, Stable Diffusion, Canva AI, and many others offer genuine free access with no credit card required. A card is only needed if you choose to upgrade to a paid plan.',
  },
  {
    q: 'What is the difference between a free AI tool and a free trial?',
    a: 'A free tier is permanent — you can use it indefinitely within usage limits, like ChatGPT\'s free plan or ElevenLabs\' 10,000 free characters per month. A free trial gives temporary access (usually 7–14 days) before requiring payment. This page includes both, clearly labelled with "Free", "Free tier available", or "Free trial".',
  },
  {
    q: 'Which free AI tools are best for content creators?',
    a: 'For content creators, the top free AI tools are CapCut (video editing, fully free), Canva AI (design and image editing), ChatGPT (scripts, captions, copy), ElevenLabs (voiceovers with a free tier), Suno (AI music generation), and Adobe Firefly (image generation). All offer enough free access to produce professional-quality content.',
  },
  {
    q: 'Do free AI tools have usage limits?',
    a: 'Most free AI tools cap usage in some way — daily credits, monthly generation limits, or feature restrictions. For example, ChatGPT\'s free tier limits GPT-4o usage, ElevenLabs\' free plan includes 10,000 characters per month, and Adobe Firefly gives 25 free generative credits monthly. Free tier details are shown on each tool\'s individual page.',
  },
]

export const metadata: Metadata = {
  title: 'Free AI Tools in 2026 — No Credit Card Required',
  description: 'Browse free AI tools — ChatGPT, Claude, Adobe Firefly, GitHub Copilot, ElevenLabs, and more. Filter by category. Free plans and free tiers, updated April 2026.',
  alternates: { canonical: `${BASE}/tools/free` },
  openGraph: {
    title: 'Free AI Tools in 2026 — No Credit Card Required',
    description: 'Free AI tools for writing, coding, image generation, audio, video, and more. Includes free tiers and permanent free plans. Updated April 2026.',
    url: `${BASE}/tools/free`,
  },
}

export default async function Page() {
  const allTools = await getAllTools()
  const freeTools: FreeTool[] = []

  for (const cat of CATEGORIES) {
    const tools = allTools[cat.id] ?? []
    for (const t of tools) {
      if (t.free) {
        freeTools.push({ ...t, categoryId: cat.id, categoryName: cat.name })
      }
    }
  }

  freeTools.sort((a, b) => b.rating - a.rating)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free AI Tools 2026',
    description: `${freeTools.length} free AI tools available with no credit card required`,
    url: `${BASE}/tools/free`,
    numberOfItems: freeTools.length,
    itemListElement: freeTools.map((t, i) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Free AI Tools', item: `${BASE}/tools/free` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FREE_FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FreeToolsClient tools={freeTools} faqs={FREE_FAQS} />
    </>
  )
}
