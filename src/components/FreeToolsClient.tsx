'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tool, Category, nameToSlug } from '@/data/tools'
import ToolCard from './ToolCard'
import Nav from './Nav'
import AnimatedBg from './AnimatedBg'

interface FAQ { q: string; a: string }

export interface FreeTool extends Tool {
  categoryId: string
  categoryName: string
}

interface Props {
  tools: FreeTool[]
  faqs: FAQ[]
}

export default function FreeToolsClient({ tools, faqs }: Props) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    document.body.className = 'theme-signal'
  }, [])

  const catIds = Array.from(new Set(tools.map((t) => t.categoryId)))
  const categoryNames: Record<string, string> = { all: 'All' }
  tools.forEach((t) => { categoryNames[t.categoryId] = t.categoryName })

  const filtered = activeCategory === 'all'
    ? tools
    : tools.filter((t) => t.categoryId === activeCategory)

  function handleCategory(c: Category) {
    router.push(`/category/${c.slug}`)
  }

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
                  Free AI Tools
                </div>
                <h1 className="cat-page-title">Free AI Tools in 2026</h1>
                <p className="cat-page-sub">
                  {tools.length} tools · Free plans and free tiers · No credit card required · Updated April 2026
                </p>
                <p className="cat-page-answer">
                  There are {tools.length} free AI tools on Directr — not just stripped-down demos. This list includes ChatGPT, Claude, Gemini, GitHub Copilot, Adobe Firefly, Kling AI, ElevenLabs, and dozens more, all available without a credit card. Some are genuinely free; others offer a free tier that covers most real-world use cases.
                </p>
              </div>

              <div className="free-cat-tabs">
                <button
                  className={`free-cat-tab${activeCategory === 'all' ? ' active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All <span className="free-cat-count">{tools.length}</span>
                </button>
                {catIds.map((catId) => (
                  <button
                    key={catId}
                    className={`free-cat-tab${activeCategory === catId ? ' active' : ''}`}
                    onClick={() => setActiveCategory(catId)}
                  >
                    {categoryNames[catId]}
                    <span className="free-cat-count">
                      {tools.filter((t) => t.categoryId === catId).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="tool-grid">
                {filtered.map((t, i) => (
                  <div key={t.id} style={{ '--tool-i': i } as React.CSSProperties}>
                    <ToolCard
                      tool={t}
                      onCardClick={() => router.push(`/tool/${nameToSlug(t.name)}`)}
                    />
                  </div>
                ))}
              </div>

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
