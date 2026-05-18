import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const PRODUITS = [
  { name: "Pur Jus d'Ananas",  path: '/jus-pur-ananas',      color: 'hover:text-keral-yellow' },
  { name: 'Ananas-Passion',    path: '/jus-ananas-passion',  color: 'hover:text-keral-orange' },
  { name: 'Ananas-Gingembre',  path: '/jus-ananas-gingembre', color: 'hover:text-keral-orange' },
  { name: 'Ananas-Mangue',     path: '/jus-ananas-mangue',   color: 'hover:text-keral-orange' },
  { name: 'Thé Moringa',       path: '/the-moringa',         color: 'hover:text-keral-green' },
  { name: 'TurmeriMove',       path: '/tisane-turmerimove',  color: 'hover:text-keral-orange' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            KERAL<span className="text-keral-orange">-B</span>
          </h2>
          <p className="text-zinc-500 font-sans max-w-sm">
            Authentic Taste — Zero Compromise.
            Purs jus naturels et tisanes fabriqués avec passion au Cameroun.
          </p>
          <p className="mt-4 font-cormorant italic text-keral-yellow text-lg">
            Le goût vrai, sans compromis.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold font-display mb-4 uppercase tracking-wider text-sm">
            Produits
          </h3>
          <ul className="space-y-2 text-zinc-400 font-sans text-sm">
            {PRODUITS.map((p) => (
              <li key={p.path}>
                <Link to={p.path} className={`transition-colors ${p.color}`}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold font-display mb-4 uppercase tracking-wider text-sm">
            Contact
          </h3>
          <ul className="space-y-3 text-zinc-400 font-sans text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-keral-orange flex-shrink-0" />
              Douala, Cameroun
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-keral-orange flex-shrink-0" />
              <a href="mailto:contact@keralb.cm" className="hover:text-white transition-colors">
                contact@keralb.cm
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-keral-orange flex-shrink-0" />
              <a href="tel:+237666783752" className="hover:text-white transition-colors">
                +237 666 783 752
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm font-sans">
        © {new Date().getFullYear()} KERAL-B. Tous droits réservés.
      </div>
    </footer>
  )
}
