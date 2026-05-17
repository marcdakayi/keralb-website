import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ProductCard({ 
  title, 
  subtitle, 
  colorCode, 
  path, 
  price = "2 500 FCFA" 
}) {
  const ref = useRef(null)
  
  // Motion values pour suivre la position de la souris
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Lissage du mouvement (Spring physics)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  // Transformation en degrés de rotation (-15deg à 15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    // Position relative de la souris (-0.5 à 0.5)
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Link to={path}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="relative w-full max-w-[320px] h-[450px] rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-end overflow-hidden group shadow-2xl mx-auto"
      >
        {/* Glow de fond réactif */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
          style={{ backgroundColor: colorCode }}
        />

        {/* Effet Parallax sur le contenu intérieur */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Placeholder visuel de la bouteille - À remplacer par une vraie image */}
          <div className="w-24 h-48 bg-gradient-to-b from-white/20 to-transparent rounded-full mb-8 shadow-inner border border-white/10 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
            <div 
              className="absolute bottom-0 w-full h-3/4 blur-sm"
              style={{ backgroundColor: colorCode }}
            />
          </div>

          <span 
            className="text-xs font-sans font-bold tracking-widest uppercase mb-2 block"
            style={{ color: colorCode }}
          >
            {subtitle}
          </span>
          <h3 className="text-2xl font-display font-bold text-white mb-2">{title}</h3>
          
          <div className="flex items-center justify-between w-full mt-4 border-t border-white/10 pt-4">
            <span className="text-zinc-400 font-sans text-sm">{price}</span>
            <span className="text-white font-sans text-xs uppercase tracking-wider font-bold bg-white/5 px-3 py-1 rounded-full group-hover:bg-white/10 transition-colors">
              Commander
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
