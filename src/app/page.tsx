'use client'

import { useState, useEffect } from 'react'
import { Theme, Category } from '@/data/tools'
import Nav from '@/components/Nav'
import HomePage from '@/components/HomePage'
import CategoryPage from '@/components/CategoryPage'
import SearchResultsPage from '@/components/SearchResultsPage'
import AnimatedBg from '@/components/AnimatedBg'

type Page = 'home' | 'category' | 'search'

export default function App() {
  const [theme, setTheme] = useState<Theme>('signal')
  const [page, setPage] = useState<Page>('home')
  const [activeCat, setActiveCat] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedToolId, setHighlightedToolId] = useState<number | null>(null)
  const [heroScrolled, setHeroScrolled] = useState(false)

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  useEffect(() => {
    if (page !== 'home') { setHeroScrolled(false); return }
    const onScroll = () => setHeroScrolled(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])

  function handleCategory(cat: Category, toolId?: number) {
    setActiveCat(cat)
    setHighlightedToolId(toolId ?? null)
    setPage('category')
    window.scrollTo({ top: 0, behavior: toolId ? 'instant' : 'smooth' })
  }

  function handleHome() {
    setPage('home')
    setActiveCat(null)
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearch(query: string) {
    setSearchQuery(query)
    setPage('search')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
<Nav
          onHome={handleHome}
          showSearch={page !== 'home' || heroScrolled}
          onSearch={handleSearch}
          onCategory={handleCategory}
          currentQuery={page === 'search' ? searchQuery : ''}
        />
        {page === 'home' && (
          <HomePage onCategory={handleCategory} onSearch={handleSearch} />
        )}
        {page === 'category' && activeCat && (
          <CategoryPage cat={activeCat} onHome={handleHome} highlightedToolId={highlightedToolId} />
        )}
        {page === 'search' && (
          <SearchResultsPage
            query={searchQuery}
            onHome={handleHome}
            onCategory={handleCategory}
            onNewSearch={handleSearch}
          />
        )}
      </div>
    </>
  )
}
