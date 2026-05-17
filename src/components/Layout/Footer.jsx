import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            KERAL<span className="text-keral-yellow">-B</span>
          </h2>
          <p className="text-zinc-500 font-sans max-w-sm">
            Authentic Taste - Zero Compromise. 
            Pur jus naturels et tisanes fabriqués avec passion au Cameroun.
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-bold font-display mb-4 uppercase tracking-wider text-sm">Produits</h3>
          <ul className="space-y-2 text-zinc-400 font-sans text-sm">
            <li><a href="/jus-ananas" className="hover:text-keral-yellow transition-colors">Ananas Nature</a></li>
            <li><a href="/jus-ananas-gingembre" className="hover:text-keral-orange transition-colors">Ananas & Gingembre</a></li>
            <li><a href="/tisane-detox" className="hover:text-keral-green transition-colors">Tisane Détox</a></li>
            <li><a href="/tisane-energie" className="hover:text-keral-orange transition-colors">Thé de Moringa</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold font-display mb-4 uppercase tracking-wider text-sm">Contact</h3>
          <ul className="space-y-2 text-zinc-400 font-sans text-sm">
            <li>Yaoundé, Cameroun</li>
            <li>contact@keral-b.com</li>
            <li>+237 600 000 000</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm font-sans">
        © {new Date().getFullYear()} Keral Beverages. Tous droits réservés.
      </div>
    </footer>
  )
}
