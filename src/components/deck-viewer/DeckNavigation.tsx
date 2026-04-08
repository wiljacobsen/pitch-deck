'use client'

import { useState, useEffect } from 'react'

interface DeckSlide {
  id: string
  title: string
  componentType: string
}

interface DeckNavigationProps {
  slides: DeckSlide[]
  dark: boolean
  title: string
  clientName: string | null
}

export default function DeckNavigation({ slides, dark, title }: DeckNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    function handleScroll() {
      for (let i = slides.length - 1; i >= 0; i--) {
        const el = document.getElementById(`slide-${i}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveIndex(i)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slides.length])

  function scrollTo(index: number) {
    const el = document.getElementById(`slide-${index}`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2`}>
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          onClick={() => scrollTo(i)}
          className={`group relative flex items-center`}
          title={slide.title}
        >
          <span className={`absolute right-6 whitespace-nowrap text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${dark ? 'bg-navy-light text-white' : 'bg-white text-gray-900 shadow'}`}>
            {slide.title}
          </span>
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-accent scale-125'
                : dark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
