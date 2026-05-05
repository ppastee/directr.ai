'use client'

import { useEffect, useRef, useState } from 'react'

let _shown = false

const MOBILE_CUT_TIME = 3 // seconds — adjust until cut lands after icon forms
const DESKTOP_CUT_BEFORE_END = 1 // seconds before video end to trigger on desktop
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

  // Mobile: cut early before full logo text appears
  // Desktop: cut 1s before video ends
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const isMobile = window.innerWidth < 768
    let fired = false
    function onTimeUpdate() {
      if (fired || !video) return
      const cutAt = isMobile
        ? MOBILE_CUT_TIME
        : video.duration ? video.duration - DESKTOP_CUT_BEFORE_END : Infinity
      if (video.currentTime >= cutAt) {
        fired = true
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
        onEnded={() => { if (!wiping) exit() }}
      />
      {wiping && <div className="intro-wipe" />}
    </div>
  )
}
