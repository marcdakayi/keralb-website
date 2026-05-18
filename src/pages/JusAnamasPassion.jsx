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
        imagePath="/images/produits/ananas-passion.jpg"
        modelType="bottle"
      />
    </motion.div>
  )
}
