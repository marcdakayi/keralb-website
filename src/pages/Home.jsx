import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import JuiceParticles from '../components/JuiceParticles'
import { PRODUCTS, VALUES, CONTACT, waLink } from '../lib/constants'

/* ── Icône WhatsApp ── */
function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

/* ── Chevron bounce ── */
function ScrollChevron() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span style={{ fontSize: '10px', fontFamily: 'Inter', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
        Défiler
      </span>
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 1l7 6 7-6"/>
      </svg>
    </motion.div>
  )
}

/* ── Marquee text ── */
const MARQUEE_UNIT = 'Zéro colorant · Zéro conservateur · Zéro arôme · 100% Naturel · Sans sucre ajouté · '

/* ── Card produit ── */
function ProductCard({ product, index, reduced }) {
  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-keral group relative flex flex-col"
    >
      <Link
        to={product.route}
        className="absolute inset-0 z-10"
        aria-label={`Découvrir ${product.name}`}
        style={{ touchAction: 'manipulation' }}
      />

      {/* Zone image */}
      <div
        style={{
          height:          '240px',
          backgroundColor: 'var(--bg-tertiary)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          padding:         '24px',
          overflow:        'hidden',
        }}
      >
        <img
          src={product.images.avant}
          alt={`${product.name} KERAL-B`}
          loading="lazy"
          width={160}
          height={200}
          style={{
            objectFit:  'contain',
            height:     '100%',
            width:      'auto',
            transition: 'transform 500ms ease',
            filter:     'drop-shadow(0 12px 24px rgba(0,0,0,0.2))',
          }}
          className="group-hover:scale-105"
        />
      </div>

      {/* Zone texte */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
        {product.badge && (
          <span style={{
            display:         'inline-flex',
            alignSelf:       'flex-start',
            fontSize:        '10px',
            fontWeight:      500,
            letterSpacing:   '0.1em',
            textTransform:   'uppercase',
            color:           'var(--accent-gold)',
            border:          '1px solid var(--accent-gold)',
            borderRadius:    '980px',
            padding:         '2px 8px',
            marginBottom:    '4px',
          }}>
            {product.badge}
          </span>
        )}
        <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          {product.type}
        </p>
        <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', lineHeight: 1.5, flex: 1 }}>
          {product.tagline}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <span className="text-price">{product.price.toLocaleString('fr-FR')} FCFA</span>
          <span
            style={{
              color:      'var(--accent-gold)',
              fontSize:   '16px',
              opacity:    0,
              transform:  'translateX(0)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            className="group-hover:opacity-100 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Home page
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Home() {
  const marqueeRef = useRef(null)
  const reduced    = useReducedMotion() ?? false

  /* GSAP marquee */
  useEffect(() => {
    if (reduced) return
    const track = marqueeRef.current
    if (!track) return
    const tween = gsap.to(track, { x: '-50%', duration: 28, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [reduced])

  const scrollToProduits = (e) => {
    e.preventDefault()
    document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })
  }

  const fm = (props) => reduced ? {} : props

  return (
    <main id="main-content">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          §1 — HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          position:        'relative',
          height:          '100dvh',
          backgroundColor: '#000000',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          overflow:        'hidden',
        }}
        aria-label="Accueil KERAL-B"
      >
        {/* Particules canvas */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <JuiceParticles />
        </div>

        {/* Contenu centré */}
        <div
          style={{
            position:      'relative',
            zIndex:        10,
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            textAlign:     'center',
            padding:       '0 24px',
            maxWidth:      '720px',
            gap:           '24px',
          }}
        >
          {/* Tag pill */}
          <motion.span
            {...fm({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.2 } })}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              fontFamily:      'Inter, sans-serif',
              fontSize:        '11px',
              fontWeight:      500,
              letterSpacing:   '0.2em',
              textTransform:   'uppercase',
              color:           '#C8A96E',
              backgroundColor: 'rgba(200,169,110,0.1)',
              border:          '1px solid rgba(200,169,110,0.2)',
              borderRadius:    '980px',
              padding:         '6px 16px',
            }}
          >
            Cameroun · 100% Naturel
          </motion.span>

          {/* Titre */}
          <div>
            <motion.p
              {...fm({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 } })}
              style={{
                fontFamily:    'Inter, sans-serif',
                fontSize:      'clamp(3rem, 7vw, 6.5rem)',
                fontWeight:    700,
                lineHeight:    1.02,
                letterSpacing: '-0.03em',
                color:         '#FFFFFF',
              }}
            >
              La Nature
            </motion.p>
            <motion.p
              {...fm({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.6 } })}
              style={{
                fontFamily:    'Playfair Display, serif',
                fontStyle:     'italic',
                fontSize:      'clamp(2.8rem, 6.5vw, 6rem)',
                fontWeight:    500,
                lineHeight:    1.05,
                letterSpacing: '-0.02em',
                color:         '#C8A96E',
              }}
            >
              dans Chaque Goutte
            </motion.p>
          </div>

          {/* Sous-titre */}
          <motion.p
            {...fm({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.8 } })}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize:   '1.05rem',
              fontWeight: 400,
              lineHeight: 1.65,
              color:      'rgba(255,255,255,0.6)',
              maxWidth:   '480px',
            }}
          >
            Jus de fruits artisanaux et tisanes premium,<br />
            fabriqués au cœur du Cameroun.
          </motion.p>

          {/* Boutons */}
          <motion.div
            {...fm({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 1.0 } })}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}
          >
            <a
              href="#produits"
              onClick={scrollToProduits}
              className="btn-hero-outline"
              style={{ touchAction: 'manipulation' }}
            >
              Découvrir nos saveurs
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
              style={{ touchAction: 'manipulation' }}
            >
              <WAIcon />
              Commander
            </a>
          </motion.div>

          {/* Indicateur scroll */}
          <motion.div
            {...fm({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.4 } })}
          >
            <ScrollChevron />
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          §2 — BANDEAU OR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        role="region"
        aria-label="Engagements KERAL-B"
        style={{ height: '48px', backgroundColor: '#C8A96E', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <div
          ref={marqueeRef}
          style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              aria-hidden={n === 1 ? 'true' : undefined}
              style={{
                display:       'block',
                fontFamily:    'Inter, sans-serif',
                fontSize:      '11px',
                fontWeight:    500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#000',
                whiteSpace:    'nowrap',
                padding:       '0 2rem',
              }}
            >
              {MARQUEE_UNIT.repeat(5)}
            </span>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          §3 — PRODUITS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="produits"
        className="section-gray"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', scrollMarginTop: '64px' }}
        aria-labelledby="produits-titre"
      >
        <div className="container-keral">
          {/* Header */}
          <motion.div
            {...fm({ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4 } })}
            style={{ marginBottom: '48px' }}
          >
            <p className="text-label" style={{ marginBottom: '12px' }}>Nos Produits</p>
            <h2 id="produits-titre" style={{ fontFamily: 'Inter', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Six Saveurs,{' '}
              <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--accent-gold)' }}>
                Une Promesse.
              </span>
            </h2>
          </motion.div>

          {/* Grille 3 cols desktop */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap:                 '24px',
          }}>
            <style>{`
              @media (min-width: 640px) { #product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (min-width: 1024px) { #product-grid { grid-template-columns: repeat(3, 1fr) !important; } }
            `}</style>
            <div id="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px' }}>
              {PRODUCTS.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} reduced={reduced} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          §4 — VALEURS (Apple features)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="section-white"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
        aria-labelledby="valeurs-titre"
      >
        <div className="container-keral">
          <motion.div
            {...fm({ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4 } })}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 id="valeurs-titre" style={{ fontFamily: 'Inter', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Ce que nous{' '}
              <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--accent-gold)' }}>
                ne mettons jamais.
              </span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            <style>{`@media (min-width: 768px) { #values-grid { grid-template-columns: repeat(4, 1fr) !important; } }`}</style>
            <div id="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.id}
                  {...fm({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4, delay: i * 0.08 } })}
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '12px',
                    padding:       '24px',
                    borderRadius:  'var(--radius-lg)',
                    border:        '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <span style={{ fontSize: '2rem' }} aria-hidden="true">{v.icon}</span>
                  <p style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                    {v.label}
                  </p>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          §5 — ABOUT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="section-gray"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
        aria-labelledby="about-titre"
      >
        <div className="container-keral">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
            <style>{`@media (min-width: 768px) { #about-grid { grid-template-columns: 1.4fr 1fr !important; } }`}</style>
            <div id="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>
              {/* Gauche */}
              <motion.div
                {...fm({ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.4 } })}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <p className="text-label">Notre Histoire</p>
                <h2 id="about-titre" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 500, lineHeight: 1.2, color: 'var(--text-primary)' }}>
                  Chaque goutte porte{' '}
                  <span style={{ color: 'var(--accent-gold)', textDecoration: 'underline', textDecorationColor: 'rgba(200,169,110,0.4)', textUnderlineOffset: '4px' }}>
                    l'âme du Cameroun.
                  </span>
                </h2>
                <p className="text-body" style={{ maxWidth: '440px' }}>
                  Keral-B est née d'une conviction simple&nbsp;: la nature offre le meilleur.
                  Nos fruits sont sélectionnés avec soin au Cameroun, pressés et mis en
                  bouteille sans aucun additif.
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ alignSelf: 'flex-start', touchAction: 'manipulation' }}
                >
                  Commander maintenant
                </a>
              </motion.div>

              {/* Droite — chiffres clés */}
              <motion.div
                {...fm({ initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.4, delay: 0.1 } })}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}
              >
                {[
                  { value: '0',    label: 'Additif'  },
                  { value: '100%', label: 'Naturel'  },
                  { value: '6',    label: 'Saveurs'  },
                  { value: '1L',   label: 'Volume'   },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    style={{
                      padding:         '24px',
                      borderRadius:    'var(--radius-lg)',
                      backgroundColor: 'var(--bg-card)',
                      border:          '1px solid var(--border-subtle)',
                      display:         'flex',
                      flexDirection:   'column',
                      gap:             '4px',
                    }}
                  >
                    <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--accent-gold)', fontWeight: 500, lineHeight: 1 }}>
                      {value}
                    </span>
                    <span className="text-label">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          §6 — CTA FINAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{ backgroundColor: '#000', padding: 'clamp(5rem, 10vw, 10rem) 0', textAlign: 'center' }}
        aria-labelledby="cta-titre"
      >
        <div className="container-keral" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <motion.h2
            id="cta-titre"
            {...fm({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4 } })}
            style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 1.05, color: '#F5F5F7' }}
          >
            Prêt à goûter{' '}
            <span style={{ color: '#C8A96E' }}>la nature&nbsp;?</span>
          </motion.h2>

          <motion.p
            {...fm({ initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, delay: 0.1 } })}
            style={{ fontSize: '1rem', color: 'rgba(245,245,247,0.4)', maxWidth: '340px', lineHeight: 1.7 }}
          >
            Commandez directement via WhatsApp.<br />Livraison à Douala.
          </motion.p>

          <motion.a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            {...fm({ initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4, delay: 0.2 } })}
            className="btn-wa"
            style={{ padding: '18px 48px', fontSize: '1rem', touchAction: 'manipulation' }}
          >
            <WAIcon />
            Commander via WhatsApp
          </motion.a>
        </div>
      </section>

    </main>
  )
}
