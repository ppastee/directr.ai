'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tool, nameToSlug } from '@/data/tools'
import { VsPair } from '@/data/vs'
import Nav from './Nav'
import AnimatedBg from './AnimatedBg'

interface Props {
  pair: string
  vs: VsPair
  toolA: Tool
  toolB: Tool
}

function ToolLogo({ tool, size = 48 }: { tool: Tool; size?: number }) {
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
        }} />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--fg)', minWidth: 26 }}>{value}</span>
    </div>
  )
}

function Inner({ vs, toolA, toolB }: { vs: VsPair; toolA: Tool; toolB: Tool }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const rows: { label: string; a: React.ReactNode; b: React.ReactNode }[] = [
    {
      label: 'Rating',
      a: <RatingBar value={toolA.rating} />,
      b: <RatingBar value={toolB.rating} />,
    },
    {
      label: 'Reviews',
      a: toolA.reviews > 0 ? toolA.reviews.toLocaleString() : <span style={{ color: 'var(--fg3)' }}>—</span>,
      b: toolB.reviews > 0 ? toolB.reviews.toLocaleString() : <span style={{ color: 'var(--fg3)' }}>—</span>,
    },
    {
      label: 'Price',
      a: <span style={{ fontWeight: 600 }}>{toolA.price}</span>,
      b: <span style={{ fontWeight: 600 }}>{toolB.price}</span>,
    },
    {
      label: 'Free tier',
      a: toolA.freeTierLabel
        ? <span style={{ color: 'var(--green)', fontSize: '0.82rem' }}>{toolA.freeTier ?? toolA.freeTierLabel}</span>
        : <span className="cross">None</span>,
      b: toolB.freeTierLabel
        ? <span style={{ color: 'var(--green)', fontSize: '0.82rem' }}>{toolB.freeTier ?? toolB.freeTierLabel}</span>
        : <span className="cross">None</span>,
    },
    {
      label: 'API access',
      a: toolA.apiAccess ? <span className="check">✓</span> : <span className="cross">✗</span>,
      b: toolB.apiAccess ? <span className="check">✓</span> : <span className="cross">✗</span>,
    },
  ]

  if (toolA.outputRes || toolB.outputRes) {
    rows.push({
      label: 'Output',
      a: toolA.outputRes ?? <span style={{ color: 'var(--fg3)' }}>—</span>,
      b: toolB.outputRes ?? <span style={{ color: 'var(--fg3)' }}>—</span>,
    })
  }

  return (
    <div className="alt-page page">
      <div className="tool-detail-breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        {' / '}
        <span style={{ color: 'var(--fg)' }}>{toolA.name} vs {toolB.name}</span>
      </div>

      {/* Hero */}
      <div className="vs-hero">
        <div className="vs-hero-side">
          <ToolLogo tool={toolA} size={56} />
          <div>
            <div className="vs-hero-name">{toolA.name}</div>
            <div className="vs-hero-price">{toolA.price}</div>
          </div>
        </div>
        <div className="vs-badge">vs</div>
        <div className="vs-hero-side">
          <ToolLogo tool={toolB} size={56} />
          <div>
            <div className="vs-hero-name">{toolB.name}</div>
            <div className="vs-hero-price">{toolB.price}</div>
          </div>
        </div>
      </div>

      <h1 className="alt-h1" style={{ marginTop: '1.5rem' }}>
        {toolA.name} vs {toolB.name}: Which is Better in 2026?
      </h1>
      <p className="alt-intro">{vs.verdict}</p>

      {/* Comparison table */}
      <div className="tool-detail-section">
        <h2 className="tool-detail-section-title">Side-by-side comparison</h2>
        <div className="compare-table-wrap">
          <table className="compare-table tool-compare-detail">
            <thead>
              <tr>
                <th className="compare-row-label-cell"></th>
                <th>
                  <div className="tool-cell">
                    <MiniLogo tool={toolA} />
                    <span className="name">
                      <Link href={`/tool/${nameToSlug(toolA.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {toolA.name}
                      </Link>
                    </span>
                  </div>
                </th>
                <th>
                  <div className="tool-cell">
                    <MiniLogo tool={toolB} />
                    <span className="name">
                      <Link href={`/tool/${nameToSlug(toolB.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {toolB.name}
                      </Link>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="compare-row-label-cell">{row.label}</td>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strengths */}
      <div className="vs-strengths-grid">
        <div className="tool-detail-section">
          <h2 className="tool-detail-section-title">{toolA.name} strengths</h2>
          <ul className="vs-strengths-list">
            {vs.strengthsA.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <Link href={`/tool/${nameToSlug(toolA.name)}`} className="vs-cta-link">
            View {toolA.name} →
          </Link>
        </div>
        <div className="tool-detail-section">
          <h2 className="tool-detail-section-title">{toolB.name} strengths</h2>
          <ul className="vs-strengths-list">
            {vs.strengthsB.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <Link href={`/tool/${nameToSlug(toolB.name)}`} className="vs-cta-link">
            View {toolB.name} →
          </Link>
        </div>
      </div>

      {/* Which to choose */}
      <div className="tool-detail-section">
        <h2 className="tool-detail-section-title">Which should you choose?</h2>
        <div className="vs-choose-grid">
          <div className="vs-choose-card">
            <div className="vs-choose-label">Choose {toolA.name} if…</div>
            <p className="alt-body-text">{vs.chooseA}</p>
            <Link href={`/tool/${nameToSlug(toolA.name)}`} className="vs-cta-link">
              View {toolA.name} →
            </Link>
          </div>
          <div className="vs-choose-card">
            <div className="vs-choose-label">Choose {toolB.name} if…</div>
            <p className="alt-body-text">{vs.chooseB}</p>
            <Link href={`/tool/${nameToSlug(toolB.name)}`} className="vs-cta-link">
              View {toolB.name} →
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <h2 className="faq-section-title">Frequently asked questions</h2>
        <ul className="faq-list" style={{ listStyle: 'none' }}>
          {vs.faqs.map((faq, i) => (
            <li key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <span className="faq-chevron">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p className="faq-answer">{faq.a}</p>}
            </li>
          ))}
        </ul>
      </div>

      <div className="footer">
        © 2026 Directr · Data updated weekly · We earn referral fees from some links
      </div>
    </div>
  )
}

export default function ComparisonRoute({ pair, vs, toolA, toolB }: Props) {
  return (
    <>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav onHome={() => { window.location.href = '/' }} showSearch={false} onWizard={() => {}} onCategory={() => {}} currentQuery="" />
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem' }}>
          <Inner vs={vs} toolA={toolA} toolB={toolB} />
        </div>
      </div>
    </>
  )
}
