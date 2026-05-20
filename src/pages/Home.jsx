import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Hero3D from '../components/Hero3D'

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.02,
    transition: { duration: 0.6, ease: 'easeIn' } }
}

const products = [
  {
    id: '01',
    name: "Pur Jus d'Ananas",
    tagline: 'La pureté tropicale',
    slug: '/jus-pur-ananas',
    color: '#E8C547',
    image: '/images/produits/ananas-avant.png'
  },
  {
    id: '02',
    name: 'Ananas-Passion',
    tagline: "L'explosion tropicale",
    slug: '/jus-ananas-passion',
    color: '#E86B2A',
    image: '/images/produits/passion-avant.png'
  },
  {
    id: '03',
    name: 'Ananas-Gingembre',
    tagline: 'Le feu de la nature',
    slug: '/jus-ananas-gingembre',
    color: '#E8A347',
    image: '/images/produits/gingembre-avant.png'
  },
  {
    id: '04',
    name: 'Ananas-Mangue',
    tagline: "La douceur d'Afrique",
    slug: '/jus-ananas-mangue',
    color: '#E86B2A',
    image: '/images/produits/mangue-avant.png'
  },
  {
    id: '05',
    name: 'Thé de Moringa',
    tagline: "L'arbre de vie",
    slug: '/the-moringa',
    color: '#3A7A3A',
    image: '/images/produits/moringa-avant.png'
  },
  {
    id: '06',
    name: 'TurmeriMove',
    tagline: 'Le pouvoir des épices',
    slug: '/tisane-turmerimove',
    color: '#E8C547',
    image: '/images/produits/turmerimove-avant.png'
  },
]

export default function Home() {
  const marqueeRef = useRef(null)
  const productsRef = useRef(null)
  const statsRef = useRef(null)
  const aboutRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // MARQUEE continu
      if (marqueeRef.current) {
        const marqueeTrack = marqueeRef.current.querySelector('.marquee-track')
        gsap.to(marqueeTrack, {
          xPercent: -50,
          duration: 20,
          ease: 'none',
          repeat: -1,
        })
      }

      // PRODUITS — révélation au scroll
      const productItems = productsRef.current?.querySelectorAll('.product-item')
      if (productItems) {
        productItems.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          )
        })
      }

      // STATS — compteurs animés
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number')
      if (statNumbers) {
        statNumbers.forEach(el => {
          const target = parseFloat(el.dataset.target)
          gsap.fromTo({ val: 0 },
            { val: 0 },
            {
              val: target,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              onUpdate: function() {
                el.textContent = Number.isInteger(target)
                  ? Math.round(this.targets()[0].val)
                  : this.targets()[0].val.toFixed(0)
              }
            }
          )
        })
      }

      // ABOUT — parallax
      if (aboutRef.current) {
        const img = aboutRef.current.querySelector('.about-img')
        if (img) {
          gsap.to(img, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          })
        }
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full bg-[#050505]"
    >
      {/* ── HERO 3D (existant) ── */}
      <Hero3D />

      {/* ── MARQUEE ── */}
      <section
        ref={marqueeRef}
        className="py-6 border-y border-white/5 overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 mr-8">
              {['NATUREL', 'PUR', 'CAMEROUNAIS', 'PREMIUM', 'VIVANT',
                '100% NATUREL', 'SANS ADDITIF', 'FAIT AVEC AMOUR'].map(word => (
                <span key={word} className="flex items-center gap-8">
                  <span className="font-display text-sm tracking-[0.3em] text-white/40">
                    {word}
                  </span>
                  <span className="text-gold text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ── PRODUITS LIST (style Floema) ── */}
      <section
        ref={productsRef}
        className="py-32 px-6 md:px-16 lg:px-32"
      >
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">
              Notre Collection
            </p>
            <h2
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              NOS SAVEURS
            </h2>
          </div>
          <p className="text-white/30 text-sm font-body hidden md:block">
            6 produits · 100% naturels
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.slug}
              className="product-item group flex items-center justify-between py-8 md:py-10 opacity-0"
            >
              <div className="flex items-center gap-6 md:gap-12">
                <span
                  className="font-display text-sm tracking-widest"
                  style={{ color: 'rgba(240,235,224,0.2)' }}
                >
                  {product.id}
                </span>
                <div>
                  <h3
                    className="font-display text-2xl md:text-4xl text-white
                               group-hover:text-gold transition-colors duration-500
                               tracking-wider"
                  >
                    {product.name.toUpperCase()}
                  </h3>
                  <p className="font-accent italic text-white/30 text-sm mt-1
                                group-hover:text-white/50 transition-colors duration-500">
                    {product.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div
                  className="w-16 h-20 md:w-20 md:h-28 overflow-hidden rounded
                             opacity-0 group-hover:opacity-100
                             transition-all duration-500 transform
                             scale-75 group-hover:scale-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="w-10 h-10 rounded-full border border-white/10
                             flex items-center justify-center
                             group-hover:border-gold group-hover:bg-gold/10
                             transition-all duration-500
                             transform group-hover:translate-x-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        ref={statsRef}
        className="py-24 border-y border-white/5"
        style={{ background: '#080808' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { label: 'Naturel', value: 100, suffix: '%' },
            { label: 'Additif', value: 0, suffix: '' },
            { label: 'Saveurs', value: 6, suffix: '' },
            { label: 'Volume', value: 300, suffix: 'ml' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-12 px-6
                         border-r border-white/5 last:border-0"
            >
              <div className="flex items-end gap-1 mb-3">
                <span
                  className="stat-number font-display text-5xl md:text-7xl text-gold"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="font-display text-2xl text-gold/60 mb-2">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / HISTOIRE ── */}
      <section
        ref={aboutRef}
        className="py-32 px-6 md:px-16 lg:px-32
                   flex flex-col md:flex-row
                   items-center gap-16 md:gap-32"
      >
        <div className="flex-1">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">
            Notre Histoire
          </p>
          <h2
            className="font-display text-white leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            LA NATURE<br/>
            <span className="text-gold">DANS CHAQUE</span><br/>
            GOUTTE
          </h2>
          <p className="text-white/40 font-body text-base leading-relaxed mb-10 max-w-md">
            Keral-B naît de la conviction que la nature offre
            le meilleur. Chaque bouteille est une promesse :
            zéro colorant, zéro conservateur, zéro arôme artificiel.
            Juste la pureté du fruit camerounais.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-3 text-gold
                       text-xs tracking-[0.3em] uppercase font-body
                       border-b border-gold/30 pb-1
                       hover:border-gold transition-colors duration-300"
          >
            Notre histoire
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        <div className="flex-1 relative h-[500px] w-full overflow-hidden rounded-sm">
          <div
            className="about-img absolute inset-0 scale-110"
            style={{ background: 'linear-gradient(135deg, #1a2a1a 0%, #0a1a0a 100%)' }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4 opacity-20 font-display text-gold">
                  KERAL-B
                </div>
                <p className="text-white/20 text-sm tracking-widest uppercase">
                  Cameroun · Afrique Centrale
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #050505 0%, transparent 30%, transparent 70%, #050505 100%)'
            }}
          />
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-32 px-6 text-center border-t border-white/5"
        style={{ background: '#050505' }}
      >
        <p className="text-white/20 text-xs tracking-[0.5em] uppercase mb-6 font-body">
          Commander maintenant
        </p>
        <h2
          className="font-display text-white leading-none mb-12"
          style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
        >
          PRÊT À<br/>
          <span className="text-gold">GOÛTER</span><br/>
          LA NATURE ?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/237656783732"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5
                       bg-gold text-[#050505] font-body font-medium
                       text-xs tracking-[0.2em] uppercase
                       hover:bg-keral-orange hover:text-white
                       transition-all duration-500
                       hover:-translate-y-1 hover:shadow-2xl
                       hover:shadow-gold/30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Commander via WhatsApp
          </a>
          <a
            href="/produits"
            className="inline-flex items-center gap-3 px-10 py-5
                       border border-white/15 text-white/60
                       font-body text-xs tracking-[0.2em] uppercase
                       hover:border-gold/40 hover:text-gold
                       transition-all duration-500"
          >
            Voir tous les produits
          </a>
        </div>
      </section>

    </motion.div>
  )
}
