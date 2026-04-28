'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function ScrollBar() {
  const [progress, setProgress] = useState(0)
  const [scrollable, setScrollable] = useState(false)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const getScrollable = () => {
    const el = document.documentElement
    return el.scrollHeight - el.clientHeight
  }

  const updateProgress = useCallback(() => {
    const max = getScrollable()
    setScrollable(max > 80)
    if (max > 0) setProgress(document.documentElement.scrollTop / max)
  }, [])

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  const scrollToFraction = useCallback((fraction: number) => {
    const max = getScrollable()
    window.scrollTo({ top: Math.max(0, Math.min(1, fraction)) * max, behavior: 'instant' })
  }, [])

  const fractionFromEvent = useCallback((e: MouseEvent | React.MouseEvent) => {
    const track = trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()
    return (e.clientY - rect.top) / rect.height
  }, [])

  const onTrackClick = (e: React.MouseEvent) => {
    if (dragging) return
    scrollToFraction(fractionFromEvent(e))
  }

  const onThumbDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)

    const onMove = (ev: MouseEvent) => scrollToFraction(fractionFromEvent(ev))
    const onUp = () => {
      setDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  if (!scrollable) return null

  return (
    <div
      ref={trackRef}
      className={`scroll-track${dragging ? ' scroll-track--dragging' : ''}`}
      onClick={onTrackClick}
    >
      <div
        className="scroll-thumb"
        style={{ top: `${progress * 100}%` }}
        onMouseDown={onThumbDown}
      />
    </div>
  )
}
