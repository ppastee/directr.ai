import { notFound } from 'next/navigation'
import { findToolBySlug, getAllToolSlugs, CATEGORIES } from '@/data/tools'
import ToolRoute from '@/components/ToolRoute'

export async function generateStaticParams() {
  return getAllToolSlugs().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = findToolBySlug(slug)
  if (!result) return {}
  const { tool, categoryId } = result
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  return {
    title: `${tool.name} Review & Alternatives 2026 — Directr.ai`,
    description: `${tool.tagline}. ${tool.desc} Compare pricing, features, and alternatives.`,
    openGraph: {
      title: `${tool.name} — ${tool.tagline}`,
      description: `${tool.price} · ${tool.rating}★ · Compare with ${cat?.name ?? ''} alternatives`,
      url: `https://directr.ai/tool/${slug}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = findToolBySlug(slug)
  if (!result) notFound()
  return <ToolRoute tool={result.tool} categoryId={result.categoryId} />
}
