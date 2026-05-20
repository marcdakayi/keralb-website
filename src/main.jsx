import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.jsx'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Lenis smooth scroll v1.x ── */
const lenis = new Lenis({
  duration:    1.2,
  easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
})

/* Synchronise Lenis avec GSAP ticker (ScrollTrigger) */
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

/* Expose globalement pour usage dans les composants si besoin */
window.__lenis = lenis

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
