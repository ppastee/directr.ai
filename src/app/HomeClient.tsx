'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Category, nameToSlug } from '@/data/tools'
import type { ToolsMap } from '@/lib/db'
import Nav from '@/components/Nav'
import HomePage from '@/components/HomePage'
import WizardModal from '@/components/WizardModal'
import WizardIntroModal from '@/components/WizardIntroModal'
import StuckButton from '@/components/StuckButton'
import SearchResultsPage from '@/components/SearchResultsPage'
import AnimatedBg from '@/components/AnimatedBg'

interface HomeClientProps {
  allTools: ToolsMap
  categories: Category[]
}

export default function HomeClient({ allTools, categories }: HomeClientProps) {
  const router = useRouter()
  const [heroScrolled, setHeroScrolled] = useState(false)

  // Wizard
  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardQuery, setWizardQuery] = useState('')
  const [introOpen, setIntroOpen] = useState(false)

  // Search results overlay
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) {
      setSearchQuery(q)
      setSearchOpen(true)
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
    setSearchOpen(false)
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearch(query: string) {
    setSearchQuery(query)
    setSearchOpen(true)
  }

  function handleStartWizard(query: string) {
    setIntroOpen(false)
    setWizardQuery(query)
    setWizardOpen(true)
  }

  function handleEditQuery(query: string) {
    setWizardQuery(query)
  }

  const anyModalOpen = wizardOpen || introOpen

  return (
    <>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav
          onHome={handleHome}
          showSearch={heroScrolled || searchOpen}
          onSearch={handleSearch}
          onCategory={handleCategory}
          currentQuery={searchOpen ? searchQuery : (wizardOpen ? wizardQuery : '')}
        />
        {searchOpen ? (
          <SearchResultsPage
            query={searchQuery}
            onHome={handleHome}
            onCategory={handleCategory}
            onNewSearch={(q) => setSearchQuery(q)}
            allTools={allTools}
            categories={categories}
          />
        ) : (
          <HomePage onCategory={handleCategory} onSearch={handleSearch} allTools={allTools} categories={categories} />
        )}
      </div>

      <StuckButton onClick={() => setIntroOpen(true)} hidden={anyModalOpen} />

      {introOpen && (
        <WizardIntroModal
          onClose={() => setIntroOpen(false)}
          onSubmit={handleStartWizard}
        />
      )}

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
