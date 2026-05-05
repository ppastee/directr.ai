'use client'

import { useEffect, useRef, useState } from 'react'

let _shown = false

// Tweak this until the cut lands right after the blue icon fully forms
const MOBILE_CUT_TIME = 3 // seconds

export function shouldShowIntro(): boolean {
  if (_shown) return false
  return true
}

export default function IntroOverlay({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [wiping, setWiping] = useState(false)
  const [out, setOut] = useState(false)

  useEffect(() => {
    _shown = true
  }, [])

  function exit() {
    setWiping(true)
    setTimeout(() => {
      setOut(true)
      setTimeout(onDone, 80)
    }, 650)
  }

  // On mobile, cut the video early — before the full logo text appears
  useEffect(() => {
    const video = videoRef.current
    if (!video || window.innerWidth >= 768) return
    function onTimeUpdate() {
      if (video && video.currentTime >= MOBILE_CUT_TIME) {
        video.pause()
        exit()
      }
    }
    video.addEventListener('timeupdate', onTimeUpdate)
    return () => video.removeEventListener('timeupdate', onTimeUpdate)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fallback: if video fails to load/play, bail out after 5s
  useEffect(() => {
    const t = setTimeout(exit, 5000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`intro-overlay${out ? ' intro-out' : ''}`} aria-hidden="true">
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={exit}
      />
      {wiping && <div className="intro-wipe" />}
    </div>
  )
}
