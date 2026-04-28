import { notFound } from 'next/navigation'
import { CATEGORIES, TOOLS } from '@/data/tools'
import CategoryRoute from '@/components/CategoryRoute'

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = CATEGORIES.find((c) => c.id === id)
  if (!cat) return {}
  const tools = TOOLS[id] ?? []
  const topTools = tools.slice(0, 3).map((t) => t.name).join(', ')
  return {
    title: `Best ${cat.name} Tools 2026 — Directr`,
    description: `Compare ${cat.count} tools for ${cat.name.toLowerCase()}. Top picks: ${topTools}. Unbiased ratings, pricing and reviews updated April 2026.`,
    openGraph: {
      title: `Best ${cat.name} Tools 2026`,
      description: `Compare ${cat.count} tools · Updated April 2026 · Directr`,
      url: `https://directr.com.au/category/${id}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = CATEGORIES.find((c) => c.id === id)
  if (!cat) notFound()
  return <CategoryRoute cat={cat} />
}
