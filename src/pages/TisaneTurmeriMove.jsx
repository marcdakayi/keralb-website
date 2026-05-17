import React from 'react'
import ProductPage from '../components/ProductPage'
import { motion } from 'framer-motion'

export default function TisaneTurmeriMove() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <ProductPage 
        title="TurmeriMove"
        subtitle="KERAL-B"
        tagline="Bougez, Vivez, Ressentez"
        ingredientsList="Curcuma + Gingembre + Poivre Noir"
        bienfaitsList={[
          "Anti-inflammatoire puissant", 
          "Mobilité articulaire", 
          "Circulation sanguine", 
          "Absorption maximale grâce au poivre noir"
        ]}
        colorCode="#FF6B00"
        bottleColor="#D4AF37"
        emissiveColor="#FF6B00"
        modelType="carton"
      />
    </motion.div>
  )
}
