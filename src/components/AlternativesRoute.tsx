'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tool, Category, CATEGORIES } from '@/data/tools'
// CATEGORIES for static cat lookup; categoryTools come from server props
import { ComparisonEntry } from '@/data/comparisons'
import Nav from './Nav'
import AnimatedBg from './AnimatedBg'
import AlternativesPage from './AlternativesPage'

interface Props {
  tool: Tool
  categoryId: string
  entry: ComparisonEntry | undefined
  categoryTools: Tool[]
}

export default function AlternativesRoute({ tool, categoryId, entry, categoryTools }: Props) {
  const router = useRouter()
  const cat = CATEGORIES.find((c) => c.id === categoryId) as Category

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  return (
    <>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav
          onHome={() => router.push('/')}
          showSearch={true}
          onSearch={(q: string) => router.push(`/?q=${encodeURIComponent(q)}`)}
          onCategory={(c) => router.push(`/category/${c.slug}`)}
        />
        <AlternativesPage tool={tool} categoryId={categoryId} cat={cat} entry={entry} categoryTools={categoryTools} />
      </div>
    </>
  )
}
