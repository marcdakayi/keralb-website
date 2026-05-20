import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
}

const product = {
  name: 'ANANAS\nMANGUE',
  tagline: "La douceur d'Afrique",
  description: "Deux fruits emblématiques de l'Afrique réunis dans un jus d'exception. La mangue apporte sa richesse veloutée à la vivacité de l'ananas.",
  volume: '300ml',
  ingredients: ['Ananas', 'Mangue'],
  bienfaits: [
    { icon: '👁️', title: 'Vision', desc: 'Bêta-carotène de la mangue' },
    { icon: '💪', title: 'Vitalité', desc: 'Vitamines A, B, C combinées' },
    { icon: '🌿', title: 'Alcalinité', desc: 'Équilibre acido-basique' },
    { icon: '✨', title: 'Beauté', desc: 'Peau lumineuse et hydratée' },
  ],
  price: '2800 FCFA',
  color: '#E86B2A',
  imageFront: '/images/produits/mangue-avant.png',
  imageBack: '/images/produits/mangue-arriere.png',
}

export default function JusAnanasMangue() {
  const heroRef = useRef(null)
  const bottleRef = useRef(null)
  const infoRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {

      gsap.to(bottleRef.current, {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to(bottleRef.current, {
        rotationY: 360,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      const items = infoRef.current?.querySelectorAll('.reveal-item')
      items?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        )
      })

    })
    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#050505] min-h-screen"
    >
      <section
        ref={heroRef}
        className="min-h-screen grid grid-cols-1 md:grid-cols-2
              relative overflow-hidden pt-20 md:pt-0"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 60% at 70% 50%, rgba(232,107,42,0.12) 0%, transparent 70%)` }}
        />

        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-32 pb-16 relative z-10">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-body mb-6">
            Keral-B · 04
          </p>
          <h1
            className="font-display text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}
          >
            {product.name.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span style={{ color: product.color }}>{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="font-accent italic text-white/50 text-xl mb-8">{product.tagline}</p>
          <p className="font-body text-white/40 text-sm leading-relaxed max-w-sm mb-12">{product.description}</p>

          <div className="flex items-center gap-3 md:gap-6 mb-10 md:mb-12 flex-wrap">
            <div className="text-center">
              <p className="font-display text-3xl" style={{ color: product.color }}>{product.volume}</p>
              <p className="text-white/30 text-xs tracking-widest uppercase font-body">Volume</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="font-display text-3xl" style={{ color: product.color }}>0</p>
              <p className="text-white/30 text-xs tracking-widest uppercase font-body">Additif</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="font-display text-3xl" style={{ color: product.color }}>100%</p>
              <p className="text-white/30 text-xs tracking-widest uppercase font-body">Naturel</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto">
            <a
              href="https://wa.me/237656783732?text=Je%20commande%20l'Ananas-Mangue%20Keral-B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 font-body font-medium text-xs tracking-[0.2em] uppercase text-[#050505] hover:opacity-90 transition-all duration-500 hover:-translate-y-1"
              style={{ background: product.color }}
            >
              Commander — {product.price}
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/15 text-white/50 font-body text-xs tracking-[0.2em] uppercase hover:border-white/40 hover:text-white transition-all duration-500"
            >
              ← Retour
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center relative pt-16 md:pt-0 pb-16 md:pb-0">
          <div ref={bottleRef} className="relative w-36 md:w-64 lg:w-72" style={{ transformStyle: 'preserve-3d' }}>
            <img
              src={product.imageFront}
              alt={product.name}
              className="w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 40px 80px rgba(232,107,42,0.3))' }}
            />
          </div>
          <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full" style={{ border: `1px solid rgba(232,107,42,0.08)` }} />
        </div>
      </section>

      <section ref={infoRef} className="py-32 px-6 md:px-16 lg:px-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="reveal-item">
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-body mb-8">Ingrédients</p>
            <div className="space-y-4">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: product.color }} />
                  <span className="font-display text-2xl text-white tracking-wider">{ing.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-item">
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-body mb-8">Bienfaits</p>
            <div className="grid grid-cols-2 gap-4">
              {product.bienfaits.map((b, i) => (
                <div key={i} className="p-6 border border-white/5 hover:border-white/15 transition-colors duration-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-2xl mb-3 block">{b.icon}</span>
                  <h3 className="font-display text-lg text-white tracking-wider mb-1">{b.title.toUpperCase()}</h3>
                  <p className="text-white/30 text-xs font-body leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center border-t border-white/5" style={{ background: '#080808' }}>
        <p className="font-display text-white/20 tracking-[0.5em] text-sm uppercase mb-4">Disponible maintenant</p>
        <h2 className="font-display text-white leading-none mb-10" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
          {product.price}
        </h2>
        <a
          href="https://wa.me/237656783732?text=Je%20commande%20l'Ananas-Mangue%20Keral-B"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-12 py-5 font-body font-medium text-xs tracking-[0.25em] uppercase text-[#050505] hover:opacity-90 transition-all duration-300 hover:-translate-y-1"
          style={{ background: product.color }}
        >
          Commander via WhatsApp
        </a>
      </section>
    </motion.div>
  )
}
