import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SECTIONS = [
  { id: 'hero', label: 'Introduction' },
  { id: 'value-chain', label: 'Value Chain' },
  { id: 'products', label: 'Products' },
  { id: 'why-we-exist', label: 'Why We Exist' },
]

interface NavigationBarProps {
  dark: boolean
  onToggleTheme: () => void
}

export default function NavigationBar({ dark, onToggleTheme }: NavigationBarProps) {
  const [current, setCurrent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  // Track current section by scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= scrollY) {
          setCurrent(i)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = document.getElementById(SECTIONS[index].id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const prev = () => { if (current > 0) scrollTo(current - 1) }
  const next = () => { if (current < SECTIONS.length - 1) scrollTo(current + 1) }

  // Close menu on scroll or click outside
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const bg = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
  const border = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'
  const divider = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const textMuted = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)'
  const text = dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)'

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      {/* Navigation pill */}
      <div
        className="flex items-center h-10 rounded-full border backdrop-blur-md overflow-hidden"
        style={{ background: bg, borderColor: border }}
      >
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: current === 0 ? 0.3 : 1, color: text }}
          aria-label="Previous section"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 3L4.5 7L8.5 11" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: divider }} />

        {/* Menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative h-10 px-3 flex items-center gap-2 transition-colors duration-200"
          style={{ color: text }}
          aria-label="Table of contents"
        >
          <span className="text-xs font-medium tabular-nums" style={{ color: textMuted }}>
            {current + 1}/{SECTIONS.length}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <motion.path
              d="M2.5 4L6 7.5L9.5 4"
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: 'center' }}
            />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: divider }} />

        {/* Next */}
        <button
          onClick={next}
          disabled={current === SECTIONS.length - 1}
          className="w-10 h-10 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: current === SECTIONS.length - 1 ? 0.3 : 1, color: text }}
          aria-label="Next section"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.5 3L9.5 7L5.5 11" />
          </svg>
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        className="w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-colors duration-300"
        style={{ background: bg, borderColor: border, color: text }}
        aria-label="Toggle dark/light mode"
      >
        <motion.div
          initial={false}
          animate={{ rotate: dark ? 0 : 180 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="10" cy="10" r="4" />
              <line x1="10" y1="1" x2="10" y2="3" />
              <line x1="10" y1="17" x2="10" y2="19" />
              <line x1="1" y1="10" x2="3" y2="10" />
              <line x1="17" y1="10" x2="19" y2="10" />
              <line x1="3.5" y1="3.5" x2="5" y2="5" />
              <line x1="15" y1="15" x2="16.5" y2="16.5" />
              <line x1="3.5" y1="16.5" x2="5" y2="15" />
              <line x1="15" y1="5" x2="16.5" y2="3.5" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 12.5A7.5 7.5 0 1 1 7.5 3a5.5 5.5 0 0 0 9.5 9.5z" />
            </svg>
          )}
        </motion.div>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute top-full right-0 mt-2 w-52 rounded-xl border backdrop-blur-xl overflow-hidden"
              style={{
                background: dark ? 'rgba(15,25,50,0.95)' : 'rgba(255,255,255,0.95)',
                borderColor: border,
                boxShadow: dark
                  ? '0 8px 32px rgba(0,0,0,0.5)'
                  : '0 8px 32px rgba(0,0,0,0.12)',
              }}
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <div className="py-1.5">
                {SECTIONS.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(i)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
                    style={{
                      color: i === current ? '#3B82F6' : text,
                      background: i === current
                        ? (dark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)')
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (i !== current) e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
                    }}
                    onMouseLeave={(e) => {
                      if (i !== current) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                      style={{
                        background: i === current ? '#3B82F6' : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'),
                        color: i === current ? '#fff' : textMuted,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
