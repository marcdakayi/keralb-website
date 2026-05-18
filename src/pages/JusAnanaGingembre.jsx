import { motion } from 'framer-motion'
import ProductPage from '../components/ProductPage'

export default function JusAnanaGingembre() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <ProductPage
        title="Ananas Gingembre"
        subtitle="KERAL-B"
        tagline="La Force de la Nature"
        ingredientsList="Ananas frais + Gingembre frais"
        bienfaitsList={[
          "Anti-inflammatoire naturel",
          "Boost d'énergie",
          "Système immunitaire renforcé",
          "Digestion optimisée"
        ]}
        colorCode="#FF8C00"
        imagePath="/images/produits/ananas-gingembre.jpg"
        modelType="bottle"
      />
    </motion.div>
  )
}
