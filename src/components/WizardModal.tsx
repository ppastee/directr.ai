'use client'

import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, Category } from '@/data/tools'
import {
  planWizard,
  getWizardResults,
  mergeAnswers,
  extractSignals,
  WizardResult,
} from '@/lib/wizard'
import { scoreTools } from '@/lib/search'

interface WizardModalProps {
  query: string
  onClose: () => void
  onCategory: (cat: Category, toolId?: number) => void
}

const QUESTION_TIPS: Record<string, string> = {
  budget: 'We rank free or low-cost tools higher when your budget is tight.',
  skill: 'Affects whether we surface developer-focused tools, APIs and CLIs.',
  use_case: 'Tells us the dominant intent so we can show specialists, not generalists.',
  watermark: 'Many image and video tools brand outputs unless you upgrade.',
  commercial: 'Some models are trained on copyrighted content — risky for client work.',
  privacy: 'On-prem and open-source matter for regulated or proprietary code.',
  cloning: 'Voice cloning is a feature only a handful of audio tools do well.',
  citations: 'Critical for research; most general chat tools hallucinate sources.',
  context: 'Long-context tools handle whole books and codebases without choking.',
  duration: 'Some video tools are great for clips but fall apart on longer output.',
  realism: 'Photorealistic, avatar-based, and stylized tools have very little overlap.',
  volume: 'High-volume writing favours tools with brand voice training.',
  voice: 'Brand voice tools learn from your existing writing samples.',
  project: "Different builders specialise in different stacks.",
  source: '3D tools differ on whether they start from text, images or video.',
  engine: 'Game-ready output formats differ by tool.',
  team: 'Some tools price per seat; some are flat rate; some are enterprise-only.',
  stack: 'Integrations vary wildly — pick the tool that lives where you work.',
  channel: 'Most ad tools are best on one platform.',
  level: 'Some finance tools assume you can read a 10-K; others are beginner-friendly.',
  scale: 'Bookkeeping tools fall apart at enterprise; ERP tools are overkill for solos.',
  firm: 'Big-law tools assume Westlaw integration; in-house tools assume CLM.',
  subject: 'Education tools specialise hard by subject.',
  quality: 'Production-quality TTS sounds nothing like draft TTS.',
}

export default function WizardModal({ query, onClose, onCategory }: WizardModalProps) {
  const plan = useMemo(() => planWizard(query), [query])
  const signals = useMemo(() => extractSignals(query), [query])
  const previewMatches = useMemo(() => scoreTools(query, 3), [query])

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const isResults = step === plan.questions.length

  const results = useMemo<WizardResult[]>(() => {
    if (!isResults) return []
    const merged = mergeAnswers(plan.prefilled, answers)
    return getWizardResults(query, merged)
  }, [isResults, query, answers, plan.prefilled])

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
    setAnswers(prev => ({ ...prev, [plan.questions[step].id]: value }))
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

  const currentQ = plan.questions[step]
  const bestPick = results[0]
  const runnerUps = results.slice(1)
  const isClose = runnerUps.length > 0 && runnerUps[0].adjustedScore / (bestPick?.adjustedScore || 1) >= 0.78

  const prefilledEntries = Object.entries(plan.prefilled)

  return (
    <div className="wizard-full">
      {/* Top bar */}
      <div className="wizard-topbar">
        <button className="wizard-topbar-back" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
        <div className="wizard-topbar-chip">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="wizard-topbar-query">{query}</span>
        </div>
        <button className="search-modal-esc search-modal-close" onClick={onClose} style={{ flexShrink: 0 }} aria-label="Close">esc</button>
      </div>

      {/* Content */}
      <div className="wizard-full-body">

        {/* Question step — two-column layout */}
        {!isResults && currentQ && (
          <div className="wizard-layout" key={step}>

            {/* Main column */}
            <div className="wizard-step">
              <div className="wizard-step-label">Question {step + 1} of {plan.questions.length}</div>
              <h2 className="wizard-question">{currentQ.text}</h2>
              {currentQ.helper && (
                <p className="wizard-helper">{currentQ.helper}</p>
              )}
              <div className="wizard-options">
                {currentQ.options.map(opt => (
                  <button
                    key={opt.value}
                    className={`wizard-option${answers[currentQ.id] === opt.value ? ' selected' : ''}`}
                    onClick={() => handleAnswer(opt.value)}
                  >
                    <span className="wizard-option-label">{opt.label}</span>
                    {opt.hint && <span className="wizard-option-hint">{opt.hint}</span>}
                  </button>
                ))}
              </div>
              <div className="wizard-footer">
                <div className="wizard-progress">
                  {plan.questions.map((_, i) => (
                    <div key={i} className={`wizard-dot${i === step ? ' active' : i < step ? ' done' : ''}`} />
                  ))}
                </div>
                {step > 0 && (
                  <button className="wizard-back" onClick={() => setStep(s => s - 1)}>← Back</button>
                )}
              </div>
            </div>

            {/* Helper sidebar */}
            <aside className="wizard-side">
              <div className="wizard-side-card">
                <div className="wizard-side-label">Your search</div>
                <div className="wizard-side-query">"{query}"</div>
                <div className="wizard-side-meta">
                  <span>
                    <strong>{plan.candidateCount}</strong> matching {plan.candidateCount === 1 ? 'tool' : 'tools'}
                  </span>
                  {plan.topCategoryName && (
                    <>
                      <span className="wizard-side-meta-dot">·</span>
                      <span>top category <strong>{plan.topCategoryName}</strong></span>
                    </>
                  )}
                </div>
              </div>

              {(signals.phrases.length > 0 || prefilledEntries.length > 0) && (
                <div className="wizard-side-card">
                  <div className="wizard-side-label">What we picked up</div>
                  <div className="wizard-signal-list">
                    {prefilledEntries.map(([qid, v]) => (
                      <div key={qid} className="wizard-signal">
                        <span className="wizard-signal-dot" aria-hidden="true" />
                        <span className="wizard-signal-text">
                          {v.reason} — <em>auto-applied</em>
                        </span>
                      </div>
                    ))}
                    {signals.phrases.slice(0, 4).map(p => (
                      <div key={p} className="wizard-signal">
                        <span className="wizard-signal-dot" aria-hidden="true" />
                        <span className="wizard-signal-text">Detected phrase: <strong>{p}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {QUESTION_TIPS[currentQ.id] && (
                <div className="wizard-side-card wizard-side-tip">
                  <div className="wizard-side-label">Why we ask</div>
                  <p className="wizard-side-tip-text">{QUESTION_TIPS[currentQ.id]}</p>
                </div>
              )}

              {previewMatches.length > 0 && (
                <div className="wizard-side-card">
                  <div className="wizard-side-label">Currently leading</div>
                  <div className="wizard-side-preview">
                    {previewMatches.map(m => (
                      <div key={m.tool.id} className="wizard-side-preview-row">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="wizard-side-preview-logo"
                          src={`https://www.google.com/s2/favicons?domain=${m.tool.logoDomain}&sz=64`}
                          alt={m.tool.name}
                          onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
                        />
                        <div className="wizard-side-preview-text">
                          <div className="wizard-side-preview-name">{m.tool.name}</div>
                          <div className="wizard-side-preview-cat">{m.catName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="wizard-side-preview-hint">Your answers will reorder these.</div>
                </div>
              )}
            </aside>
          </div>
        )}

        {/* No results */}
        {isResults && results.length === 0 && (
          <div className="wizard-step" key="empty" style={{ maxWidth: 620 }}>
            <p className="wizard-question" style={{ fontSize: '1.6rem' }}>Nothing matched that search.</p>
            <p style={{ color: 'var(--fg2)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Try a different search term or browse by category.
            </p>
            <button className="wizard-restart" onClick={handleRestart}>← Start over</button>
          </div>
        )}

        {/* Results */}
        {isResults && results.length > 0 && (
          <div className="wizard-step" key="results" style={{ maxWidth: 620 }}>

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
                <div className="wizard-result-label" style={{ marginTop: '2rem' }}>
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
