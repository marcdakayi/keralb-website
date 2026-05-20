import ProductPage from '../components/ProductPage'
import { PRODUCTS } from '../lib/constants'
export default function Page() {
  return <ProductPage product={PRODUCTS[4]} />
}
