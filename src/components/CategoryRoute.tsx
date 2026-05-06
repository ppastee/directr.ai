'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Category, Tool } from '@/data/tools'
import Nav from './Nav'
import CategoryPage from './CategoryPage'
import AnimatedBg from './AnimatedBg'

interface FAQ { q: string; a: string }

function Inner({ cat, tools, allCategories, faqs }: { cat: Category; tools: Tool[]; allCategories: Category[]; faqs: FAQ[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const highlightId = searchParams.get('highlight') ? parseInt(searchParams.get('highlight')!) : null

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  function handleCategory(c: Category, toolId?: number) {
    router.push(`/category/${c.slug}${toolId ? `?highlight=${toolId}` : ''}`)
  }

  return (
    <>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav
          onHome={() => router.push('/')}
          showSearch={true}
          onWizard={(q) => router.push(`/?q=${encodeURIComponent(q)}`)}
          onCategory={handleCategory}
        />
        <CategoryPage
          cat={cat}
          tools={tools}
          allCategories={allCategories}
          onHome={() => router.push('/')}
          highlightedToolId={highlightId}
          faqs={faqs}
        />
      </div>
    </>
  )
}

export default function CategoryRoute({ cat, tools, allCategories, faqs }: { cat: Category; tools: Tool[]; allCategories: Category[]; faqs: FAQ[] }) {
  return (
    <Suspense>
      <Inner cat={cat} tools={tools} allCategories={allCategories} faqs={faqs} />
    </Suspense>
  )
}
