'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tool, Category, TOOLS, nameToSlug } from '@/data/tools'
import { ComparisonEntry } from '@/data/comparisons'

function Stars({ n }: { n: number }) {
  const full = Math.round(n)
  return <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
}

function ToolLogo({ tool, size = 40 }: { tool: Tool; size?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div style={{
        width: size, height: size, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: size * 0.45,
        background: 'var(--bg3)', borderRadius: size * 0.18,
      }}>
        {tool.emoji}
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=128`}
      alt={tool.name}
      width={size} height={size}
      style={{ borderRadius: size * 0.18, objectFit: 'contain', display: 'block' }}
      onError={() => setFailed(true)}
    />
  )
}

function MiniLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="mini-logo">{tool.emoji}</div>
  return (
    <div className="mini-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=64`}
        alt={tool.name} width={20} height={20}
        style={{ borderRadius: 4, objectFit: 'contain' }}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function RatingBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${(value / 5) * 100}%`, height: '100%',
          background: 'var(--star)', borderRadius: 3,
          transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--fg)', minWidth: 26 }}>{value}</span>
    </div>
  )
}

function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq-section">
      <h2 className="faq-section-title">Frequently asked questions</h2>
      <ul className="faq-list" style={{ listStyle: 'none' }}>
        {faqs.map((faq, i) => (
          <li key={i} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {faq.q}
              <span className="faq-chevron">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="faq-answer">{faq.a}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface Props {
  tool: Tool
  categoryId: string
  cat: Category
  entry: ComparisonEntry | undefined
}

export default function AlternativesPage({ tool, categoryId, cat, entry }: Props) {
  const categoryTools = TOOLS[categoryId] ?? []

  const alternatives = categoryTools
    .filter((t) => t.id !== tool.id)
    .sort((a, b) => b.rating - a.rating)

  const compareSet = [tool, ...alternatives.slice(0, 3)]

  const topThreeNames = alternatives
    .slice(0, 3)
    .map((t) => t.name)
    .join(', ')

  const freeAlts = alternatives.filter((t) => t.free)
  const freeAltName = freeAlts[0]?.name ?? alternatives[0]?.name ?? 'other tools'

  const intro = entry?.intro ??
    `${tool.name} is a leading ${cat.name.toLowerCase()} AI tool, but many users explore alternatives for pricing, features, or workflow reasons. The top alternatives are ${topThreeNames} — all listed below with a full comparison.`

  const whenToSwitch = entry?.whenToSwitch ??
    `Consider alternatives when you need different pricing tiers, want to compare feature sets across ${cat.name.toLowerCase()} tools, or are looking for a free option. The best choice depends on your specific use case.`

  const faqs = [
    {
      q: `What is the best alternative to ${tool.name}?`,
      a: alternatives[0]
        ? `${alternatives[0].name} is the highest-rated alternative to ${tool.name} in the ${cat.name.toLowerCase()} category with a ${alternatives[0].rating}★ rating from ${alternatives[0].reviews > 0 ? alternatives[0].reviews.toLocaleString() + ' reviews' : 'verified users'}. Other strong options include ${alternatives.slice(1, 3).map(t => t.name).join(' and ')}.`
        : `Browse the full list of ${cat.name} AI tools on Directr to find the best fit for your needs.`,
    },
    {
      q: `Is there a free alternative to ${tool.name}?`,
      a: freeAlts.length > 0
        ? `Yes — ${freeAlts.map(t => t.name).slice(0, 3).join(', ')} ${freeAlts.length === 1 ? 'is a free alternative' : 'are free alternatives'} to ${tool.name}. ${freeAlts[0].freeTierLabel === 'Free' ? `${freeAlts[0].name} is completely free to use.` : `${freeAlts[0].name} offers a free tier with limited features.`}`
        : `There are no completely free alternatives to ${tool.name} in the ${cat.name.toLowerCase()} category, but some offer free trials. Check individual tool pages for current pricing.`,
    },
    {
      q: `What is better than ${tool.name}?`,
      a: entry?.useCases && entry.useCases.length > 0
        ? `It depends on your use case. ${entry.useCases.slice(0, 2).map(uc => `${uc.toolName} is better for ${uc.label.toLowerCase()}`).join(', ')}. See the full comparison above for a breakdown by specific need.`
        : `"Better" depends on your priorities. ${alternatives[0]?.name ?? 'Each tool'} may outperform ${tool.name} on specific dimensions — check ratings, pricing, and free tiers in the comparison table above.`,
    },
    {
      q: `How many ${tool.name} alternatives are there?`,
      a: `There are ${alternatives.length} alternatives to ${tool.name} in the ${cat.name.toLowerCase()} category on Directr, ranging from ${alternatives.filter(t => t.free).length > 0 ? 'free options to ' : ''}paid plans. You can also browse all ${cat.name.toLowerCase()} AI tools on the category page.`,
    },
  ]

  return (
    <div className="alt-page page">
      {/* Breadcrumb */}
      <div className="tool-detail-breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        {' / '}
        <Link href={`/category/${cat.slug}`} className="breadcrumb-link">{cat.name}</Link>
        {' / '}
        <Link href={`/tool/${nameToSlug(tool.name)}`} className="breadcrumb-link">{tool.name}</Link>
        {' / '}
        <span style={{ color: 'var(--fg)' }}>Alternatives</span>
      </div>

      {/* Hero */}
      <div className="alt-hero">
        <div className="alt-hero-logo">
          <ToolLogo tool={tool} size={56} />
        </div>
        <div>
          <h1 className="alt-h1">Best {tool.name} Alternatives in 2026</h1>
          <p className="alt-intro">{intro}</p>
        </div>
      </div>

      {/* Comparison table */}
      {compareSet.length > 1 && (
        <div className="tool-detail-section">
          <h2 className="tool-detail-section-title">{tool.name} vs top alternatives</h2>
          <div className="compare-table-wrap">
            <table className="compare-table tool-compare-detail">
              <thead>
                <tr>
                  <th className="compare-row-label-cell"></th>
                  {compareSet.map((t) => (
                    <th key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      <div className="tool-cell">
                        <MiniLogo tool={t} />
                        <span className="name">
                          {t.id === tool.id ? <strong>{t.name}</strong> : (
                            <Link href={`/tool/${nameToSlug(t.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                              {t.name}
                            </Link>
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="compare-row-label-cell">Rating</td>
                  {compareSet.map((t) => (
                    <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      <RatingBar value={t.rating} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-row-label-cell">Reviews</td>
                  {compareSet.map((t) => (
                    <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      {t.reviews > 0 ? t.reviews.toLocaleString() : <span style={{ color: 'var(--fg3)' }}>—</span>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-row-label-cell">Price</td>
                  {compareSet.map((t) => (
                    <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      <span style={{ fontWeight: 600 }}>{t.price}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-row-label-cell">Free tier</td>
                  {compareSet.map((t) => (
                    <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      {t.freeTierLabel ? (
                        <span style={{ color: 'var(--green)', fontSize: '0.82rem' }}>
                          {t.freeTier ?? t.freeTierLabel}
                        </span>
                      ) : (
                        <span className="cross">None</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-row-label-cell">API access</td>
                  {compareSet.map((t) => (
                    <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      {t.apiAccess ? <span className="check">✓</span> : <span className="cross">✗</span>}
                    </td>
                  ))}
                </tr>
                {compareSet.some((t) => t.outputRes) && (
                  <tr>
                    <td className="compare-row-label-cell">Output</td>
                    {compareSet.map((t) => (
                      <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                        {t.outputRes ?? <span style={{ color: 'var(--fg3)' }}>—</span>}
                      </td>
                    ))}
                  </tr>
                )}
                <tr>
                  <td className="compare-row-label-cell">Watermark</td>
                  {compareSet.map((t) => (
                    <td key={t.id} className={t.id === tool.id ? 'compare-col-hero' : ''}>
                      {t.watermark
                        ? <span className="cross">Yes</span>
                        : <span className="check">No</span>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* When to switch */}
      <div className="tool-detail-section">
        <h2 className="tool-detail-section-title">When to switch from {tool.name}</h2>
        <p className="alt-body-text">{whenToSwitch}</p>
      </div>

      {/* Best for use cases */}
      {entry?.useCases && entry.useCases.length > 0 && (
        <div className="tool-detail-section">
          <h2 className="tool-detail-section-title">Best {tool.name} alternative for…</h2>
          <div className="alt-use-cases">
            {entry.useCases.map((uc, i) => (
              <Link
                key={i}
                href={`/tool/${uc.toolSlug}`}
                className="alt-use-case-card"
              >
                <div className="alt-use-case-label">{uc.label}</div>
                <div className="alt-use-case-tool">{uc.toolName} →</div>
                <p className="alt-use-case-reason">{uc.reason}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All alternatives grid */}
      <div className="tool-detail-section">
        <h2 className="tool-detail-section-title">
          All {alternatives.length} {tool.name} alternatives
        </h2>
        <div className="tool-grid">
          {alternatives.map((t, i) => (
            <Link
              key={t.id}
              href={`/tool/${nameToSlug(t.name)}`}
              style={{ textDecoration: 'none', display: 'contents' }}
            >
              <div className="tool-card" style={{ '--tool-i': i } as React.CSSProperties}>
                <div className="tool-card-header">
                  <div className="tool-logo">
                    <AltMiniLogo tool={t} />
                  </div>
                  <div>
                    <div className="tool-name">
                      {t.name}
                      {t.freeTierLabel && <span className="badge badge-free">{t.freeTierLabel}</span>}
                    </div>
                    <div className="tool-tagline">{t.tagline}</div>
                  </div>
                </div>
                <p className="tool-desc">{t.desc}</p>
                <div className="tag-row">
                  {t.tags.slice(0, 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <div className="tool-footer">
                  <div className="tool-price">{t.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {t.reviews > 0 && (
                      <div className="tool-rating">
                        <Stars n={t.rating} />
                        {t.rating}
                      </div>
                    )}
                    <span className="visit-btn" style={{ pointerEvents: 'none' }}>View {t.name} →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="alt-cta">
        <p className="alt-cta-text">Looking for more {cat.name.toLowerCase()} tools?</p>
        <Link href={`/category/${cat.slug}`} className="tool-detail-visit">
          Browse all {cat.name} AI tools →
        </Link>
      </div>

      <FaqAccordion faqs={faqs} />

      <div style={{ height: '4rem' }} />
    </div>
  )
}

function AltMiniLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{tool.emoji}</>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=128`}
      alt={tool.name} width={28} height={28}
      style={{ borderRadius: 6, objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  )
}
