import React from 'react'
import ProductPage from '../components/ProductPage'
import { motion } from 'framer-motion'

export default function TheMoringa() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <ProductPage 
        title="Thé Moringa"
        subtitle="KERAL-B"
        tagline="L'Arbre de Vie en Tasse"
        ingredientsList="Feuilles de Moringa séchées"
        bienfaitsList={[
          "Super-aliment No.1", 
          "90+ nutriments essentiels", 
          "Détox profonde", 
          "Énergie durable"
        ]}
        colorCode="#2D7A2D"
        bottleColor="#1a5c1a"
        emissiveColor="#2D7A2D"
        modelType="carton"
      />
    </motion.div>
  )
}
