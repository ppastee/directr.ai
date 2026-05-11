'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Category } from '@/data/tools'
import type { ToolsMap } from '@/lib/db'
import { buildVocabulary, correctQuery } from '@/lib/spellcheck'

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

const SUGGESTIONS = [
  'Animate a video',
  'Generate images without watermark',
  'Write marketing copy',
  'Build a full-stack app',
  'Clone my voice',
  'Transcribe a meeting',
]

interface SearchModalProps {
  onClose: () => void
  onSearch: (query: string) => void
  initialValue?: string
}

export default function SearchModal({ onClose, onSearch, initialValue = '' }: SearchModalProps) {
  const [value, setValue] = useState(initialValue)
  const [correctionDismissed, setCorrectionDismissed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const typewriterText = useTypewriter(TYPEWRITER_PHRASES)
  const [allTools, setAllTools] = useState<ToolsMap>({})
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/tools').then(r => r.json()).then(d => {
      setAllTools(d.tools ?? {})
      setCategories(d.categories ?? [])
    })
  }, [])

  const vocab = useMemo(() => buildVocabulary(allTools, categories), [allTools, categories])

  const correction = useMemo(() => {
    if (!value.trim() || !vocab.list.length || correctionDismissed) return null
    const result = correctQuery(value, vocab.set, vocab.list)
    return result.wasChanged ? result : null
  }, [value, vocab, correctionDismissed])

  const effectiveQuery = correction ? correction.corrected : value
  const hasQuery = value.trim().length > 0

  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus()
      if (initialValue) inputRef.current?.select()
    }, 10)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(id); document.body.style.overflow = '' }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      onSearch(effectiveQuery.trim())
      onClose()
    }
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>

        {/* Input row */}
        <div className="search-modal-row">
          <svg className="search-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <div className="search-modal-input-wrap">
            <input
              ref={inputRef}
              className="search-modal-input"
              value={value}
              onChange={(e) => { setValue(e.target.value); setCorrectionDismissed(false) }}
              onKeyDown={handleKeyDown}
            />
            {!value && (
              <div className="search-modal-typewriter-overlay" aria-hidden="true">
                {typewriterText}<span className="search-cursor" />
              </div>
            )}
          </div>
          {value && (
            <button className="search-modal-clear" onClick={() => { setValue(''); inputRef.current?.focus() }} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
          <button className="search-modal-close search-modal-esc" onClick={onClose} aria-label="Close">
            esc
          </button>
        </div>

        {/* Spell correction hint */}
        {correction && (
          <div className="search-correction-bar">
            <span className="search-correction-label">Showing results for</span>
            <span className="search-correction-query">{correction.corrected}</span>
            <button
              className="search-correction-original"
              onClick={() => setCorrectionDismissed(true)}
              title="Search with your original spelling"
            >
              Search instead for &ldquo;{value}&rdquo;
            </button>
          </div>
        )}

        {/* Results */}
        {hasQuery ? (
          <div className="search-modal-results">
            <button
              className="search-modal-enter-cta"
              onClick={() => { onSearch(effectiveQuery.trim()); onClose() }}
            >
              <span>See all matches for &ldquo;{effectiveQuery.trim()}&rdquo;</span>
              <span className="search-modal-enter-cta-hint">↵ Enter</span>
            </button>
          </div>
        ) : (
          <div className="search-modal-suggestions">
            <div className="search-modal-section-label">Try searching for</div>
            {SUGGESTIONS.map((s) => (
              <div key={s} className="search-modal-suggestion" onClick={() => { setValue(s); inputRef.current?.focus() }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.45 }}>
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                {s}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
