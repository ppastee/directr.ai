'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TOOLS, Category, Tool, nameToSlug } from '@/data/tools'
import ToolCard from './ToolCard'

function monthlyPrice(price: string): number {
  const lower = price.toLowerCase()
  if (lower === 'free' || lower.startsWith('free')) return 0
  const match = price.match(/\$(\d+(?:\.\d+)?)/)
  return match ? parseFloat(match[1]) : Infinity
}

const SORT_OPTIONS = ['best-match', 'highest-rated', 'lowest-price', 'most-reviews', 'newest']

const CAT_INTROS: Record<string, string> = {
  animation:    'AI animation and video tools let you generate professional videos, talking avatars, and motion graphics in minutes — no studio or editing skills required.',
  image:        'AI image generation tools turn text prompts into photorealistic images, product visuals, and illustrations in seconds.',
  writing:      'AI writing and copywriting tools help you produce blog posts, ad copy, emails, and long-form content faster with fewer rewrites.',
  coding:       'AI coding assistants autocomplete, debug, and generate production-ready code across every language and framework.',
  audio:        'AI audio tools create original music, clone voices, transcribe speech, and remove background noise with professional results.',
  chat:         'AI chat and research assistants answer complex questions, summarise long documents, and help you reason through problems at speed.',
  '3d':         'AI 3D and design tools generate models, textures, and scene assets that once took days — in hours.',
  productivity: 'AI productivity tools automate repetitive tasks, manage your inbox, summarise meetings, and help you reclaim hours every week.',
  marketing:    'AI marketing tools create campaigns, generate ad creatives, analyse performance, and personalise content at scale.',
  finance:      'AI finance tools automate bookkeeping, model scenarios, forecast revenue, and surface insights from complex financial data.',
  accounting:   'AI accounting tools streamline reconciliation, automate tax prep, and generate financial reports in a fraction of the time.',
  legal:        'AI legal tools review contracts, flag risks, draft standard documents, and summarise case law in minutes.',
  hr:           'AI HR and recruiting tools screen candidates, draft job descriptions, automate onboarding, and reduce time-to-hire.',
  construction: 'AI construction tools streamline project planning, cost estimation, site monitoring, and compliance reporting.',
  data:         'AI data and analytics tools help you query datasets, build dashboards, and generate reports without writing SQL.',
  education:    'AI education and training tools personalise learning paths, generate course content, and provide instant feedback to learners.',
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
}

export default function CategoryPage({ cat, onHome, highlightedToolId }: CategoryPageProps) {
  const router = useRouter()
  const rawTools = TOOLS[cat.id] ?? TOOLS.animation
  const [sort, setSort] = useState('best-match')
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
            <h1 className="cat-page-title">Best {cat.name} AI Tools</h1>
            <p className="cat-page-sub">
              Comparing {sorted.length} tools · Prices updated April 2026
            </p>
            {CAT_INTROS[cat.id] && (
              <p className="cat-page-intro">{CAT_INTROS[cat.id]}</p>
            )}
          </div>

          <div className="sort-bar">
            <span className="sort-label">Sort by:</span>
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

          <div className="tool-grid">
            {sorted.map((t, i) => (
              <div key={t.id} data-tool-id={t.id}
                className={!showAll && i >= 4 ? 'tool-row-hidden' : ''}
                style={{ '--tool-i': i } as React.CSSProperties}
              >
                <ToolCard
                  tool={t} rank={i + 1} highlighted={t.id === activeHighlight}
                  onCardClick={() => router.push(`/tool/${nameToSlug(t.name)}`)}
                />
              </div>
            ))}
          </div>

          {sorted.length > 4 && (
            <button className="show-more-btn" onClick={() => setShowAll(o => !o)}>
              {showAll ? 'Show less' : `Show all ${sorted.length} tools`}
            </button>
          )}

          <div className="footer">
            © 2026 Directr · Data updated weekly · We earn referral fees from some links
          </div>
        </main>
      </div>
    </div>
  )
}
