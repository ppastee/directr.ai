'use client'

import { useEffect, useRef, useState } from 'react'

let _shown = false

export function shouldShowIntro(): boolean {
  if (_shown) return false
  return true
}

export default function IntroOverlay({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [out, setOut] = useState(false)

  useEffect(() => {
    _shown = true
  }, [])

  function handleEnded() {
    setOut(true)
    setTimeout(onDone, 420)
  }

  // Fallback: if video fails to load/play, bail out after 5s
  useEffect(() => {
    const t = setTimeout(() => { setOut(true); setTimeout(onDone, 420) }, 5000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className={`intro-overlay${out ? ' intro-out' : ''}`} aria-hidden="true">
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  )
}
