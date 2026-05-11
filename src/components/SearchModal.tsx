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
  onWizard: (query: string) => void
  initialValue?: string
}

export default function SearchModal({ onClose, onWizard, initialValue = '' }: SearchModalProps) {
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
      onWizard(effectiveQuery.trim())
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
            <div className="search-modal-how">
              <div className="search-modal-section-label">How this works</div>
              <ol className="wizard-how-steps">
                <li className="wizard-how-step" style={{ ['--step-i' as string]: 0 }}>
                  <span className="wizard-how-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                  </span>
                  <div className="wizard-how-text">
                    <div className="wizard-how-title">You search</div>
                    <div className="wizard-how-desc">Describe what you&rsquo;re trying to do.</div>
                  </div>
                </li>
                <li className="wizard-how-step" style={{ ['--step-i' as string]: 1 }}>
                  <span className="wizard-how-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 3v-3H6a2 2 0 0 1-2-2z" />
                      <path d="M9.6 9.6a2.5 2.5 0 1 1 3 2.5c-.5.2-.7.6-.7 1.1" />
                      <circle cx="11.85" cy="14.7" r="0.55" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <div className="wizard-how-text">
                    <div className="wizard-how-title">We clarify</div>
                    <div className="wizard-how-desc">Pick from 1&ndash;3 quick options.</div>
                  </div>
                </li>
                <li className="wizard-how-step" style={{ ['--step-i' as string]: 2 }}>
                  <span className="wizard-how-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 3l1.6 5L18 9.7l-5.4 1.6L11 17l-1.6-5.7L4 9.7l5.4-1.7z" />
                      <path d="M18.2 16l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" />
                    </svg>
                  </span>
                  <div className="wizard-how-text">
                    <div className="wizard-how-title">Best match</div>
                    <div className="wizard-how-desc">Tools ranked for your context.</div>
                  </div>
                </li>
              </ol>
            </div>
            <button
              className="search-modal-wizard-cta"
              onClick={() => { onWizard(effectiveQuery.trim()); onClose() }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Find my best match
              <span className="search-modal-wizard-cta-hint">answer 3 quick questions</span>
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
