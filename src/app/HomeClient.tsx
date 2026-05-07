'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Category, nameToSlug } from '@/data/tools'
import type { ToolsMap } from '@/lib/db'
import Nav from '@/components/Nav'
import HomePage from '@/components/HomePage'
import WizardModal from '@/components/WizardModal'
import AnimatedBg from '@/components/AnimatedBg'

interface HomeClientProps {
  allTools: ToolsMap
  categories: Category[]
}

export default function HomeClient({ allTools, categories }: HomeClientProps) {
  const router = useRouter()
  const [heroScrolled, setHeroScrolled] = useState(false)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardQuery, setWizardQuery] = useState('')

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) {
      setWizardQuery(q)
      setWizardOpen(true)
      window.history.replaceState({}, '', '/')
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setHeroScrolled(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleCategory(cat: Category, toolId?: number) {
    if (toolId) {
      const tool = allTools[cat.id]?.find(t => t.id === toolId)
      if (tool) { router.push(`/tool/${nameToSlug(tool.name)}`); return }
    }
    router.push(`/category/${cat.slug}`)
  }

  function handleHome() {
    setWizardOpen(false)
    setWizardQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleWizard(query: string) {
    setWizardQuery(query)
    setWizardOpen(true)
  }

  function handleEditQuery(query: string) {
    setWizardQuery(query)
  }

  return (
    <>
<AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav
          onHome={handleHome}
          showSearch={heroScrolled}
          onWizard={handleWizard}
          onCategory={handleCategory}
          currentQuery={wizardOpen ? wizardQuery : ''}
        />
        <HomePage onCategory={handleCategory} onWizard={handleWizard} allTools={allTools} categories={categories} />
      </div>
      {wizardOpen && (
        <WizardModal
          key={wizardQuery}
          query={wizardQuery}
          onClose={() => setWizardOpen(false)}
          onCategory={handleCategory}
          onEditQuery={handleEditQuery}
          allTools={allTools}
          categories={categories}
        />
      )}
    </>
  )
}
