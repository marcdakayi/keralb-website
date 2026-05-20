import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { waLink, getAdjacentProducts } from '../lib/constants'

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function VideoWithFallback({ src, style, accentColor }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div style={{ ...style, background: `linear-gradient(135deg, #0A0A0A 0%, ${accentColor}22 50%, #0A0A0A 100%)` }} />
    )
  }
  return (
    <video src={src} autoPlay muted loop playsInline style={style} onError={() => setFailed(true)} />
  )
}

export default function ProductPage({ product }) {
  const { prev, next } = getAdjacentProducts(product.slug)

  return (
    <main id="main-content">

      {/* §1 — HERO PRODUIT */}
      <section style={{ position: 'relative', height: '100dvh', overflow: 'hidden', backgroundColor: '#000' }} aria-label={product.name}>

        {/* Vidéo fond */}
        <div className="video-bg-container">
          <VideoWithFallback src={product.videoHero} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} accentColor={product.accentColor} />
          <div className="video-overlay" />
        </div>

        {/* Bouteille flottante */}
        <div style={{ position: 'absolute', right: 'clamp(5%, 10%, 15%)', bottom: 0, height: '70vh', zIndex: 5 }} aria-hidden="true">
          <img
            src={product.images.avant}
            alt=""
            className="bottle-float"
            style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5))' }}
          />
        </div>

        {/* Contenu bas-gauche */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: '40%', zIndex: 10, padding: 'clamp(32px, 5vw, 48px)' }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', marginBottom: '20px' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link>
            {' / '}
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{product.name}</span>
          </p>

          {/* Badge type */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: product.accentColor, backgroundColor: `${product.accentColor}20`, border: `1px solid ${product.accentColor}40`, borderRadius: '980px', padding: '3px 10px' }}>
              {product.type} · {product.volume}
            </span>
            {product.badge && (
              <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.4)', borderRadius: '980px', padding: '3px 10px' }}>
                {product.badge}
              </span>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: 'Inter', fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em', color: '#FFF', marginBottom: '8px' }}
          >
            {product.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.15rem', color: '#C8A96E', marginBottom: '24px' }}
          >
            {product.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: '1.6rem', fontWeight: 700, color: '#C8A96E', letterSpacing: '-0.02em' }}>
              {product.price.toLocaleString('fr-FR')} FCFA
            </span>
            <a href={waLink(product.name)} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ touchAction: 'manipulation' }}>
              <WAIcon /> Commander
            </a>
          </motion.div>
        </div>
      </section>

      {/* §2 — INGRÉDIENTS + BIENFAITS */}
      <section className="section-gray" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }} aria-labelledby="ingredients-titre">
        <div className="container-keral">
          <div id="ing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
            <style>{`@media(min-width:768px){#ing-grid{grid-template-columns:1fr 1fr!important}}`}</style>

            <div>
              <p className="text-label" style={{ marginBottom: '16px' }}>Ingrédients</p>
              <h2 id="ingredients-titre" style={{ fontFamily: 'Inter', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '24px' }}>
                Ce qu'il y a dans votre bouteille.
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.ingredients.map((ing) => (
                  <span key={ing.name} style={{ fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-gold)', backgroundColor: 'rgba(200,169,110,0.08)', border: '1.5px solid rgba(200,169,110,0.2)', borderRadius: '980px', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {ing.name}
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 400 }}>— {ing.origin}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-label" style={{ marginBottom: '16px' }}>Bienfaits</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {product.benefits.map((b) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '1px' }}><CheckIcon /></span>
                    <span style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §3 — VIDÉOS LIFESTYLE */}
      <section className="section-white" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
        <div className="container-keral">
          <p className="text-label" style={{ marginBottom: '12px' }}>En images</p>
          <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '32px' }}>
            Dans votre quotidien.
          </h2>
          <div id="lifestyle-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <style>{`@media(min-width:640px){#lifestyle-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
            {[product.videoLifestyle1, product.videoLifestyle2].map((src, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '9/16', maxHeight: '520px' }}>
                  <VideoWithFallback src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} accentColor={product.accentColor} />
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  {i === 0 ? 'Style de vie — naturel au quotidien' : 'Bien-être — vitalité et fraîcheur'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §4 — CTA PRODUIT */}
      <section className="section-gray" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', textAlign: 'center' }}>
        <div className="container-keral" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--text-primary)' }}>
            Envie d'en profiter&nbsp;?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.65 }}>
            Commandez votre <strong>{product.name}</strong> directement via WhatsApp.
          </p>
          <a href={waLink(product.name)} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ padding: '18px 44px', touchAction: 'manipulation' }}>
            <WAIcon /> Commander — {product.price.toLocaleString('fr-FR')} FCFA
          </a>
        </div>
      </section>

      {/* §5 — NAVIGATION PRODUITS */}
      <nav aria-label="Produit précédent / suivant" style={{ borderTop: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {[
          { product: prev, label: '← Précédent', align: 'left' },
          { product: next, label: 'Suivant →',   align: 'right' },
        ].map(({ product: p, label, align }, i) => (
          <Link
            key={p.id}
            to={p.route}
            style={{ padding: 'clamp(20px, 4vw, 32px) clamp(20px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: align, textDecoration: 'none', borderRight: i === 0 ? '1px solid var(--border-subtle)' : 'none', transition: 'background-color 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <span style={{ fontSize: '11px', fontFamily: 'Inter', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{label}</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{p.name}</span>
          </Link>
        ))}
      </nav>

    </main>
  )
}
