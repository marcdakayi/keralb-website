import { motion } from 'framer-motion'
import ProductPage from '../components/ProductPage'

export default function TisaneTurmeriMove() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <ProductPage
        title="TurmeriMove"
        subtitle="KERAL-B"
        tagline="Bougez, Vivez, Ressentez"
        ingredientsList="Curcuma + Gingembre + Poivre Noir de Penja"
        bienfaitsList={[
          "Anti-inflammatoire puissant",
          "Mobilité articulaire",
          "Circulation sanguine",
          "Absorption maximale grâce au poivre noir"
        ]}
        colorCode="#FF6B35"
        images={[
          '/images/produits/turmerimove-avant.png',
          '/images/produits/turmerimove-cote1.png',
          '/images/produits/turmerimove-arriere.png',
          '/images/produits/turmerimove-dessus.png',
        ]}
        modelType="carton"
      />
    </motion.div>
  )
}
