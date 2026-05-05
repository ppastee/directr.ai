'use client'

import { useEffect, useRef, useState } from 'react'

let _shown = false

// Adjust until the cut lands right after the blue icon fully forms on mobile
const MOBILE_CUT_TIME = 4 // seconds
// How long to hold the fully-formed logo before the wipe starts
const PRE_WIPE_HOLD = 400 // ms

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
    setTimeout(() => {
      setWiping(true)
      setTimeout(() => {
        setOut(true)
        setTimeout(onDone, 80)
      }, 700)
    }, PRE_WIPE_HOLD)
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

  // Fallback: bail out after 8s
  useEffect(() => {
    const t = setTimeout(exit, 8000)
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
