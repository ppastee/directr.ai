'use client'

import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, Category } from '@/data/tools'
import { getQuestionsForQuery, getWizardResults, WizardResult } from '@/lib/wizard'

interface WizardModalProps {
  query: string
  onClose: () => void
  onCategory: (cat: Category, toolId?: number) => void
}

export default function WizardModal({ query, onClose, onCategory }: WizardModalProps) {
  const questions = useMemo(() => getQuestionsForQuery(query), [query])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const isResults = step === questions.length

  const results = useMemo<WizardResult[]>(() => {
    if (!isResults) return []
    return getWizardResults(query, answers)
  }, [isResults, query, answers])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleAnswer(value: string) {
    setAnswers(prev => ({ ...prev, [questions[step].id]: value }))
    setStep(s => s + 1)
  }

  function handleSelect(r: WizardResult) {
    const cat = CATEGORIES.find(c => c.id === r.catId)
    if (cat) { onCategory(cat, r.tool.id); onClose() }
  }

  function handleRestart() {
    setStep(0)
    setAnswers({})
  }

  const currentQ = questions[step]
  const bestPick = results[0]
  const runnerUps = results.slice(1)
  const isClose = runnerUps.length > 0 && runnerUps[0].adjustedScore / bestPick?.adjustedScore >= 0.78

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="wizard-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="wizard-header">
          <div className="wizard-query-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span className="wizard-query-text">{query}</span>
          </div>
          <button className="search-modal-esc search-modal-close" onClick={onClose} aria-label="Close">esc</button>
        </div>

        {/* Question step */}
        {!isResults && currentQ && (
          <div className="wizard-body" key={step}>
            <div className="wizard-step-label">Question {step + 1} of {questions.length}</div>
            <h2 className="wizard-question">{currentQ.text}</h2>
            <div className="wizard-options">
              {currentQ.options.map(opt => (
                <button
                  key={opt.value}
                  className={`wizard-option${answers[currentQ.id] === opt.value ? ' selected' : ''}`}
                  onClick={() => handleAnswer(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="wizard-footer">
              <div className="wizard-progress">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`wizard-dot${i === step ? ' active' : i < step ? ' done' : ''}`}
                  />
                ))}
              </div>
              {step > 0 && (
                <button className="wizard-back" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
            </div>
          </div>
        )}

        {/* No results */}
        {isResults && results.length === 0 && (
          <div className="wizard-body" key="empty">
            <p className="wizard-question" style={{ fontSize: '1.2rem' }}>Nothing matched that search.</p>
            <p style={{ color: 'var(--fg2)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Try a different search term or browse by category.
            </p>
            <button className="wizard-restart" onClick={handleRestart}>← Start over</button>
          </div>
        )}

        {/* Results */}
        {isResults && results.length > 0 && (
          <div className="wizard-results" key="results">

            <div className="wizard-result-label">Best pick</div>

            <div className="wizard-best-pick" onClick={() => handleSelect(bestPick)}>
              <span className="wizard-best-badge">Best match</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="wizard-pick-logo"
                src={`https://www.google.com/s2/favicons?domain=${bestPick.tool.logoDomain}&sz=64`}
                alt={bestPick.tool.name}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="wizard-pick-info">
                <div className="wizard-pick-name">{bestPick.tool.name}</div>
                <div className="wizard-pick-tagline">{bestPick.tool.tagline}</div>
                {(bestPick.strengths.length > 0 || bestPick.mismatches.length > 0) && (
                  <div className="wizard-chips">
                    {bestPick.strengths.map(s => <span key={s} className="wizard-chip-strength">{s}</span>)}
                    {bestPick.mismatches.map(m => <span key={m} className="wizard-chip-mismatch">⚠ {m}</span>)}
                  </div>
                )}
              </div>
              <div className="wizard-pick-cat">{bestPick.catName}</div>
            </div>

            {runnerUps.length > 0 && (
              <>
                <div className="wizard-result-label" style={{ marginTop: '1.4rem' }}>
                  {isClose ? 'Also a strong fit' : 'Worth a look'}
                </div>
                {runnerUps.map(r => (
                  <div key={r.tool.id} className="wizard-runner-up" onClick={() => handleSelect(r)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="wizard-runner-logo"
                      src={`https://www.google.com/s2/favicons?domain=${r.tool.logoDomain}&sz=64`}
                      alt={r.tool.name}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <div className="wizard-runner-info">
                      <div className="wizard-runner-name">{r.tool.name}</div>
                      <div className="wizard-runner-tagline">{r.tool.tagline}</div>
                      {(r.strengths.length > 0 || r.mismatches.length > 0) && (
                        <div className="wizard-runner-badges">
                          {r.strengths.map(s => <span key={s} className="wizard-chip-strength">{s}</span>)}
                          {r.mismatches.map(m => <span key={m} className="wizard-chip-mismatch">⚠ {m}</span>)}
                        </div>
                      )}
                    </div>
                    <div className="wizard-runner-cat">{r.catName}</div>
                  </div>
                ))}
              </>
            )}

            <button className="wizard-restart" onClick={handleRestart}>← Start over</button>
          </div>
        )}

      </div>
    </div>
  )
}
