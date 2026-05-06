'use client'

import { useState, useMemo } from 'react'
import { Category, Tool } from '@/data/tools'
import type { ToolsMap } from '@/lib/db'
import { scoreTools } from '@/lib/search'

function ResultLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="srp-logo srp-logo-fallback">{tool.emoji}</div>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="srp-logo"
      src={`https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=64`}
      alt={tool.name}
      onError={() => setFailed(true)}
    />
  )
}

interface SearchResultsPageProps {
  query: string
  onHome: () => void
  onCategory: (cat: Category, toolId?: number) => void
  onNewSearch: (query: string) => void
  allTools: ToolsMap
  categories: Category[]
}

export default function SearchResultsPage({ query, onHome, onCategory, onNewSearch, allTools, categories }: SearchResultsPageProps) {
  const [input, setInput] = useState(query)
  const results = useMemo(() => scoreTools(query, allTools, categories, 0), [query, allTools, categories])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && input.trim()) onNewSearch(input.trim())
  }

  function handleSelect(catId: string, toolId: number) {
    const cat = categories.find(c => c.id === catId)
    if (cat) onCategory(cat, toolId)
  }

  return (
    <div className="page">
      <div className="srp-header">
        <button className="srp-back" onClick={onHome}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>

        <div className="srp-search-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--muted)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="srp-search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Refine your search…"
          />
          <button className="srp-search-btn" onClick={() => input.trim() && onNewSearch(input.trim())}>
            Search
          </button>
        </div>

        <div className="srp-meta">
          {results.length > 0
            ? <><strong>{results.length}</strong> tools match &ldquo;{query}&rdquo;</>
            : <>No results for &ldquo;{query}&rdquo;</>
          }
        </div>
      </div>

      <div className="srp-body">
        {results.length === 0 ? (
          <div className="srp-empty">
            <div className="srp-empty-icon">🔍</div>
            <div className="srp-empty-title">No tools found</div>
            <div className="srp-empty-sub">Try different keywords, like &ldquo;video&rdquo;, &ldquo;write&rdquo;, or &ldquo;code&rdquo;</div>
          </div>
        ) : (
          <div className="srp-list">
            {results.map(({ tool, catId, catName }) => (
              <div key={tool.id} className="srp-card" onClick={() => handleSelect(catId, tool.id)}>
                <ResultLogo tool={tool} />
                <div className="srp-card-text">
                  <div className="srp-card-name">{tool.name}</div>
                  <div className="srp-card-tagline">{tool.tagline}</div>
                </div>
                <div className="srp-card-meta">
                  <span className="srp-cat">{catName}</span>
                  {tool.reviews > 0 && <span className="srp-rating">★ {tool.rating.toFixed(1)}</span>}
                  <span className="srp-price">{tool.freeTier ? 'Free tier' : tool.price}</span>
                </div>
                <svg className="srp-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
