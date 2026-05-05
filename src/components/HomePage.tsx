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
  onWizard: (query: string) => void
}

const PILLS = ['Animate a video', 'Generate images', 'Write copy', 'Build a chatbot', 'Create music']

const HEADLINES = [
  { text: '"you can go any direction you choose"', quoted: true },
  { text: "Matching people to AI tools since '26", quoted: false },
  { text: "There's an AI tool for any task", quoted: false },
  { text: 'You type the task. We find the tools', quoted: false },
]


const TYPEWRITER_PHRASES = [
  'animate a video...',
  'clone my voice...',
  'build an app...',
  'generate images...',
  'write a blog post...',
  'create music...',
  'transcribe audio...',
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


export default function HomePage({ onCategory, onWizard }: HomePageProps) {
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
          onWizard={onWizard}
          initialValue={searchInitial}
        />
      )}

      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">The AI Tools Search Engine</div>

        <div className="hero-title-wrap">
          <div className="hero-title-track">
            {[...HEADLINES, HEADLINES[0]].map((h, i) => (
              <h1 key={i} className="hero-title">
                {h.quoted ? (
                  <>&ldquo;you can go any <em>direction</em>{' '}you choose&rdquo;</>
                ) : h.text}
              </h1>
            ))}
          </div>
        </div>

        <div
          className={`search-bar${isSearching ? ' is-searching' : ''}`}
          onClick={() => openSearch()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openSearch() }}
          tabIndex={0}
          role="searchbox"
          aria-label="Search tools"
          style={{ cursor: 'text' }}
        >
          <div className="search-typewriter">
            {typewriterText || <span style={{ opacity: 0 }}>_</span>}
            <span className="search-cursor" />
          </div>
          <div className="search-btn" aria-hidden="true">Find my match</div>
        </div>
        <div className="search-flow">
          <span>Describe your task</span>
          <span className="search-flow-arrow">→</span>
          <span>Answer a few questions</span>
          <span className="search-flow-arrow">→</span>
          <span>Get matched to the best tool</span>
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
          <h2 className="section-title">What are you building?</h2>
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
        © 2026 Directr · Data updated weekly · We earn referral fees from some links
      </div>
    </div>
  )
}
