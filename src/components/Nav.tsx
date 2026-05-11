'use client'

import { useState } from 'react'
import ListToolModal from './ListToolModal'
import SearchModal from './SearchModal'
import { Category } from '@/data/tools'

interface NavProps {
  onHome: () => void
  showSearch?: boolean
  onWizard?: (query: string) => void
  onCategory?: (cat: Category, toolId?: number) => void
  currentQuery?: string
}

export default function Nav({ onHome, showSearch, onWizard, onCategory, currentQuery = '' }: NavProps) {
  const [showListModal, setShowListModal] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.png" alt="" height={28} style={{ display: 'block', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)' }}>Directr</span>
        </div>

        <div className="nav-center">
          {showSearch && (
            <div className="nav-search" onClick={() => setSearchOpen(true)} style={{ cursor: 'text' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-search-icon">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span className="nav-search-placeholder">
                {currentQuery || 'Search tools…'}
              </span>
            </div>
          )}
        </div>

        <div className="nav-actions">
          <button className="nav-cta" onClick={() => setShowListModal(true)}>List a Tool</button>
        </div>
      </nav>

      {searchOpen && (
        <SearchModal
          initialValue={currentQuery}
          onClose={() => setSearchOpen(false)}
          onWizard={(q) => { onWizard?.(q); setSearchOpen(false) }}
        />
      )}
      {showListModal && <ListToolModal onClose={() => setShowListModal(false)} />}
    </>
  )
}
