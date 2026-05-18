import { motion } from 'framer-motion'
import ProductPage from '../components/ProductPage'

export default function JusPurAnanas() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <ProductPage
        title="Pur Jus d'Ananas"
        subtitle="KERAL-B"
        tagline="100% Pur, 100% Nature"
        ingredientsList="Ananas frais sélectionné"
        bienfaitsList={[
          "Riche en vitamines C",
          "Boost immunitaire",
          "Aide à la digestion",
          "Zéro additif"
        ]}
        colorCode="#FFD700"
        images={[
          '/images/produits/ananas-avant.png',
          '/images/produits/ananas-arriere.png',
        ]}
        modelType="bottle"
      />
    </motion.div>
  )
}
