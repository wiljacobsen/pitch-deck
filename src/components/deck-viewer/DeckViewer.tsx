'use client'

import { useState } from 'react'
import DeckNavigation from './DeckNavigation'
import DeckThemeToggle from './DeckThemeToggle'
import { slideRegistry } from '@/lib/slide-registry'

interface DeckSlide {
  id: string
  componentType: string
  contentData: Record<string, unknown>
  title: string
}

interface DeckViewerProps {
  title: string
  clientName: string | null
  slides: DeckSlide[]
}

export default function DeckViewer({ title, clientName, slides }: DeckViewerProps) {
  const [dark, setDark] = useState(true)

  return (
    <main className={`font-sans transition-colors duration-500 ${dark ? 'bg-navy text-white' : 'bg-white text-gray-900'}`}>
      <DeckNavigation
        slides={slides}
        dark={dark}
        title={title}
        clientName={clientName}
      />
      <DeckThemeToggle dark={dark} onToggle={() => setDark(!dark)} />

      {slides.map((slide, i) => {
        const entry = slideRegistry[slide.componentType]
        if (!entry) {
          return (
            <section key={slide.id} id={`slide-${i}`} className="min-h-screen flex items-center justify-center">
              <p className="text-gray-500">Unknown slide type: {slide.componentType}</p>
            </section>
          )
        }
        const Component = entry.component
        return (
          <div key={slide.id} id={`slide-${i}`}>
            <Component contentData={slide.contentData} dark={dark} />
          </div>
        )
      })}
    </main>
  )
}
