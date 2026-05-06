import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES, nameToSlug } from '@/data/tools'
import { getAllTools } from '@/lib/db'
import { PROFESSIONS, getProfessionBySlug, getAllProfessionSlugs } from '@/data/professions'
import { TASKS, getTaskBySlug, getAllTaskSlugs } from '@/data/tasks'
import UseCaseClient, { UseCaseTool } from '@/components/UseCaseClient'

const BASE = 'https://directr.com.au'

export function generateStaticParams() {
  return [
    ...getAllProfessionSlugs().map((slug) => ({ slug })),
    ...getAllTaskSlugs().map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const profession = getProfessionBySlug(slug)
  if (profession) {
    return {
      title: `${profession.h1} — Directr`,
      description: profession.intro.slice(0, 155),
      alternates: { canonical: `${BASE}/tools/${slug}` },
      openGraph: {
        title: profession.h1,
        description: profession.intro.slice(0, 155),
        url: `${BASE}/tools/${slug}`,
      },
    }
  }

  const task = getTaskBySlug(slug)
  if (task) {
    return {
      title: `${task.h1} — Directr`,
      description: task.intro.slice(0, 155),
      alternates: { canonical: `${BASE}/tools/${slug}` },
      openGraph: {
        title: task.h1,
        description: task.intro.slice(0, 155),
        url: `${BASE}/tools/${slug}`,
      },
    }
  }

  return {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allTools = await getAllTools()
  const toolMap = new Map<number, UseCaseTool>()
  for (const cat of CATEGORIES) {
    for (const t of allTools[cat.id] ?? []) {
      toolMap.set(t.id, { ...t, categoryId: cat.id, categoryName: cat.name })
    }
  }

  const profession = getProfessionBySlug(slug)
  if (profession) {
    const tools = profession.toolIds
      .map((id) => toolMap.get(id))
      .filter((t): t is UseCaseTool => t !== undefined)

    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: profession.h1,
      description: profession.intro.slice(0, 200),
      url: `${BASE}/tools/${slug}`,
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
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/tools/free` },
        { '@type': 'ListItem', position: 3, name: `AI Tools for ${profession.label}`, item: `${BASE}/tools/${slug}` },
      ],
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: profession.faqs.map(({ q, a }) => ({
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
        <UseCaseClient
          slug={slug}
          h1={profession.h1}
          label={profession.label}
          intro={profession.intro}
          tools={tools}
          faqs={profession.faqs}
          type="profession"
        />
      </>
    )
  }

  const task = getTaskBySlug(slug)
  if (task) {
    const tools = task.toolIds
      .map((id) => toolMap.get(id))
      .filter((t): t is UseCaseTool => t !== undefined)

    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: task.h1,
      description: task.intro.slice(0, 200),
      url: `${BASE}/tools/${slug}`,
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
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/tools/free` },
        { '@type': 'ListItem', position: 3, name: `AI Tools for ${task.label}`, item: `${BASE}/tools/${slug}` },
      ],
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: task.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }

    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${task.label.toLowerCase()} with AI tools`,
      description: task.intro.slice(0, 200),
      step: task.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <UseCaseClient
          slug={slug}
          h1={task.h1}
          label={task.label}
          intro={task.intro}
          tools={tools}
          steps={task.steps}
          faqs={task.faqs}
          type="task"
        />
      </>
    )
  }

  notFound()
}
