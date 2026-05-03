'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tool, Category, TOOLS, nameToSlug } from '@/data/tools'
import { PRICING } from '@/data/pricing'
import { VS_PAIRS } from '@/data/vs'

function Stars({ n }: { n: number }) {
  const full = Math.round(n)
  return <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
}

function ToolLogo({ tool, size = 64 }: { tool: Tool; size?: number }) {
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
      <div style={{
        flex: 1, height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden',
      }}>
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

interface Props {
  tool: Tool
  categoryId: string
  cat: Category
}

export default function ToolDetailPage({ tool, categoryId, cat }: Props) {
  const plans = PRICING[tool.id] ?? []
  const categoryTools = TOOLS[categoryId] ?? []

  const comparators = categoryTools
    .filter((t) => t.id !== tool.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const compareSet = [tool, ...comparators]

  return (
    <div className="tool-detail page">
      {/* Breadcrumb */}
      <div className="tool-detail-breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        {' / '}
        <Link href={`/category/${cat.slug}`} className="breadcrumb-link">{cat.name}</Link>
        {' / '}
        <span style={{ color: 'var(--fg)' }}>{tool.name}</span>
      </div>

      {/* Hero */}
      <div className="tool-detail-hero">
        <div className="tool-detail-hero-top">
          <div className="tool-detail-logo-wrap">
            <ToolLogo tool={tool} size={72} />
          </div>
          <div className="tool-detail-title-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 className="tool-detail-name">{tool.name}</h1>
              {tool.sponsored && <span className="badge badge-best">Sponsored</span>}
              {tool.freeTierLabel && <span className="badge badge-free">{tool.freeTierLabel}</span>}
            </div>
            <p className="tool-detail-tagline">{tool.tagline}</p>
            <div className="tool-detail-meta">
              <div className="tool-rating">
                <Stars n={tool.rating} />
                <strong style={{ color: 'var(--fg)' }}>{tool.rating}</strong>
                {tool.reviews > 0 && (
                  <span style={{ color: 'var(--fg3)' }}>({tool.reviews.toLocaleString()} reviews)</span>
                )}
              </div>
              <span className="tool-detail-price">{tool.price}</span>
            </div>
          </div>
        </div>
        <div className="tool-detail-actions">
          <Link href={`/category/${cat.slug}`} className="tool-detail-back">
            ← All {cat.name}
          </Link>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-detail-visit">
            Visit {tool.name} →
          </a>
        </div>
      </div>

      {/* About */}
      <div className="tool-detail-section">
        <h2 className="tool-detail-section-title">About {tool.name}</h2>
        <p style={{ color: 'var(--fg2)', lineHeight: 1.65, maxWidth: 680 }}>{tool.desc}</p>
        <div className="tag-row" style={{ marginTop: '1rem' }}>
          {tool.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
        {plans.length > 0 && (
          <div className="tool-detail-pricing">
            <p className="pricing-section-label">Pricing plans</p>
            {plans.map((plan, i) => (
              <div key={i} className={`pricing-plan${plan.bestValue ? ' pricing-plan--best' : ''}`}>
                <div className="pricing-plan-header">
                  <span className="pricing-plan-name">{plan.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {plan.bestValue && <span className="pricing-best-badge">Best value</span>}
                    <span className="pricing-plan-price">{plan.price}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparison */}
      {comparators.length > 0 && (
        <div className="tool-detail-section">
          <h2 className="tool-detail-section-title">How {tool.name} compares</h2>
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
                          {t.id === tool.id ? <strong>{t.name}</strong> : t.name}
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

      {/* Alternatives */}
      {comparators.length > 0 && (
        <div className="tool-detail-section">
          <h2 className="tool-detail-section-title">Alternatives to {tool.name}</h2>
          <div className="tool-grid">
            {comparators.map((t, i) => (
              <Link
                key={t.id}
                href={`/tool/${nameToSlug(t.name)}`}
                style={{ textDecoration: 'none', display: 'contents' }}
              >
                <div className="tool-card" style={{ '--tool-i': i } as React.CSSProperties}>
                  <div className="tool-card-header">
                    <div className="tool-logo">
                      <MiniLogoFull tool={t} />
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
      )}

      {/* Internal links: alternatives + compare pages */}
      {(() => {
        const slug = nameToSlug(tool.name)
        const compareLinks = Object.entries(VS_PAIRS)
          .filter(([, v]) => v.a === slug || v.b === slug)
          .map(([pair, v]) => {
            const otherSlug = v.a === slug ? v.b : v.a
            const otherName = otherSlug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
            return { pair, otherName }
          })
        return (
          <div className="tool-detail-section">
            <h2 className="tool-detail-section-title">Explore further</h2>
            <div className="related-cats-row">
              <Link href={`/alternatives/${slug}`} className="related-cat-pill">
                {tool.name} alternatives
              </Link>
              {compareLinks.map(({ pair, otherName }) => (
                <Link key={pair} href={`/compare/${pair}`} className="related-cat-pill">
                  {tool.name} vs {otherName}
                </Link>
              ))}
              <Link href={`/category/${cat.slug}`} className="related-cat-pill">
                All {cat.name} tools
              </Link>
            </div>
          </div>
        )
      })()}

      <div style={{ height: '4rem' }} />
    </div>
  )
}

function MiniLogoFull({ tool }: { tool: Tool }) {
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
