'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Category } from '@/data/tools'
import type { ToolsMap } from '@/lib/db'
import {
  planWizard,
  getWizardResults,
  mergeAnswers,
  extractSignals,
  WizardResult,
  Question,
} from '@/lib/wizard'
interface WizardModalProps {
  query: string
  onClose: () => void
  onCategory: (cat: Category, toolId?: number) => void
  onEditQuery: (q: string) => void
  allTools: ToolsMap
  categories: Category[]
}

interface AIPlan {
  categoryId: string | null
  intentSummary: string
  prefilled: Record<string, { value: string; reason: string }>
  questions: Question[]
  noIntent: boolean
  candidateCount: number
}

interface AIRankEntry {
  toolId: number
  catId: string
  reason: string
  strengths: string[]
  mismatches: string[]
}

const LOADING_MESSAGES = [
  'Analysing what you need…',
  'Reading between the lines…',
  'Thinking about your search…',
]

const RANKING_MESSAGES = [
  'Finding your best match…',
  'Comparing every option…',
  'Ranking by fit…',
]

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

export default function WizardModal({ query, onClose, onCategory, onEditQuery, allTools, categories }: WizardModalProps) {
  // Existing synchronous plan — used for instant sidebar data and as fallback
  const fallbackPlan = useMemo(() => planWizard(query, allTools, categories), [query, allTools, categories])
  const signals = useMemo(() => extractSignals(query), [query])

  // AI state
  const [aiPlanStatus, setAiPlanStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null)
  const [aiRankStatus, setAiRankStatus] = useState<'idle' | 'loading' | 'ready'>('idle')
  const [aiResults, setAiResults] = useState<WizardResult[] | null>(null)

  // Question answers
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Query editing
  const [editingQuery, setEditingQuery] = useState(false)
  const [editQueryValue, setEditQueryValue] = useState(query)
  const queryInputRef = useRef<HTMLInputElement>(null)

  // Keep editQueryValue in sync if query prop changes (e.g. parent remounts with new query)
  useEffect(() => { setEditQueryValue(query) }, [query])

  // Loading message cycling
  const [loadingMsgIdx] = useState(() => Math.floor(Math.random() * LOADING_MESSAGES.length))
  const [rankingMsgIdx] = useState(() => Math.floor(Math.random() * RANKING_MESSAGES.length))

  // Active plan: AI when ready, fallback on error
  const activePlan = aiPlanStatus === 'error' ? fallbackPlan : aiPlan

  const allAnswered = activePlan !== null && (
    activePlan.questions.length === 0 ||
    activePlan.questions.every(q => answers[q.id] !== undefined)
  )

  const activeId = editingId ?? activePlan?.questions.find(q => answers[q.id] === undefined)?.id ?? null
  const activeQ = activePlan?.questions.find(q => q.id === activeId)
  const prefilledEntries = Object.entries(activePlan?.prefilled ?? {})

  // ── Fetch AI plan on mount ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    fetch('/api/wizard-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 'plan', query }),
    })
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then((data: AIPlan) => {
        if (!cancelled) {
          setAiPlan(data)
          setAiPlanStatus('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setAiPlanStatus('error')
      })
    return () => { cancelled = true }
  }, [query])

  // ── Fetch AI ranking when all questions answered ──────────────────────────
  useEffect(() => {
    if (!allAnswered || aiRankStatus !== 'idle' || !activePlan) return
    setAiRankStatus('loading')

    const mergedAnswers = mergeAnswers(activePlan.prefilled, answers)

    // Build human-readable Q&A pairs so the rank LLM can reason about user
    // context (e.g. "I already pay for ChatGPT Plus") instead of seeing only
    // opaque option slugs. Includes prefilled answers with their inference reason.
    const qaPairs: Array<{ q: string; a: string; inferred?: string }> = []
    for (const q of activePlan.questions) {
      const v = answers[q.id]
      if (v === undefined) continue
      const opt = q.options.find(o => o.value === v)
      qaPairs.push({ q: q.text, a: opt?.label ?? v })
    }
    for (const [qid, info] of Object.entries(activePlan.prefilled)) {
      qaPairs.push({ q: qid, a: info.value, inferred: info.reason })
    }

    fetch('/api/wizard-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 'rank', query, answers: mergedAnswers, qaPairs }),
    })
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then((data: { results: AIRankEntry[] }) => {
        const mapped = (data.results ?? []).flatMap((r: AIRankEntry) => {
          const catTools = allTools[r.catId] ?? []
          const tool = catTools.find(t => t.id === r.toolId)
          const cat = categories.find(c => c.id === r.catId)
          if (!tool || !cat) return []
          return [{
            tool,
            catId: r.catId,
            catName: cat.name,
            baseScore: 0,
            adjustedScore: 100,
            strengths: r.strengths ?? [],
            mismatches: r.mismatches ?? [],
            aiReason: r.reason,
          }]
        })
        setAiResults(mapped)
        setAiRankStatus('ready')
      })
      .catch(() => {
        // Fallback to existing deterministic results
        const merged = mergeAnswers(activePlan.prefilled, answers)
        setAiResults(getWizardResults(query, merged, allTools, categories))
        setAiRankStatus('ready')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAnswered, aiRankStatus])

  // ── Keyboard / scroll ─────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleAnswer(qId: string, value: string) {
    const newAnswers = { ...answers, [qId]: value }
    setAnswers(newAnswers)
    setEditingId(null)

    if (!activePlan) return
    const currentIdx = activePlan.questions.findIndex(q => q.id === qId)
    const nextQ = activePlan.questions[currentIdx + 1]
    const nowAllAnswered = activePlan.questions.every(q => newAnswers[q.id] !== undefined)

    setTimeout(() => {
      if (nowAllAnswered) {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (nextQ) {
        document.getElementById(`wq-${nextQ.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 80)
  }

  function getState(qId: string): 'active' | 'answered' | 'pending' {
    if (qId === activeId) return 'active'
    if (answers[qId] !== undefined) return 'answered'
    return 'pending'
  }

  function handleSelect(r: WizardResult) {
    const cat = categories.find(c => c.id === r.catId)
    if (cat) { onCategory(cat, r.tool.id); onClose() }
  }

  function handleRestart() {
    setAnswers({})
    setEditingId(null)
    setAiRankStatus('idle')
    setAiResults(null)
  }

  // Display results: AI ranking if ready, otherwise empty (don't flash deterministic)
  const displayResults: WizardResult[] = aiRankStatus === 'ready' ? (aiResults ?? []) : []
  const bestPick = displayResults[0]
  const runnerUps = displayResults.slice(1)
  const isClose = runnerUps.length > 0 && runnerUps[0].adjustedScore / (bestPick?.adjustedScore || 1) >= 0.78

  // Sidebar candidate count — use AI plan if ready, fallback for immediate display
  const candidateCount = aiPlan?.candidateCount ?? fallbackPlan.candidateCount
  const topCategoryName = aiPlan?.categoryId
    ? categories.find(c => c.id === aiPlan.categoryId)?.name ?? null
    : fallbackPlan.topCategoryName

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
        <div
          className={`wizard-topbar-chip${editingQuery ? ' wizard-topbar-chip-editing' : ''}`}
          onClick={() => {
            if (!editingQuery) {
              setEditingQuery(true)
              setEditQueryValue(query)
              setTimeout(() => { queryInputRef.current?.select() }, 10)
            }
          }}
          title={editingQuery ? undefined : 'Click to edit your search'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          {editingQuery ? (
            <input
              ref={queryInputRef}
              className="wizard-topbar-query-input"
              value={editQueryValue}
              onChange={e => setEditQueryValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && editQueryValue.trim()) {
                  setEditingQuery(false)
                  onEditQuery(editQueryValue.trim())
                } else if (e.key === 'Escape') {
                  setEditingQuery(false)
                  setEditQueryValue(query)
                }
                e.stopPropagation()
              }}
              onBlur={() => {
                setEditingQuery(false)
                setEditQueryValue(query)
              }}
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <span className="wizard-topbar-query">{query}</span>
          )}
        </div>
        <button className="search-modal-esc search-modal-close" onClick={onClose} style={{ flexShrink: 0 }} aria-label="Close">esc</button>
      </div>

      {/* Content */}
      <div className="wizard-full-body">
        <div className="wizard-layout">

          {/* Cascade column */}
          <div className="wizard-cascade">

            {/* ── AI plan loading state ─────────────────────────────────── */}
            {aiPlanStatus === 'loading' && (
              <div className="wizard-ai-loading">
                <div className="wizard-ai-spinner" />
                <p className="wizard-ai-loading-text">{LOADING_MESSAGES[loadingMsgIdx]}</p>
              </div>
            )}

            {/* ── Questions + results (shown once AI plan ready or fallback) */}
            {activePlan && (
              <>
                {/* Auto-detected prefilled cards */}
                {prefilledEntries.map(([qid, v]) => (
                  <div key={qid} className="wizard-card-answered wizard-card-prefilled">
                    <span className="wizard-card-answered-label">Auto-detected from your search</span>
                    <span className="wizard-card-answered-a">{(v as { reason: string }).reason}</span>
                  </div>
                ))}

                {/* Question cards */}
                {activePlan.questions.map(q => {
                  const state = getState(q.id)
                  return (
                    <div key={q.id} id={`wq-${q.id}`} className={`wizard-card-${state}`}>
                      {state === 'active' && (
                        <>
                          <h2 className="wizard-question">{q.text}</h2>
                          {q.helper && <p className="wizard-helper">{q.helper}</p>}
                          <div className="wizard-options">
                            {q.options.map(opt => (
                              <button
                                key={opt.value}
                                className="wizard-option"
                                onClick={() => handleAnswer(q.id, opt.value)}
                              >
                                <span className="wizard-option-label">{opt.label}</span>
                                {opt.hint && <span className="wizard-option-hint">{opt.hint}</span>}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                      {state === 'answered' && (
                        <div className="wizard-card-answered-row">
                          <span className="wizard-card-answered-q">{q.text}</span>
                          <span className="wizard-card-answered-a">
                            {q.options.find(o => o.value === answers[q.id])?.label ?? answers[q.id]}
                          </span>
                          <button
                            className="wizard-card-edit"
                            onClick={() => {
                              setEditingId(q.id)
                              setTimeout(() => {
                                document.getElementById(`wq-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                              }, 50)
                            }}
                          >✎ Edit</button>
                        </div>
                      )}
                      {state === 'pending' && (
                        <div className="wizard-card-pending-row">
                          <span className="wizard-card-pending-q">{q.text}</span>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* ── Results section ──────────────────────────────────── */}
                {allAnswered && (
                  <div ref={resultsRef} className="wizard-cascade-results">

                    {/* Ranking loading state */}
                    {aiRankStatus === 'loading' && (
                      <div className="wizard-ai-loading wizard-ai-ranking">
                        <div className="wizard-ai-spinner" />
                        <p className="wizard-ai-loading-text">{RANKING_MESSAGES[rankingMsgIdx]}</p>
                      </div>
                    )}

                    {/* Results */}
                    {aiRankStatus === 'ready' && (
                      displayResults.length === 0 ? (
                        <>
                          <p className="wizard-question" style={{ fontSize: '1.6rem' }}>
                            {activePlan.noIntent ? 'No results found.' : 'Nothing matched that search.'}
                          </p>
                          <p style={{ color: 'var(--fg2)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                            {activePlan.noIntent
                              ? "We couldn't find an AI tool for that. Try describing what you want to do — for example, \"generate images\", \"write a blog post\", or \"clone my voice\"."
                              : 'Try a different search term or browse by category.'}
                          </p>
                          <button className="wizard-restart" onClick={activePlan.noIntent ? onClose : handleRestart}>
                            {activePlan.noIntent ? '← Back to search' : '← Start over'}
                          </button>
                        </>
                      ) : (
                        <>
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
                              {bestPick.aiReason && (
                                <div className="wizard-ai-reason">{bestPick.aiReason}</div>
                              )}
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
                                    onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
                                  />
                                  <div className="wizard-runner-info">
                                    <div className="wizard-runner-name">{r.tool.name}</div>
                                    <div className="wizard-runner-tagline">{r.tool.tagline}</div>
                                    {r.aiReason && (
                                      <div className="wizard-ai-reason wizard-ai-reason-small">{r.aiReason}</div>
                                    )}
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
                        </>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Helper sidebar */}
          <aside className="wizard-side">
            <div className="wizard-side-card">
              <div className="wizard-side-label">Your search</div>
              <div className="wizard-side-query">&ldquo;{query}&rdquo;</div>
              <div className="wizard-side-meta">
                <span>
                  <strong>{candidateCount}</strong> matching {candidateCount === 1 ? 'tool' : 'tools'}
                </span>
                {topCategoryName && (
                  <>
                    <span className="wizard-side-meta-dot">·</span>
                    <span>top category <strong>{topCategoryName}</strong></span>
                  </>
                )}
              </div>
            </div>

            {/* AI intent summary */}
            {aiPlan?.intentSummary && (
              <div className="wizard-side-card wizard-ai-intent-card">
                <div className="wizard-side-label">We understood</div>
                <p className="wizard-ai-intent-text">{aiPlan.intentSummary}</p>
              </div>
            )}

            {signals.phrases.length > 0 && (
              <div className="wizard-side-card">
                <div className="wizard-side-label">What we picked up</div>
                <div className="wizard-signal-list">
                  {signals.phrases.slice(0, 4).map(p => (
                    <div key={p} className="wizard-signal">
                      <span className="wizard-signal-dot" aria-hidden="true" />
                      <span className="wizard-signal-text">Detected phrase: <strong>{p}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeQ && QUESTION_TIPS[activeQ.id] && (
              <div className="wizard-side-card wizard-side-tip">
                <div className="wizard-side-label">Why we ask</div>
                <p className="wizard-side-tip-text">{QUESTION_TIPS[activeQ.id]}</p>
              </div>
            )}

            <div className="wizard-side-card wizard-how-card">
              <div className="wizard-side-label">How this works</div>
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
          </aside>
        </div>
      </div>
    </div>
  )
}
