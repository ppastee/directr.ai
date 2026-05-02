'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TOOLS, Category, Tool, nameToSlug } from '@/data/tools'
import ToolCard from './ToolCard'

interface FAQ { q: string; a: string }

function monthlyPrice(price: string): number {
  const lower = price.toLowerCase()
  if (lower === 'free' || lower.startsWith('free')) return 0
  const match = price.match(/\$(\d+(?:\.\d+)?)/)
  return match ? parseFloat(match[1]) : Infinity
}

const SORT_OPTIONS = ['best-match', 'highest-rated', 'lowest-price', 'most-reviews', 'newest']


const CAT_INTROS: Record<string, string> = {
  animation:    'A few years ago, a 30-second animated video cost thousands and a week of back-and-forth with an agency. Now you type what you want and hit generate. These tools handle avatars, voiceovers, motion graphics, and full video production — whether you\'re making training content, ads, or just something that actually stops the scroll.',
  image:        'Describe it, generate it, ship it. The best AI image tools today produce work that\'s genuinely hard to distinguish from a professional shoot or illustration — and they do it in seconds. Great for product visuals, social content, concept art, or anything where waiting on a designer isn\'t an option.',
  writing:      'The blank page problem is officially solved. These tools won\'t write for you — they\'ll write with you, matching your tone, hitting your word count, and cutting the rewrite cycle in half. From first drafts to polished copy, they handle blogs, ads, emails, and long-form content without making everything sound like a robot wrote it.',
  coding:       'Your new pair programmer doesn\'t take breaks, never judges your variable names, and has read more code than any human alive. These assistants autocomplete, debug, explain legacy code, and generate production-ready functions across every language — so you spend less time on boilerplate and more time on the parts that actually matter.',
  audio:        'Studio-quality audio used to mean renting a studio. Now it means opening a browser tab. Clone a voice, generate original music, transcribe a two-hour meeting in minutes, or strip background noise from a recording made in a café — these tools cover the full audio stack, no equipment required.',
  chat:         'Think of these as the research assistant you always wished you had — one that actually reads the whole document, remembers context, and gives you a straight answer instead of a list of links. Ideal for deep research, document analysis, complex reasoning, and the kind of questions where Google just gives you ten blog posts.',
  '3d':         '3D used to be a two-year learning curve before you could make anything worth looking at. These tools let you generate models, textures, and full scenes from text or images — cutting production time from days to hours. Perfect for product mockups, game assets, architectural visuals, and anything else that needs to exist in three dimensions.',
  productivity: 'The average knowledge worker spends more time managing work than doing it. These tools flip that ratio — automating the repetitive stuff, summarising what you missed, drafting what needs drafting, and clearing the path so you can focus on the 20% that actually moves things forward.',
  marketing:    'Great marketing used to require a full team: strategist, copywriter, designer, analyst. These tools compress that stack considerably. Generate campaign concepts, produce ad creatives at scale, analyse what\'s working, and personalise content for different audiences — without waiting on three different departments.',
  finance:      'Financial data is only useful if someone\'s actually reading it. These tools model scenarios instantly, forecast with real accuracy, and surface the signals buried in your spreadsheets — so you\'re making decisions based on insight, not gut feel and a pivot table from 2019.',
  accounting:   'Reconciliation, tax prep, and financial reporting are exactly the kind of precise, repetitive work AI is built for. These tools handle the grunt work faster and with fewer errors — so your accountant (or you) can spend time on strategy rather than chasing down line items.',
  legal:        'Legal review shouldn\'t require a $400/hr phone call every time you need to check a contract. These tools read agreements, flag the clauses worth worrying about, draft standard documents, and summarise case law — putting a capable first pass in your hands before you ever involve outside counsel.',
  hr:           'Hiring is broken in a specific way: too many applications, too little signal, too much time spent on admin before you ever get to the good part. These tools screen candidates properly, write job descriptions that actually attract the right people, streamline onboarding, and free up your team to focus on the humans in front of them.',
  construction: 'Construction projects run late and over budget for predictable reasons — and AI is getting very good at predicting them. These tools handle cost estimation, project scheduling, site monitoring, and compliance documentation, giving you visibility and control before small problems become expensive ones.',
  data:         'If your data insights depend entirely on whoever knows SQL being available, that\'s a problem. These tools let you query datasets in plain English, build dashboards without a data engineering degree, and generate reports that actually explain what\'s happening — turning raw numbers into something your whole team can act on.',
  education:    'One-size-fits-all learning doesn\'t fit most people. These tools personalise the pace and path, generate course content on any topic, give learners instant feedback, and make it possible to build genuinely effective training without a dedicated L&D team — whether you\'re teaching yourself or a thousand people.',
}

function sortLabel(s: string) {
  return s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
}

function sortTools(tools: Tool[], sort: string): Tool[] {
  const sorted = [...tools]
  switch (sort) {
    case 'highest-rated':  return sorted.sort((a, b) => b.rating - a.rating)
    case 'most-reviews':   return sorted.sort((a, b) => b.reviews - a.reviews)
    case 'lowest-price':   return sorted.sort((a, b) => monthlyPrice(a.price) - monthlyPrice(b.price))
    case 'newest':         return sorted.sort((a, b) => b.id - a.id)
    default:               return sorted
  }
}

interface CategoryPageProps {
  cat: Category
  onHome: () => void
  highlightedToolId?: number | null
  faqs?: FAQ[]
}

export default function CategoryPage({ cat, onHome, highlightedToolId, faqs = [] }: CategoryPageProps) {
  const router = useRouter()
  const rawTools = TOOLS[cat.id] ?? TOOLS.animation
  const [sort, setSort] = useState('best-match')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeHighlight, setActiveHighlight] = useState<number | null>(highlightedToolId ?? null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (!highlightedToolId) return
    setActiveHighlight(highlightedToolId)
    const scrollTimer = setTimeout(() => {
      const wrapper = document.querySelector(`[data-tool-id="${highlightedToolId}"]`)
      const card = (wrapper?.querySelector('.tool-card') ?? wrapper) as HTMLElement | null
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 400)
    return () => clearTimeout(scrollTimer)
  }, [highlightedToolId])

  const sorted = useMemo(() => sortTools(rawTools, sort), [rawTools, sort])

  return (
    <div className="page">
      <div className="cat-page">
        <main className="cat-main">
          <div className="cat-page-header">
            <div className="breadcrumb">
              <span className="breadcrumb-link" onClick={onHome}>Home</span>
              {' / '}
              {cat.name}
            </div>
            <h1 className="cat-page-title">Best {cat.name} AI Tools 2026</h1>
            <p className="cat-page-sub">
              Comparing {sorted.length} tools · Prices updated April 2026
            </p>
            {CAT_INTROS[cat.id] && (
              <p className="cat-page-intro">{CAT_INTROS[cat.id]}</p>
            )}
          </div>

          <div className="sort-bar">
            <span className="sort-label">Sort by:</span>
            <div className="sort-pills">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={`sort-pill ${sort === s ? 'active' : ''}`}
                  onClick={() => setSort(s)}
                >
                  {sortLabel(s)}
                </button>
              ))}
            </div>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s} value={s}>{sortLabel(s)}</option>
              ))}
            </select>
          </div>

          <div className="tool-grid">
            {sorted.map((t, i) => (
              <div key={t.id} data-tool-id={t.id}
                className={!showAll && i >= 4 ? 'tool-row-hidden' : ''}
                style={{ '--tool-i': i } as React.CSSProperties}
              >
                <ToolCard
                  tool={t} rank={i + 1} highlighted={t.id === activeHighlight}
                  onCardClick={() => router.push(`/category/${cat.slug}/${nameToSlug(t.name)}`)}
                />
              </div>
            ))}
          </div>

          {sorted.length > 4 && (
            <button className="show-more-btn" onClick={() => setShowAll(o => !o)}>
              {showAll ? 'Show less' : `Show all ${sorted.length} tools`}
            </button>
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
  )
}
