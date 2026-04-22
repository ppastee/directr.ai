'use client'

import { useEffect, useRef } from 'react'

type DrawFn = (ctx: CanvasRenderingContext2D, s: number) => void

// Each shape draws a recognisable silhouette in normalised coords.
// s = scale in pixels. ctx fill/stroke colour is set by caller.
const SHAPES: DrawFn[] = [

  // CAT — oval body, round head, triangular ears, curled tail
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0.12*s, 0.50*s, 0.66*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.arc(0.08*s, -0.60*s, 0.35*s, 0, Math.PI*2); ctx.fill()
    ctx.beginPath()                                          // left ear
    ctx.moveTo(-0.10*s, -0.86*s)
    ctx.lineTo(-0.32*s, -1.20*s)
    ctx.lineTo( 0.02*s, -1.02*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()                                          // right ear
    ctx.moveTo( 0.20*s, -0.86*s)
    ctx.lineTo( 0.42*s, -1.20*s)
    ctx.lineTo( 0.44*s, -0.90*s)
    ctx.closePath(); ctx.fill()
    ctx.lineWidth = 0.14*s; ctx.lineCap = 'round'           // tail
    ctx.beginPath()
    ctx.moveTo(-0.46*s,  0.70*s)
    ctx.quadraticCurveTo(-1.02*s, 0.38*s, -0.82*s, -0.22*s)
    ctx.stroke()
  },

  // BUNNY — round body, round head, two tall upright ears
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0.14*s, 0.54*s, 0.64*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.arc(0, -0.54*s, 0.36*s, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(-0.20*s, -1.18*s, 0.13*s, 0.40*s, -0.12, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse( 0.20*s, -1.15*s, 0.13*s, 0.40*s,  0.12, 0, Math.PI*2); ctx.fill()
  },

  // DUCK — oval body, small round head, triangle beak, pointed tail
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0, 0.70*s, 0.50*s, -0.18, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.arc(0.66*s, -0.36*s, 0.28*s, 0, Math.PI*2); ctx.fill()
    ctx.beginPath()                                          // beak
    ctx.moveTo( 0.88*s, -0.38*s)
    ctx.lineTo( 1.18*s, -0.26*s)
    ctx.lineTo( 0.94*s, -0.16*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()                                          // tail
    ctx.moveTo(-0.66*s, -0.14*s)
    ctx.lineTo(-0.98*s, -0.52*s)
    ctx.lineTo(-0.70*s, -0.44*s)
    ctx.closePath(); ctx.fill()
  },

  // FISH — oval body, forked tail, dorsal fin
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0.10*s, 0, 0.64*s, 0.37*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath()                                          // tail top lobe
    ctx.moveTo(-0.50*s, 0)
    ctx.lineTo(-1.02*s, -0.38*s)
    ctx.lineTo(-0.76*s,  0.04*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()                                          // tail bottom lobe
    ctx.moveTo(-0.50*s, 0)
    ctx.lineTo(-1.02*s,  0.38*s)
    ctx.lineTo(-0.76*s, -0.04*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()                                          // dorsal fin
    ctx.moveTo( 0.02*s, -0.36*s)
    ctx.lineTo(-0.10*s, -0.62*s)
    ctx.lineTo( 0.24*s, -0.36*s)
    ctx.closePath(); ctx.fill()
  },

  // ELEPHANT — huge oval body, round head, big ear, drooping trunk
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0.10*s, 0.66*s, 0.60*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.arc(0.70*s, -0.26*s, 0.36*s, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(0.30*s, -0.20*s, 0.26*s, 0.40*s, 0.4, 0, Math.PI*2); ctx.fill()
    ctx.lineWidth = 0.16*s; ctx.lineCap = 'round'           // trunk
    ctx.beginPath()
    ctx.moveTo(0.98*s, -0.08*s)
    ctx.quadraticCurveTo(1.30*s, 0.30*s, 1.04*s, 0.54*s)
    ctx.stroke()
  },

  // T-REX — tilted body, large head, tiny arm, thick leg, long tail
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(-0.08*s, 0, 0.50*s, 0.40*s, -0.28, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(0.56*s, -0.46*s, 0.40*s, 0.26*s, 0.18, 0, Math.PI*2); ctx.fill()
    ctx.beginPath()                                          // tiny arm
    ctx.moveTo(0.20*s, -0.10*s)
    ctx.lineTo(0.38*s,  0.10*s)
    ctx.lineTo(0.52*s, -0.02*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.ellipse(-0.80*s, 0.16*s, 0.36*s, 0.17*s, 0.28, 0, Math.PI*2); ctx.fill()
    ctx.beginPath()                                          // leg
    ctx.moveTo(0.04*s, 0.38*s)
    ctx.lineTo(-0.10*s, 0.80*s)
    ctx.lineTo( 0.20*s, 0.80*s)
    ctx.closePath(); ctx.fill()
  },

  // ROCKET — tube, pointed nose cone, two delta fins, porthole
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0.08*s, 0.26*s, 0.60*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath()                                          // nose cone
    ctx.moveTo(-0.26*s, -0.48*s)
    ctx.quadraticCurveTo(0, -1.10*s, 0.26*s, -0.48*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()                                          // left fin
    ctx.moveTo(-0.26*s,  0.48*s)
    ctx.lineTo(-0.64*s,  0.88*s)
    ctx.lineTo(-0.26*s,  0.70*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()                                          // right fin
    ctx.moveTo( 0.26*s,  0.48*s)
    ctx.lineTo( 0.64*s,  0.88*s)
    ctx.lineTo( 0.26*s,  0.70*s)
    ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.arc(0, -0.16*s, 0.12*s, 0, Math.PI*2); ctx.fill()
  },

  // BUTTERFLY — slim body, four wings
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0, 0.09*s, 0.54*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(-0.44*s, -0.26*s, 0.36*s, 0.28*s, -0.48, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse( 0.44*s, -0.26*s, 0.36*s, 0.28*s,  0.48, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(-0.36*s,  0.28*s, 0.26*s, 0.20*s,  0.50, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse( 0.36*s,  0.28*s, 0.26*s, 0.20*s, -0.50, 0, Math.PI*2); ctx.fill()
  },

  // DOG — round body, round head, floppy ear, snout, wagging tail
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(0, 0.10*s, 0.56*s, 0.62*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.arc(0.12*s, -0.60*s, 0.36*s, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(0.36*s, -0.44*s, 0.14*s, 0.26*s, 0.5, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(0.36*s, -0.80*s, 0.16*s, 0.26*s, 0.3, 0, Math.PI*2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(0.36*s, -0.28*s, 0.22*s, 0.14*s, 0, 0, Math.PI*2); ctx.fill()
    ctx.lineWidth = 0.13*s; ctx.lineCap = 'round'           // tail
    ctx.beginPath()
    ctx.moveTo(-0.50*s, 0.60*s)
    ctx.quadraticCurveTo(-0.90*s, 0.20*s, -0.72*s, -0.18*s)
    ctx.stroke()
  },
]

type Cloud = {
  shapeIdx: number
  x: number; y: number
  scale: number
  opacity: number
  vx: number; vy: number
}

function makeCloud(vw: number, vh: number, fromLeft = false): Cloud {
  return {
    shapeIdx: Math.floor(Math.random() * SHAPES.length),
    x:       fromLeft ? -(80 + Math.random() * 200) : Math.random() * vw,
    y:       Math.random() * vh,
    scale:   80 + Math.random() * 120,
    opacity: 0.22 + Math.random() * 0.16,
    vx:      0.12 + Math.random() * 0.22,
    vy:      (Math.random() - 0.5) * 0.10,
  }
}

function hexToRgb(hex: string): string {
  const h = hex.trim().replace('#', '')
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return `${r},${g},${b}`
  }
  return '0,102,255'
}

export default function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let clouds: Cloud[] = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    clouds = Array.from({ length: 8 }, () => makeCloud(canvas.width, canvas.height))

    const draw = () => {
      const vw = canvas.width
      const vh = canvas.height
      ctx.clearRect(0, 0, vw, vh)

      const rgb = hexToRgb(
        getComputedStyle(document.body).getPropertyValue('--accent').trim()
      )

      for (const cloud of clouds) {
        cloud.x += cloud.vx
        cloud.y += cloud.vy
        if (cloud.y < -cloud.scale * 2 || cloud.y > vh + cloud.scale * 2) cloud.vy *= -1

        const blur = Math.round(cloud.scale * 0.13)

        ctx.save()
        ctx.translate(cloud.x, cloud.y)
        ctx.globalAlpha  = cloud.opacity
        ctx.filter       = `blur(${blur}px)`
        ctx.fillStyle    = `rgb(${rgb})`
        ctx.strokeStyle  = `rgb(${rgb})`

        SHAPES[cloud.shapeIdx](ctx, cloud.scale)

        ctx.restore()

        if (cloud.x > vw + cloud.scale * 2) {
          const f = makeCloud(vw, vh, true)
          Object.assign(cloud, f)
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
