import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Pur Ananas', path: '/jus-pur-ananas' },
    { name: 'Gingembre', path: '/jus-ananas-gingembre' },
    { name: 'Passion', path: '/jus-ananas-passion' },
    { name: 'Mangue', path: '/jus-ananas-mangue' },
    { name: 'Moringa', path: '/the-moringa' },
    { name: 'TurmeriMove', path: '/tisane-turmerimove' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-bold font-display tracking-tighter text-white hover:opacity-80 transition-opacity flex items-center gap-0"
          >
            KERAL<span className="text-keral-orange">-B</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-sans font-medium pb-0.5 border-b-2 transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white border-keral-orange'
                    : 'text-white/60 border-transparent hover:text-white hover:border-keral-orange/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white hover:text-keral-yellow transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-keral-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col justify-center items-center">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-display font-bold transition-colors ${
                  isActive(link.path)
                    ? 'text-keral-orange'
                    : 'text-white hover:text-keral-orange'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
