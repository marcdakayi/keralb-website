import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Zones de zoom prédéfinies pour chaque type de produit
export const JUS_ZONES = [
  { label: 'Face Avant',    objectPosition: '20% 30%', scale: 2.2 },
  { label: 'Face Arrière',  objectPosition: '75% 30%', scale: 2.2 },
  { label: 'Vue Dessus',    objectPosition: '20% 85%', scale: 2.5 },
  { label: 'Vue Complète',  objectPosition: '50% 50%', scale: 1 },
]

export const TISANE_ZONES = [
  { label: 'Face Avant',    objectPosition: '18% 70%', scale: 2.2 },
  { label: 'Face Gauche',   objectPosition: '50% 70%', scale: 2.2 },
  { label: 'Face Droite',   objectPosition: '82% 70%', scale: 2.2 },
  { label: 'Vue Complète',  objectPosition: '50% 50%', scale: 1 },
]

export default function ProductViewer({
  image,
  zones,
  productColor = '#FFD700',
  productName = '',
}) {
  const [currentZone, setCurrentZone] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentZone((prev) => (prev + 1) % zones.length)
      }, 3000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPaused, zones.length])

  const zone = zones[currentZone]

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container image avec overflow hidden */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: '100%',
          height: '70vh',
          boxShadow: `0 40px 80px ${productColor}30`,
        }}
      >
        <motion.img
          src={image}
          alt={productName}
          animate={{
            scale: zone.scale,
            objectPosition: zone.objectPosition,
          }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: zone.objectPosition,
            transformOrigin: 'center center',
          }}
        />

        {/* Overlay gradient subtil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${productColor}10 0%, transparent 50%)`,
          }}
        />

        {/* Label face active */}
        <motion.div
          key={currentZone}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-sans backdrop-blur-md"
          style={{
            background: `${productColor}30`,
            color: productColor,
            border: `1px solid ${productColor}50`,
          }}
        >
          {zone.label}
        </motion.div>
      </div>

      {/* Dots navigation */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {zones.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentZone(i)}
            aria-label={`Voir ${zones[i].label}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentZone ? '24px' : '8px',
              height: '8px',
              background: i === currentZone ? productColor : `${productColor}40`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
