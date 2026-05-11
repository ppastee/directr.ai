'use client'

import { useState } from 'react'

interface StuckButtonProps {
  onClick: () => void
  hidden?: boolean
}

export default function StuckButton({ onClick, hidden = false }: StuckButtonProps) {
  const [expanded, setExpanded] = useState(false)

  if (hidden) return null

  return (
    <div
      className={`stuck-btn-wrap${expanded ? ' stuck-btn-wrap-open' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Expanded panel — slides out from the circle */}
      <div
        className="stuck-btn-panel"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      >
        <div className="stuck-btn-panel-title">Stuck? We&rsquo;ll help you pick</div>
        <div className="stuck-btn-panel-sub">Answer 3 quick questions and we&rsquo;ll match you with the right tool.</div>

        <div className="stuck-btn-how-label">How this works</div>
        <ol className="wizard-how-steps stuck-btn-how-steps">
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

      {/* Circle */}
      <button
        className="stuck-btn-circle"
        onClick={onClick}
        aria-label="Stuck? We'll help you pick"
        aria-expanded={expanded}
      >
        <svg className="stuck-btn-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 3l1.6 5L18 9.7l-5.4 1.6L11 17l-1.6-5.7L4 9.7l5.4-1.7z" />
          <path d="M18.2 16l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" />
        </svg>
        <span className="stuck-btn-circle-label">Stuck?</span>
      </button>
    </div>
  )
}
