import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const COLORS = [
  { hex: '#E8C547', weight: 40 },  /* or/jaune  */
  { hex: '#E86B2A', weight: 30 },  /* orange    */
  { hex: '#C8A96E', weight: 20 },  /* or doux   */
  { hex: '#FFFFFF', weight: 10 },  /* blanc     */
]

function pickColor() {
  const r = Math.random() * 100
  let acc = 0
  for (const { hex, weight } of COLORS) {
    acc += weight
    if (r < acc) return hex
  }
  return COLORS[0].hex
}

function createParticle(cx, cy, w, h) {
  const spread = 0.15
  return {
    x:     cx + (Math.random() - 0.5) * w * spread,
    y:     cy + (Math.random() - 0.5) * h * spread,
    vx:    (Math.random() - 0.5) * 16,
    vy:    (Math.random() - 0.5) * 16,
    radius: 3 + Math.random() * 15,
    opacity: 0.85,
    decay:   0.003 + Math.random() * 0.003,
    color:   pickColor(),
    trail:   [],
  }
}

export default function JuiceParticles() {
  const canvasRef         = useRef(null)
  const rafRef            = useRef(null)
  const particlesRef      = useRef([])
  const lastSplashRef     = useRef(0)
  const prefersReduced    = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    /* Init 120 particules */
    const w  = () => canvas.width
    const h  = () => canvas.height
    const cx = () => w() / 2
    const cy = () => h() / 2

    particlesRef.current = Array.from({ length: 120 }, () =>
      createParticle(cx(), cy(), w(), h())
    )

    const splash = (ox, oy) => {
      for (let i = 0; i < 20; i++) {
        const p = createParticle(ox, oy, 0, 0)
        p.vx = (Math.random() - 0.5) * 18
        p.vy = (Math.random() - 0.5) * 18
        p.opacity = 0.95
        particlesRef.current.push(p)
      }
      /* Plafond à 160 particules */
      if (particlesRef.current.length > 160) {
        particlesRef.current.splice(0, particlesRef.current.length - 160)
      }
    }

    const draw = (ts) => {
      ctx.clearRect(0, 0, w(), h())

      /* Splash toutes les 3 s */
      if (ts - lastSplashRef.current > 3000) {
        lastSplashRef.current = ts
        const sx = cx() + (Math.random() - 0.5) * w() * 0.3
        const sy = cy() + (Math.random() - 0.5) * h() * 0.3
        splash(sx, sy)
      }

      for (const p of particlesRef.current) {
        /* Trainée : 5 positions précédentes */
        for (let t = 0; t < p.trail.length; t++) {
          const pos   = p.trail[t]
          const alpha = p.opacity * (1 - t / p.trail.length) * 0.35
          if (alpha < 0.01) continue
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, p.radius * (1 - t / p.trail.length) * 0.65, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = alpha
          ctx.fill()
        }

        /* Particule principale */
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fill()

        /* Mise à jour */
        p.trail.unshift({ x: p.x, y: p.y })
        if (p.trail.length > 5) p.trail.pop()

        p.x  += p.vx
        p.y  += p.vy
        p.vy += 0.05      /* gravité */
        p.opacity -= p.decay

        /* Respawn */
        if (p.opacity < 0.05) {
          Object.assign(p, createParticle(cx(), cy(), w(), h()))
        }
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReduced])

  if (prefersReduced) return null

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
