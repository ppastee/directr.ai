'use client'

import { useState } from 'react'
import { Tool } from '@/data/tools'

function Stars({ n }: { n: number }) {
  const full = Math.round(n)
  return (
    <span className="stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  )
}

function ToolLogo({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className="tool-logo">{tool.emoji}</div>
  }

  return (
    <div className="tool-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${tool.logoDomain}&sz=128`}
        alt={tool.name}
        width={28}
        height={28}
        style={{ borderRadius: 6, objectFit: 'contain' }}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

interface ToolCardProps {
  tool: Tool
  rank?: number
  highlighted?: boolean
}

export default function ToolCard({ tool, rank, highlighted }: ToolCardProps) {
  return (
    <div className={`tool-card${highlighted ? ' tool-highlighted' : ''}`}>
      <div className="tool-card-header">
        <ToolLogo tool={tool} />
        <div>
          <div className="tool-name">
            {tool.name}
            {rank === 1 && <span className="badge badge-best">#1 Pick</span>}
            {tool.sponsored && !rank && <span className="badge badge-best">Sponsored</span>}
            {tool.free && tool.freeTierLabel && (
              <span className="badge badge-free">{tool.freeTierLabel}</span>
            )}
          </div>
          <div className="tool-tagline">{tool.tagline}</div>
        </div>
      </div>

      <p className="tool-desc">{tool.desc}</p>

      <div className="tag-row">
        {tool.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="tool-footer">
        <div>
          <div className="tool-price">{tool.price}</div>
          {tool.free && tool.freeTierLabel && (
            <span className="tool-free">{tool.freeTierLabel}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {tool.reviews > 0 && (
            <div className="tool-rating">
              <Stars n={tool.rating} />
              {tool.rating} <span style={{ opacity: 0.6 }}>({tool.reviews})</span>
            </div>
          )}
          <a
            className="visit-btn"
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Visit →
          </a>
        </div>
      </div>
    </div>
  )
}
