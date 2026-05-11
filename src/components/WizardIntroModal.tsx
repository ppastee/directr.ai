'use client'

import { useEffect, useRef, useState } from 'react'

const PLACEHOLDER_EXAMPLES = [
  'I need to animate a product demo…',
  'I want to clone my voice…',
  'I need to write SEO articles…',
  'I want to build an app without code…',
  'I need to transcribe meetings…',
]

interface WizardIntroModalProps {
  onClose: () => void
  onSubmit: (query: string) => void
}

export default function WizardIntroModal({ onClose, onSubmit }: WizardIntroModalProps) {
  const [value, setValue] = useState('')
  const [phraseIdx] = useState(() => Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 10)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(id); document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function submit() {
    const q = value.trim()
    if (!q) return
    onSubmit(q)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal wizard-intro-modal" onClick={(e) => e.stopPropagation()}>

        <div className="wizard-intro-head">
          <div className="wizard-intro-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 3l1.6 5L18 9.7l-5.4 1.6L11 17l-1.6-5.7L4 9.7l5.4-1.7z" />
              <path d="M18.2 16l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" />
            </svg>
            Find your match
          </div>
          <h2 className="wizard-intro-title">What are you trying to do?</h2>
          <p className="wizard-intro-sub">Describe it in your own words. We&rsquo;ll ask 1&ndash;3 follow-ups, then recommend the best tool.</p>
          <button className="search-modal-esc search-modal-close wizard-intro-esc" onClick={onClose} aria-label="Close">esc</button>
        </div>

        <div className="search-modal-row wizard-intro-row">
          <svg className="search-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <div className="search-modal-input-wrap">
            <input
              ref={inputRef}
              className="search-modal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={PLACEHOLDER_EXAMPLES[phraseIdx]}
            />
          </div>
          <button
            className="search-modal-find wizard-intro-submit"
            onClick={submit}
            disabled={!value.trim()}
          >
            Start →
          </button>
        </div>

        <div className="search-modal-results wizard-intro-how">
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
                <div className="wizard-how-title">You describe</div>
                <div className="wizard-how-desc">Tell us what you&rsquo;re trying to do.</div>
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
      </div>
    </div>
  )
}
