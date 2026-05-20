import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [done,  setDone]  = useState(false)

  useEffect(() => {
    let current = 0
    const tick = setInterval(() => {
      current += Math.random() * 3 + 1
      if (current >= 100) {
        current = 100
        clearInterval(tick)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 900)
        }, 500)
      }
      setCount(Math.floor(current))
    }, 35)
    return () => clearInterval(tick)
  }, [onComplete])

  const LETTERS = 'KERAL-B'.split('')

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--dark)' }}
        >
          {/* Blobs de fond */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width:  Math.random() * 400 + 100,
                  height: Math.random() * 400 + 100,
                  left:   `${Math.random() * 100}%`,
                  top:    `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? 'var(--gold)' : i % 3 === 1 ? 'var(--orange)' : 'var(--green)',
                  filter: 'blur(90px)',
                  opacity: 0.12,
                }}
                animate={{ x: [0, (Math.random() - 0.5) * 60], y: [0, (Math.random() - 0.5) * 60], scale: [1, 1.15, 1] }}
                transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: Math.random() * 2 }}
              />
            ))}
          </div>

          {/* Contenu */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Cercle tournant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                style={{ background: 'conic-gradient(from 0deg, var(--gold), var(--orange), var(--green), var(--gold))', padding: '2px' }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: 'var(--dark)' }}>
                  <span className="font-display font-black text-2xl text-gradient">K</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Nom lettre par lettre */}
            <div className="font-display font-black tracking-[0.12em] mb-3 flex"
                 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
              {LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  className={char === '-' || char === 'B' ? 'text-gradient' : ''}
                  style={{ color: char === '-' || char === 'B' ? undefined : 'var(--cream)', display: 'inline-block' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="font-accent italic tracking-[0.2em] mb-12"
              style={{ color: 'var(--muted)', fontSize: '0.9rem' }}
            >
              La Nature dans Chaque Goutte
            </motion.p>

            {/* Barre de progression */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-56 h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-100"
                  style={{
                    background: 'linear-gradient(90deg, var(--gold), var(--orange))',
                    width: `${count}%`,
                    boxShadow: '0 0 10px rgba(255,215,0,0.6)',
                  }}
                />
              </div>

              <div className="font-display font-bold tabular-nums"
                   style={{ fontSize: '3rem', color: 'rgba(255,215,0,0.12)', lineHeight: 1 }}>
                {String(count).padStart(3, '0')}
              </div>

              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--muted)' }}>
                Chargement
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
