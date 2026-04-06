import { useState } from 'react'
import Hero from './components/Hero'
import ValueChainSection from './components/ValueChain/ValueChainSection'
import ProductsGrid from './components/ProductsGrid'
import WhyWeExist from './components/WhyWeExist'
import NavigationBar from './components/NavigationBar'

export default function App() {
  const [dark, setDark] = useState(true)

  return (
    <main className={`font-sans transition-colors duration-500 ${dark ? 'bg-navy text-white' : 'bg-white text-gray-900'}`}>
      <NavigationBar dark={dark} onToggleTheme={() => setDark(!dark)} />
      <div id="hero">
        <Hero dark={dark} />
      </div>
      <div id="value-chain">
        <ValueChainSection dark={dark} />
      </div>
      <div id="products">
        <ProductsGrid dark={dark} />
      </div>
      <div id="why-we-exist">
        <WhyWeExist dark={dark} />
      </div>
    </main>
  )
}
