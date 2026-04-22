'use client'

import { useState, useEffect, useRef } from 'react'
import { CATEGORIES, TOOLS, Category, Tool } from '@/data/tools'
import SearchModal from './SearchModal'
import CategoryIcon from './CategoryIcon'

function ToolItemLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className="finder-tool-logo-fallback">{tool.emoji}</span>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="finder-tool-logo"
      src={`https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=32`}
      alt=""
      width={14}
      height={14}
      onError={() => setFailed(true)}
    />
  )
}

interface HomePageProps {
  onCategory: (cat: Category) => void
  onSearch: (query: string) => void
}

const PILLS = ['Animate a video', 'Generate images', 'Write copy', 'Build a chatbot', 'Create music']

const TYPEWRITER_PHRASES = [
  'animate a product demo...',
  'clone my voice for a podcast...',
  'build a full-stack app...',
  'generate images without watermark...',
  'write SEO blog articles...',
  'create studio-quality music...',
  'transcribe a meeting...',
]

function useTypewriter(phrases: string[], typingMs = 55, deletingMs = 28, pauseMs = 1900) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[idx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), typingMs)
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), deletingMs)
    } else {
      setDeleting(false)
      setIdx(i => (i + 1) % phrases.length)
    }

    setText(phrases[idx].slice(0, charIdx))
    return () => clearTimeout(timer)
  }, [charIdx, deleting, idx, phrases, typingMs, deletingMs, pauseMs])

  return text
}


export default function HomePage({ onCategory, onSearch }: HomePageProps) {
  const [searchInitial, setSearchInitial] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [gridVisible, setGridVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const typewriterText = useTypewriter(TYPEWRITER_PHRASES)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGridVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function openSearch(initial = '') {
    setSearchInitial(initial)
    setIsSearching(true)
    setSearchOpen(true)
  }

  function closeSearch() {
    setSearchOpen(false)
    setIsSearching(false)
  }

  return (
    <div className="page">
      {searchOpen && (
        <SearchModal
          onClose={closeSearch}
          onCategory={onCategory}
          onSearch={onSearch}
          initialValue={searchInitial}
        />
      )}

      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">The AI Tools Search Engine</div>

        <h1 className="hero-title">
          &ldquo;you can go any <em>direction</em>{' '}you choose&rdquo;
        </h1>

        <div
          className={`search-bar${isSearching ? ' is-searching' : ''}`}
          onClick={() => openSearch()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openSearch() }}
          tabIndex={0}
          role="searchbox"
          aria-label="Search AI tools"
          style={{ cursor: 'text' }}
        >
          <div className="search-typewriter">
            {typewriterText || <span style={{ opacity: 0 }}>_</span>}
            <span className="search-cursor" />
          </div>
          <button className="search-btn" tabIndex={-1}>Search</button>
        </div>

        <div className="hero-pills">
          {PILLS.map((p, i) => (
            <div
              key={p}
              className="hero-pill"
              style={{ '--pill-i': i } as React.CSSProperties}
              onClick={() => openSearch(p)}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Browse by category</h2>
        </div>
        <div ref={gridRef} className={`finder-grid${gridVisible ? ' grid-visible' : ''}`}>
          {CATEGORIES.map((c, idx) => {
            const topTools = (TOOLS[c.id] ?? []).slice(0, 4)
            return (
              <div
                key={c.id}
                className="finder-card"
                data-dir={idx % 2 === 0 ? 'left' : 'right'}
                style={{ '--card-i': idx, '--card-delay': `${idx * 0.07}s` } as React.CSSProperties}
                onClick={() => onCategory(c)}
              >
                <div className="finder-card-header">
                  <span className="finder-icon">
                    <CategoryIcon id={c.id} size={26} />
                  </span>
                  <div>
                    <div className="finder-cat-name">{c.name}</div>
                    <div className="finder-cat-count">{c.count} tools</div>
                  </div>
                </div>
                <ul className="finder-tool-list">
                  {topTools.map((t) => (
                    <li key={t.id} className="finder-tool-item">
                      <span className="finder-tool-item-name">
                        <ToolItemLogo tool={t} />
                        {t.name}
                      </span>
                      {t.freeTierLabel === 'Free' && <span className="finder-free-pill">Free</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      <div className="footer">
        © 2026 Director.ai · Data updated weekly · We earn referral fees from some links
      </div>
    </div>
  )
}
