import React from 'react'
import { motion } from 'framer-motion'
import Hero3D from '../components/Hero3D'

// Les transitions de page sont gérées par AnimatePresence dans App.jsx
// Ce composant encapsule le contenu de la page Home avec l'animation d'entrée/sortie
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.6, ease: "easeIn" } }
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <Hero3D />
      
      {/* 
        Le reste de la page Home viendra ici plus tard 
        (Section produits, Parallax, etc.) 
      */}
      <div className="h-screen bg-[#0A0A0A] flex flex-col items-center justify-center border-t border-white/5">
        <h2 className="text-4xl font-display font-bold text-white mb-4">L'Excellence du Fruit</h2>
        <p className="text-zinc-400 font-sans max-w-lg text-center">
          La suite de la page d'accueil avec effets parallax arrivera ici...
        </p>
      </div>
    </motion.div>
  )
}
