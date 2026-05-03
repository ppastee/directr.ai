'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tool, Category, nameToSlug } from '@/data/tools'
import { HowToStep } from '@/data/tasks'
import ToolCard from './ToolCard'
import Nav from './Nav'
import AnimatedBg from './AnimatedBg'

interface FAQ { q: string; a: string }

export interface UseCaseTool extends Tool {
  categoryId: string
  categoryName: string
}

interface Props {
  slug: string
  h1: string
  label: string
  intro: string
  tools: UseCaseTool[]
  steps?: HowToStep[]
  faqs: FAQ[]
  type: 'profession' | 'task'
}

export default function UseCaseClient({ slug, h1, label, intro, tools, steps, faqs, type }: Props) {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  function handleCategory(c: Category) {
    router.push(`/category/${c.slug}`)
  }

  const breadcrumbLabel = type === 'profession'
    ? `AI Tools for ${label}`
    : `AI Tools for ${label}`

  return (
    <>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav
          onHome={() => router.push('/')}
          showSearch={true}
          onWizard={(q) => router.push(`/?q=${encodeURIComponent(q)}`)}
          onCategory={handleCategory}
        />
        <div className="page">
          <div className="cat-page">
            <main className="cat-main">
              <div className="cat-page-header">
                <div className="breadcrumb">
                  <span className="breadcrumb-link" onClick={() => router.push('/')}>Home</span>
                  {' / '}
                  <span className="breadcrumb-link" onClick={() => router.push('/tools/free')}>Tools</span>
                  {' / '}
                  {breadcrumbLabel}
                </div>
                <h1 className="cat-page-title">{h1}</h1>
                <p className="cat-page-sub">
                  {tools.length} tools · Updated May 2026
                </p>
                <p className="cat-page-answer">{intro}</p>
              </div>

              <div className="tool-grid">
                {tools.map((t, i) => (
                  <div key={t.id} style={{ '--tool-i': i } as React.CSSProperties}>
                    <ToolCard
                      tool={t}
                      onCardClick={() => router.push(`/tool/${nameToSlug(t.name)}`)}
                    />
                  </div>
                ))}
              </div>

              {steps && steps.length > 0 && (
                <section className="uc-steps-section" aria-label={`How to ${label.toLowerCase()} with AI`}>
                  <h2 className="uc-steps-title">How to {label.toLowerCase()} with AI</h2>
                  <ol className="uc-steps-list">
                    {steps.map((step, i) => (
                      <li key={i} className="uc-step">
                        <div className="uc-step-num">{i + 1}</div>
                        <div className="uc-step-content">
                          <strong className="uc-step-name">{step.name}</strong>
                          <p className="uc-step-text">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {faqs.length > 0 && (
                <section className="faq-section" aria-label="Frequently asked questions">
                  <h2 className="faq-section-title">Frequently Asked Questions</h2>
                  <dl className="faq-list">
                    {faqs.map((faq, i) => (
                      <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                        <dt>
                          <button
                            className="faq-question"
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            aria-expanded={openFaq === i}
                          >
                            <span>{faq.q}</span>
                            <span className="faq-chevron">{openFaq === i ? '−' : '+'}</span>
                          </button>
                        </dt>
                        {openFaq === i && (
                          <dd className="faq-answer">{faq.a}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <div className="footer">
                © 2026 Directr · Data updated weekly · We earn referral fees from some links
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
