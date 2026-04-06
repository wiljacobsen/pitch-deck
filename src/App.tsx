import { useState } from 'react'
import Hero from './components/Hero'
import ValueChainSection from './components/ValueChain/ValueChainSection'
import ProductsGrid from './components/ProductsGrid'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [dark, setDark] = useState(true)

  return (
    <main className={`font-sans transition-colors duration-500 ${dark ? 'bg-navy text-white' : 'bg-white text-gray-900'}`}>
      <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
      <Hero dark={dark} />
      <ValueChainSection dark={dark} />
      <ProductsGrid dark={dark} />
    </main>
  )
}
