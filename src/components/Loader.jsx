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
          setTimeout(onComplete, 700)
        }, 400)
      }
      setCount(Math.floor(current))
    }, 30)
    return () => clearInterval(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#000000' }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily:    'Playfair Display, serif',
                fontStyle:     'italic',
                fontSize:      'clamp(2rem, 8vw, 3.5rem)',
                fontWeight:    500,
                color:         '#C8A96E',
                letterSpacing: '-0.02em',
              }}
            >
              KERAL·B
            </motion.p>

            {/* Barre de progression */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="relative overflow-hidden"
                style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: '#C8A96E',
                    width:      `${count}%`,
                    transition: 'width 60ms linear',
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily:    'Inter, sans-serif',
                  fontSize:      '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.25)',
                }}
              >
                {count}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
