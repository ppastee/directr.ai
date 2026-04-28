'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@/data/tools'
import Nav from '@/components/Nav'
import HomePage from '@/components/HomePage'
import SearchResultsPage from '@/components/SearchResultsPage'
import AnimatedBg from '@/components/AnimatedBg'

type Page = 'home' | 'search'

export default function HomeClient() {
  const router = useRouter()
  const [page, setPage] = useState<Page>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [heroScrolled, setHeroScrolled] = useState(false)

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) {
      setSearchQuery(q)
      setPage('search')
      window.history.replaceState({}, '', '/')
    }
  }, [])

  useEffect(() => {
    if (page !== 'home') { setHeroScrolled(false); return }
    const onScroll = () => setHeroScrolled(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])

  function handleCategory(cat: Category, toolId?: number) {
    router.push(`/category/${cat.slug}${toolId ? `?highlight=${toolId}` : ''}`)
  }

  function handleHome() {
    setPage('home')
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
