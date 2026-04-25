'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tool, Category, CATEGORIES } from '@/data/tools'
import Nav from './Nav'
import AnimatedBg from './AnimatedBg'
import ToolDetailPage from './ToolDetailPage'

interface Props {
  tool: Tool
  categoryId: string
}

export default function ToolRoute({ tool, categoryId }: Props) {
  const router = useRouter()
  const cat = CATEGORIES.find((c) => c.id === categoryId) as Category

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  function handleCategory(c: Category, toolId?: number) {
    router.push(`/category/${c.id}${toolId ? `?highlight=${toolId}` : ''}`)
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
        <ToolDetailPage tool={tool} categoryId={categoryId} cat={cat} />
      </div>
    </>
  )
}
