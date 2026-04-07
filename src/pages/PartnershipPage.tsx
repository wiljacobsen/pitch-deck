import { useState } from 'react'
import PartnershipConfigurator from '../components/PartnershipConfigurator'

export default function PartnershipPage() {
  const [dark, setDark] = useState(true)

  return (
    <main className={`font-sans min-h-screen transition-colors duration-500 ${dark ? 'bg-navy text-white' : 'bg-white text-gray-900'}`}>
      {/* Simple theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDark(d => !d)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${dark ? 'bg-white/10 text-white/70 hover:bg-white/15' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          {dark ? '☀ Light' : '● Dark'}
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 md:px-6 py-16">
        <PartnershipConfigurator
          defaultTechnology="wind"
          defaultModel="development"
          theme={dark ? 'dark' : 'light'}
          onChange={(config) => console.log('Config changed:', config)}
        />
      </div>
    </main>
  )
}
