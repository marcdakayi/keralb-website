import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Float, Environment, Sparkles, Html, useProgress } from '@react-three/drei'
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// ── LOADER ──────────────────────────────────────────
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: '#E8C547', fontFamily: 'Inter',
                    fontSize: '11px', letterSpacing: '0.3em',
                    textTransform: 'uppercase' }}>
        {Math.round(progress)}%
      </div>
    </Html>
  )
}

// ── BOUTEILLE 3D ────────────────────────────────────
function Bottle() {
  const meshRef = useRef()
  const glowRef = useRef()

  const texture = useTexture('/images/produits/ananas-avant.png')

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.1
    }

    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(t * 1.2) * 0.5
    }
  })

  return (
    <group>
      {/* Lumière principale dorée */}
      <pointLight
        ref={glowRef}
        position={[2, 2, 2]}
        color="#E8C547"
        intensity={2}
        distance={8}
      />

      {/* Lumière de remplissage verte */}
      <pointLight
        position={[-2, -1, -2]}
        color="#3A7A3A"
        intensity={0.8}
        distance={6}
      />

      {/* Lumière de fond orange */}
      <pointLight
        position={[0, -2, -3]}
        color="#E86B2A"
        intensity={0.5}
        distance={5}
      />

      {/* Bouteille — plan avec texture */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} scale={[1.4, 2.6, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            map={texture}
            transparent={true}
            alphaTest={0.1}
            roughness={0.1}
            metalness={0.2}
            envMapIntensity={1}
          />
        </mesh>

        {/* Halo lumineux derrière la bouteille */}
        <mesh position={[0, 0, -0.5]} scale={[2, 3.5, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#E8C547"
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Float>

      {/* Particules scintillantes autour */}
      <Sparkles
        count={80}
        scale={[4, 6, 4]}
        size={1.5}
        speed={0.4}
        opacity={0.6}
        color="#E8C547"
      />
      <Sparkles
        count={40}
        scale={[3, 5, 3]}
        size={1}
        speed={0.2}
        opacity={0.3}
        color="#E86B2A"
      />

      {/* Sol réfléchissant */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Reflet de la bouteille sur le sol */}
      <mesh
        position={[0, -2.19, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.8, 3.2, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.15}
          alphaTest={0.01}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// ── ANNEAUX ORBITAUX ────────────────────────────────
function OrbitalRings() {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) ring1.current.rotation.z = t * 0.2
    if (ring2.current) ring2.current.rotation.z = -t * 0.15
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.1
      ring3.current.rotation.y = t * 0.08
    }
  })

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.004, 8, 120]} />
        <meshBasicMaterial
          color="#E8C547"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.003, 8, 120]} />
        <meshBasicMaterial
          color="#E86B2A"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[4, 0.002, 8, 120]} />
        <meshBasicMaterial
          color="#3A7A3A"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// ── HERO 3D PRINCIPAL ───────────────────────────────
export default function Hero3D() {
  const heroRef = useRef()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Parallax au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const letters = 'KERAL-B'.split('')

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        background: '#050505',
        minHeight: '700px'
      }}
    >
      {/* ── CANVAS 3D ── */}
      <div
        ref={heroRef}
        className="absolute inset-0 w-full h-full"
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 8, 20]} />

          <ambientLight intensity={0.1} />
          <Environment preset="night" />

          <Bottle />
          <OrbitalRings />

          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
            <ChromaticAberration
              offset={[0.0008, 0.0008]}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* ── GRADIENT OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,
              #050505 0%,
              rgba(5,5,5,0.85) 40%,
              rgba(5,5,5,0.6) 70%,
              rgba(5,5,5,0.7) 100%),
            linear-gradient(to top,
              #050505 0%,
              transparent 30%)
          `
        }}
      />

      {/* ── TEXTE HERO ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center
                   px-8 md:px-16 lg:px-24 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {/* Label */}
        <AnimatePresence>
          {ready && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-white/30 text-xs
                         tracking-[0.5em] uppercase mb-6"
            >
              Keral-B · Cameroun · 100% Naturel
            </motion.p>
          )}
        </AnimatePresence>

        {/* Titre lettre par lettre */}
        <div className="overflow-hidden mb-4">
          <div className="flex">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={ready
                  ? { y: '0%', opacity: 1 }
                  : { y: '110%', opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="font-display block"
                style={{
                  fontSize: 'clamp(4rem, 14vw, 13rem)',
                  lineHeight: 1,
                  color: letter === '-' ? '#E8C547' : '#F0EBE0',
                  textShadow: letter === '-'
                    ? '0 0 60px rgba(232,197,71,0.5)'
                    : 'none',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="font-accent italic text-white/50 mb-12"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
        >
          La Nature dans Chaque Goutte
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <a
            href="#produits"
            className="inline-flex items-center gap-3 px-10 py-4
                       font-body font-medium text-xs tracking-[0.25em]
                       uppercase text-[#050505]
                       transition-all duration-500 hover:-translate-y-1
                       hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #E8C547, #E86B2A)',
              boxShadow: '0 0 40px rgba(232,197,71,0.2)'
            }}
          >
            Découvrir nos Saveurs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a
            href="https://wa.me/237656783732"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4
                       border border-white/15 text-white/60
                       font-body text-xs tracking-[0.25em] uppercase
                       hover:border-gold/40 hover:text-gold
                       transition-all duration-500"
          >
            Commander
          </a>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="font-body text-white/20 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #E8C547, transparent)',
            transformOrigin: 'top'
          }}
        />
      </motion.div>

      {/* ── INFOS COIN BAS DROITE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-16
                   text-right pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <p className="font-body text-white/20 text-xs tracking-widest uppercase">
          Fabriqué au Cameroun
        </p>
        <p className="font-body text-white/10 text-xs mt-1">
          Zéro colorant · Zéro conservateur · Zéro arôme
        </p>
      </motion.div>

    </section>
  )
}
