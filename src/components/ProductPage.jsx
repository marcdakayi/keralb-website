import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { CheckCircle2, Leaf, Shield, Droplets } from 'lucide-react'
import OrderForm from './OrderForm'
import ProductViewer from './ProductViewer'

function Counter({ value, suffix = "" }) {
  const nodeRef = useRef()
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v) + suffix
          }
        }
      })
      return () => controls.stop()
    }
  }, [isInView, value, suffix])

  return <span ref={nodeRef} className="text-5xl font-display font-bold text-white">0{suffix}</span>
}

export default function ProductPage({
  title,
  subtitle,
  tagline,
  ingredientsList,
  bienfaitsList,
  colorCode,
  imagePath,
  zones,
  modelType = 'bottle'
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const yImage      = useTransform(scrollYProgress, [0, 0.5], ["0px", "-80px"])
  const yFloating1  = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"])
  const yFloating2  = useTransform(scrollYProgress, [0, 1], ["0px", "150px"])

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] min-h-screen relative overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Radial glow blob */}
        <motion.div
          style={{ backgroundColor: colorCode, y: yBackground }}
          animate={{ scale: [1, 1.2, 0.9, 1], rotate: [0, 90, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] blur-[120px] rounded-full opacity-10 pointer-events-none"
        />

        <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center px-6 md:px-24">

          {/* Left — text */}
          <div className="w-full md:w-1/2 pt-24 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-zinc-500 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4">
                {subtitle}
              </h2>
              <h1
                className="font-display font-bold text-white leading-none mb-6"
                style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
              >
                {title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              {/* Tagline — Cormorant Garamond italic */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-cormorant italic text-2xl md:text-3xl"
                style={{ color: colorCode }}
              >
                {tagline}
              </motion.p>

              {/* CTA */}
              <motion.a
                href="#commander"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="inline-block mt-10 px-8 py-4 rounded-[50px] font-sans font-semibold text-black text-sm tracking-wider"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B00)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Commander maintenant
              </motion.a>
            </motion.div>
          </div>

          {/* Right — product viewer (image + zoom rotatif sur zones) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 h-[60vh] md:h-[80vh] flex items-center justify-center"
          >
            <motion.div style={{ y: yImage }} className="w-full px-4 md:px-8">
              {imagePath && zones && zones.length > 0 ? (
                <ProductViewer
                  image={imagePath}
                  zones={zones}
                  productColor={colorCode}
                  productName={title}
                />
              ) : (
                <div
                  className="w-48 h-80 mx-auto rounded-3xl opacity-30 flex items-center justify-center text-white/40 text-sm font-sans"
                  style={{ background: `linear-gradient(135deg, ${colorCode}40, ${colorCode}10)`, border: `1px solid ${colorCode}30` }}
                >
                  Image à ajouter
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
        >
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ===== STORY & INGRÉDIENTS ===== */}
      <section className="py-32 px-6 md:px-24 relative z-20 border-t border-white/5">
        <motion.div style={{ y: yFloating1 }} className="absolute right-[10%] top-[20%] opacity-20">
          <Leaf size={120} color={colorCode} />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-8"
          >
            L'Origine du Goût
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#CCCCCC] font-sans leading-relaxed"
          >
            Créé à partir de <span className="text-white font-bold">{ingredientsList}</span>.{' '}
            Nous sélectionnons les meilleures récoltes du Cameroun pour extraire une essence pure, sans aucun compromis sur la qualité.
          </motion.p>
        </div>
      </section>

      {/* ===== BIENFAITS ===== */}
      <section id="commander" className="py-32 px-6 md:px-24 bg-[#111111] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Shield className="w-12 h-12 mb-6" style={{ color: colorCode }} />
              <Counter value={100} suffix="%" />
              <p className="text-[#CCCCCC] font-sans uppercase tracking-widest text-sm mt-4 font-bold">Naturel</p>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Droplets className="w-12 h-12 mb-6" style={{ color: colorCode }} />
              <Counter value={0} />
              <p className="text-[#CCCCCC] font-sans uppercase tracking-widest text-sm mt-4 font-bold">Conservateur</p>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Leaf className="w-12 h-12 mb-6" style={{ color: colorCode }} />
              <Counter value={100} suffix="%" />
              <p className="text-[#CCCCCC] font-sans uppercase tracking-widest text-sm mt-4 font-bold">Bien-être</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {bienfaitsList.map((bienfait, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: colorCode }} />
                <span className="text-white font-sans text-lg">{bienfait}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMANDE ===== */}
      <section className="py-32 px-6 md:px-24 relative z-20">
        <motion.div style={{ y: yFloating2 }} className="absolute left-[5%] bottom-[10%] opacity-10">
          <Droplets size={150} color={colorCode} />
        </motion.div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              L'Expérience<br />KERAL-B
            </h2>
            <p className="text-xl text-[#CCCCCC] font-sans mb-8 max-w-md">
              Faites le choix de la qualité absolue. Commandez maintenant et faites-vous livrer directement chez vous.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <OrderForm productName={title} price={2500} colorCode={colorCode} />
          </div>
        </div>
      </section>
    </div>
  )
}
