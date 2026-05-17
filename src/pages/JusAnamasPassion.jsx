import React from 'react'
import ProductPage from '../components/ProductPage'
import { motion } from 'framer-motion'

export default function JusAnamasPassion() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <ProductPage 
        title="Ananas Passion"
        subtitle="KERAL-B"
        tagline="L'Explosion Tropicale"
        ingredientsList="Ananas frais + Fruit de la passion"
        bienfaitsList={[
          "Antioxydants puissants", 
          "Éclat de la peau", 
          "Saveur exotique unique", 
          "100% naturel"
        ]}
        colorCode="#FF6B00"
        bottleColor="#FF8C00"
        emissiveColor="#FF4500"
        modelType="bottle"
      />
    </motion.div>
  )
}
