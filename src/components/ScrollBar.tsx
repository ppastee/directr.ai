'use client'

import { useEffect, useState, useCallback } from 'react'

export default function MoreToolsButton() {
  const [visible, setVisible] = useState(false)

  const update = useCallback(() => {
    const el = document.documentElement
    const distFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop
    setVisible(distFromBottom > 120)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button className="more-tools-btn" onClick={scrollToBottom}>
      More tools ↓
    </button>
  )
}
