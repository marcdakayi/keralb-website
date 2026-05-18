import { motion } from 'framer-motion'
import ProductPage from '../components/ProductPage'

export default function JusAnamasPassion() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
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
        images={[
          '/images/produits/passion-avant.png',
          '/images/produits/passion-arriere1.png',
          '/images/produits/passion-dessus.png',
          '/images/produits/passion-dessous.png',
        ]}
        modelType="bottle"
      />
    </motion.div>
  )
}
