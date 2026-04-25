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
  const [freeOnly, setFreeOnly] = useState(false)
  const [apiOnly, setApiOnly] = useState(false)
  const [noWatermark, setNoWatermark] = useState(false)
  const [under20, setUnder20] = useState(false)
  const [under50, setUnder50] = useState(false)
  const [minRating, setMinRating] = useState(1)
  const [activeHighlight, setActiveHighlight] = useState<number | null>(highlightedToolId ?? null)

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

  const filtered = useMemo(() => {
    let tools = rawTools
    if (freeOnly)    tools = tools.filter((t) => t.free)
    if (apiOnly)     tools = tools.filter((t) => t.apiAccess)
    if (noWatermark) tools = tools.filter((t) => !t.watermark)
    if (under20)     tools = tools.filter((t) => monthlyPrice(t.price) <= 20)
    if (under50)     tools = tools.filter((t) => monthlyPrice(t.price) <= 50)
    if (minRating > 1) tools = tools.filter((t) => t.rating >= minRating)
    return sortTools(tools, sort)
  }, [rawTools, freeOnly, apiOnly, noWatermark, under20, under50, minRating, sort])

  return (
    <div className="page">
      <div className="cat-page">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">Pricing</div>
            <label className="filter-opt">
              <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
              <label>Free tier available</label>
            </label>
            <label className="filter-opt">
              <input type="checkbox" checked={under20} onChange={(e) => setUnder20(e.target.checked)} />
              <label>Under $20/mo</label>
            </label>
            <label className="filter-opt">
              <input type="checkbox" checked={under50} onChange={(e) => setUnder50(e.target.checked)} />
              <label>Under $50/mo</label>
            </label>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Features</div>
            <label className="filter-opt">
              <input type="checkbox" checked={apiOnly} onChange={(e) => setApiOnly(e.target.checked)} />
              <label>API access</label>
            </label>
            <label className="filter-opt">
              <input type="checkbox" checked={noWatermark} onChange={(e) => setNoWatermark(e.target.checked)} />
              <label>No watermark</label>
            </label>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Min. Rating</div>
            <div className="price-range">
              <input
                type="range" min="1" max="5" step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
              <div className="price-labels">
                <span>Any</span>
                <span>{minRating > 1 ? `${minRating}+` : 'All'}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="cat-main">
          <div className="cat-page-header">
            <div className="breadcrumb">
              <span className="breadcrumb-link" onClick={onHome}>Home</span>
              {' / '}
              {cat.name}
            </div>
            <h1 className="cat-page-title">Best {cat.name} AI Tools</h1>
            <p className="cat-page-sub">
              Comparing {filtered.length} tools · Prices updated April 2026
            </p>
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
            {filtered.map((t, i) => (
              <div key={t.id} data-tool-id={t.id} style={{ '--tool-i': i } as React.CSSProperties}>
                <ToolCard
                  tool={t} rank={i + 1} highlighted={t.id === activeHighlight}
                  onCardClick={() => router.push(`/tool/${nameToSlug(t.name)}`)}
                />
              </div>
            ))}
          </div>

          <div className="footer">
            © 2026 Directr.ai · Data updated weekly · We earn referral fees from some links
          </div>
        </main>
      </div>
    </div>
  )
}
