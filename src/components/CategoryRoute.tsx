'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Category } from '@/data/tools'
import Nav from './Nav'
import CategoryPage from './CategoryPage'
import AnimatedBg from './AnimatedBg'

function Inner({ cat }: { cat: Category }) {
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
          onSearch={(q) => router.push(`/?q=${encodeURIComponent(q)}`)}
          onCategory={handleCategory}
        />
        <CategoryPage
          cat={cat}
          onHome={() => router.push('/')}
          highlightedToolId={highlightId}
        />
      </div>
    </>
  )
}

export default function CategoryRoute({ cat }: { cat: Category }) {
  return (
    <Suspense>
      <Inner cat={cat} />
    </Suspense>
  )
}
