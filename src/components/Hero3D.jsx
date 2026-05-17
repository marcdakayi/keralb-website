import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Composant des Particules (Spirale)
function ParticleSpiral() {
  const pointsRef = useRef()
  
  // Génération des points de la spirale
  const [positions, colors] = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorPalette = [
      new THREE.Color('#FFD700'), // Jaune Keral
      new THREE.Color('#FF6B00'), // Orange Keral
      new THREE.Color('#2D7A2D'), // Vert Keral
    ]

    for (let i = 0; i < count; i++) {
      const t = i / count
      const angle = t * Math.PI * 30 // 15 tours de spirale
      const radius = 2.5 + Math.random() * 0.8 - t * 2
      
      const x = Math.cos(angle) * radius
      const y = (t - 0.5) * 10 + (Math.random() - 0.5) * 0.5
      const z = Math.sin(angle) * radius
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return [positions, colors]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.15 // Rotation lente de la spirale
      pointsRef.current.rotation.z = Math.sin(time * 0.5) * 0.05 // Oscillation
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Lumière verte pulsante
function PulsingLight() {
  const lightRef = useRef()
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(time * 1.5) * 0.5
    }
  })
  return <ambientLight ref={lightRef} color="#2D7A2D" />
}

export default function Hero3D() {
  const titleText = "KERAL-B"
  
  // Animation variantes pour Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }
  
  const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A0A] overflow-hidden">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <PulsingLight />
          <ParticleSpiral />
          
          <EffectComposer>
            <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} height={480} />
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* HTML Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none pt-16">
        
        {/* Animated Logo Letter by Letter */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-7xl md:text-[9rem] font-display font-bold text-white flex gap-1 drop-shadow-[0_0_20px_rgba(255,215,0,0.2)]"
        >
          {titleText.split('').map((char, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants} 
              className={char === '-' ? 'text-keral-orange mx-2' : ''}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated Slogan */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9, letterSpacing: '0px' }}
          animate={{ opacity: 1, scale: 1, letterSpacing: '8px' }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
          className="mt-8 text-xl md:text-3xl font-sans text-keral-yellow uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] max-w-2xl"
        >
          La Nature dans Chaque Goutte
        </motion.p>

        {/* CTA Button with Liquid/Ripple effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-16 pointer-events-auto relative group"
        >
          {/* Ondes circulaires au hover (Ripples) */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-keral-orange"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0, transition: { duration: 1.2, repeat: Infinity } }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-keral-yellow"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0, transition: { duration: 1.2, delay: 0.4, repeat: Infinity } }}
          />
          
          <button className="relative px-10 py-5 bg-[#0A0A0A] text-white font-sans font-bold uppercase tracking-widest rounded-full overflow-hidden transition-transform transform hover:scale-105 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Effet Liquide CSS au hover */}
            <span className="absolute inset-0 bg-keral-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-20"></span>
            
            <span className="relative z-10 group-hover:text-keral-yellow transition-colors duration-300">
              Découvrir nos Saveurs
            </span>
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <span className="text-zinc-500 text-[10px] tracking-widest uppercase mb-4 font-sans">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-keral-orange to-keral-yellow absolute top-0"
          />
        </div>
      </motion.div>
    </div>
  )
}
