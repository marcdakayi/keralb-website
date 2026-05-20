import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, CONTACT, waLink } from '../../lib/constants'
import { useTheme } from '../../context/ThemeContext'

/* ── Icônes thème (SVG inline) ── */
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()
  const lastY    = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      lastY.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Barre principale ── */}
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="navbar"
        role="banner"
      >
        <div className="container-keral h-full flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily:    'Playfair Display, serif',
              fontStyle:     'italic',
              fontSize:      '18px',
              fontWeight:    500,
              color:         'var(--accent-gold)',
              letterSpacing: '-0.01em',
              flexShrink:    0,
            }}
            aria-label="KERAL-B — Accueil"
          >
            KERAL·B
          </Link>

          {/* ── Desktop : liens produits ── */}
          <nav aria-label="Produits" className="hidden lg:flex items-center gap-6">
            {PRODUCTS.map((p) => {
              const active = location.pathname === p.route
              return (
                <Link
                  key={p.id}
                  to={p.route}
                  style={{
                    fontFamily:    'Inter, sans-serif',
                    fontSize:      '13px',
                    fontWeight:    400,
                    color:         active ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition:    'color 0.2s ease',
                    whiteSpace:    'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = active ? 'var(--accent-gold)' : 'var(--text-secondary)' }}
                >
                  {p.nameShort}
                </Link>
              )
            })}
          </nav>

          {/* ── Droite : theme toggle + Commander + burger ── */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            />

            {/* Commander — desktop */}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex btn-secondary items-center gap-2"
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              Commander
            </a>

            {/* Burger mobile */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden flex flex-col justify-center items-center w-11 h-11"
              style={{ touchAction: 'manipulation', gap: '5px' }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span style={{
                display:       'block',
                width:         '20px',
                height:        '1.5px',
                backgroundColor: 'var(--text-primary)',
                transformOrigin: 'center',
                transition:    'transform 0.3s ease, opacity 0.3s ease',
                transform:     menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display:       'block',
                width:         '20px',
                height:        '1.5px',
                backgroundColor: 'var(--text-primary)',
                transformOrigin: 'center',
                transition:    'transform 0.3s ease, opacity 0.3s ease',
                transform:     menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Menu mobile — slide from top ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100dvh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-40 lg:hidden overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-primary)',
              backdropFilter:  'saturate(180%) blur(20px)',
              paddingTop:      '64px',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigation"
          >
            <div className="container-keral py-8 flex flex-col h-full">
              {/* Label */}
              <p className="text-label mb-6">Collection</p>

              {/* Liens produits */}
              <nav aria-label="Menu mobile" className="flex flex-col">
                {PRODUCTS.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Link
                      to={p.route}
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? 0 : -1}
                      style={{
                        display:       'block',
                        fontFamily:    'Playfair Display, serif',
                        fontStyle:     'italic',
                        fontSize:      'clamp(1.6rem, 5vw, 2rem)',
                        fontWeight:    500,
                        color:         location.pathname === p.route ? 'var(--accent-gold)' : 'var(--text-primary)',
                        padding:       '10px 0',
                        borderBottom:  '1px solid var(--border-subtle)',
                        transition:    'color 0.2s ease',
                        textDecoration: 'none',
                      }}
                    >
                      {p.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA bas */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-auto pb-8 flex flex-col gap-3"
              >
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-wa"
                  style={{ justifyContent: 'center' }}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <WhatsAppIcon />
                  Commander sur WhatsApp
                </a>
                <p
                  className="text-center text-caption"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {CONTACT.whatsappDisplay} · {CONTACT.location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
