import Hero from './components/Hero'
import ValueChainSection from './components/ValueChain/ValueChainSection'
import ProductsGrid from './components/ProductsGrid'

export default function App() {
  return (
    <main className="bg-navy text-white font-sans">
      <Hero />
      <ValueChainSection />
      <ProductsGrid />
    </main>
  )
}
