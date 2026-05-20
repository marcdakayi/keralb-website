import { Link } from 'react-router-dom'
import { PRODUCTS, CONTACT } from '../../lib/constants'

export default function Footer() {
  return (
    <footer
      style={{ borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }}
      aria-label="Pied de page KERAL-B"
    >
      <div
        className="container-keral"
        style={{ padding: '64px 0', display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}
      >
        <style>{`@media(min-width:768px){#footer-grid{grid-template-columns:1.6fr 1fr 1fr!important}}`}</style>
        <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>

          {/* Col 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '20px', fontWeight: 500, color: 'var(--accent-gold)', textDecoration: 'none', width: 'fit-content' }}>
              KERAL·B
            </Link>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              La Nature dans Chaque Goutte
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
              © {new Date().getFullYear()} Keral-B · Douala, Cameroun
            </p>
          </div>

          {/* Col 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              Nos Produits
            </p>
            <nav aria-label="Liens produits footer">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRODUCTS.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={p.route}
                      style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              Contact
            </p>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { href: `tel:${CONTACT.whatsapp}`, label: CONTACT.whatsappDisplay },
                { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  {label}
                </a>
              ))}
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                Fabriqué au Cameroun / CEMAC
              </p>
            </address>
          </div>

        </div>
      </div>
    </footer>
  )
}
