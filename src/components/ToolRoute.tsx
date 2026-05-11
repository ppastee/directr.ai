'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tool, Category, CATEGORIES } from '@/data/tools'
// CATEGORIES used only for static cat lookup; tools come from server props
import Nav from './Nav'
import AnimatedBg from './AnimatedBg'
import ToolDetailPage from './ToolDetailPage'

interface Props {
  tool: Tool
  categoryId: string
  categoryTools: Tool[]
}

export default function ToolRoute({ tool, categoryId, categoryTools }: Props) {
  const router = useRouter()
  const cat = CATEGORIES.find((c) => c.id === categoryId) as Category

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
          onSearch={(q: string) => router.push(`/?q=${encodeURIComponent(q)}`)}
          onCategory={handleCategory}
        />
        <ToolDetailPage tool={tool} categoryId={categoryId} cat={cat} categoryTools={categoryTools} />
      </div>
    </>
  )
}
