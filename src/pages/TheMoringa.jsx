import { motion } from 'framer-motion'
import ProductPage from '../components/ProductPage'

export default function TheMoringa() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
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
        images={[
          '/images/produits/moringa-avant.png',
          '/images/produits/moringa-cote1.png',
          '/images/produits/moringa-cote2.png',
          '/images/produits/moringa-dessus.png',
        ]}
        modelType="carton"
      />
    </motion.div>
  )
}
