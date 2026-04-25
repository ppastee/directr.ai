'use client'

import { useEffect, useRef } from 'react'

type Orb = {
  x: number; y: number
  r: number
  opacity: number
  vx: number; vy: number
}

function makeOrb(vw: number, vh: number, fromLeft = false): Orb {
  return {
    x:       fromLeft ? -(80 + Math.random() * 200) : Math.random() * vw,
    y:       Math.random() * vh,
    r:       140 + Math.random() * 260,
    opacity: 0.18 + Math.random() * 0.16,
    vx:      0.10 + Math.random() * 0.20,
    vy:      (Math.random() - 0.5) * 0.10,
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '')
  if (h.length === 6) {
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
  }
  return [0, 102, 255]
}

export default function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let orbs: Orb[] = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    orbs = Array.from({ length: 8 }, () => makeOrb(canvas.width, canvas.height))

    const draw = () => {
      const vw = canvas.width
      const vh = canvas.height
      ctx.clearRect(0, 0, vw, vh)

      const accentHex = getComputedStyle(document.body).getPropertyValue('--accent').trim()
      const [r, g, b] = hexToRgb(accentHex)

      for (const orb of orbs) {
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.y < -orb.r || orb.y > vh + orb.r) orb.vy *= -1

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        grad.addColorStop(0,   `rgba(${r},${g},${b},${orb.opacity})`)
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${orb.opacity * 0.4})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        if (orb.x > vw + orb.r) {
          Object.assign(orb, makeOrb(vw, vh, true))
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
