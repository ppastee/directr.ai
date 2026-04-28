'use client'

import { useState } from 'react'
import { CATEGORIES } from '@/data/tools'

interface ListToolModalProps {
  onClose: () => void
}

export default function ListToolModal({ onClose }: ListToolModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', url: '', category: '', email: '', desc: '' })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.url || !form.email) return
    // TODO: wire to API route POST /api/submit-tool
    setSubmitted(true)
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="list-modal" onClick={e => e.stopPropagation()}>
        <div className="list-modal-header">
          <div className="list-modal-title">List your tool</div>
          <button className="search-modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="list-modal-success">
            <div className="list-success-icon">✓</div>
            <div className="list-success-title">Submission received!</div>
            <div className="list-success-sub">We'll review your tool and get back to you at {form.email} within 48 hours.</div>
            <button className="list-submit-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form className="list-modal-form" onSubmit={handleSubmit}>
            <div className="list-field">
              <label className="list-label">Tool name *</label>
              <input className="list-input" placeholder="e.g. MyCoolAI" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div className="list-field">
              <label className="list-label">Website URL *</label>
              <input className="list-input" placeholder="https://mycoolai.com" type="url" value={form.url} onChange={e => set('url', e.target.value)} required />
            </div>
            <div className="list-field">
              <label className="list-label">Category</label>
              <select className="list-input" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select a category…</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="list-field">
              <label className="list-label">Brief description</label>
              <textarea className="list-input list-textarea" placeholder="What does your tool do in one sentence?" value={form.desc} onChange={e => set('desc', e.target.value)} rows={2} />
            </div>
            <div className="list-field">
              <label className="list-label">Your email *</label>
              <input className="list-input" placeholder="you@yourcompany.com" type="email" value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>
            <button className="list-submit-btn" type="submit">Submit for review →</button>
          </form>
        )}
      </div>
    </div>
  )
}
