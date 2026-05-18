import { motion } from 'framer-motion'
import ProductPage from '../components/ProductPage'

export default function JusAnanasMangue() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <ProductPage
        title="Ananas Mangue"
        subtitle="KERAL-B"
        tagline="Douceur Tropicale"
        ingredientsList="Ananas frais + Mangue fraîche"
        bienfaitsList={[
          "Riche en bêta-carotène",
          "Énergie naturelle",
          "Peau rayonnante",
          "Goût onctueux"
        ]}
        colorCode="#FFA500"
        imagePath="/images/produits/ananas-mangue.jpg"
        modelType="bottle"
      />
    </motion.div>
  )
}
