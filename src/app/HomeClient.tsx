'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@/data/tools'
import Nav from '@/components/Nav'
import HomePage from '@/components/HomePage'
import WizardModal from '@/components/WizardModal'
import AnimatedBg from '@/components/AnimatedBg'

export default function HomeClient() {
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
    router.push(`/category/${cat.slug}${toolId ? `?highlight=${toolId}` : ''}`)
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
        <HomePage onCategory={handleCategory} onWizard={handleWizard} />
      </div>
      {wizardOpen && (
        <WizardModal
          query={wizardQuery}
          onClose={() => setWizardOpen(false)}
          onCategory={handleCategory}
        />
      )}
    </>
  )
}
