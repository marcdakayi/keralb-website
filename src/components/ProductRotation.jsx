import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductRotation({
  images,
  productColor = '#FFD700',
}) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length <= 1) return
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length)
    }, 2500)
    return () => clearInterval(t)
  }, [paused, images.length])

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: `drop-shadow(0 30px 50px ${productColor}50)` }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="max-h-[65vh] w-auto object-contain"
            style={{ maxWidth: '400px' }}
          />
        </AnimatePresence>
      </motion.div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Photo ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === current ? '20px' : '8px',
                height: '8px',
                background: i === current ? productColor : `${productColor}40`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
