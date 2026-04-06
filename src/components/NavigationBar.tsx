import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface NavStep {
  sectionId: string
  label: string
  display: string
  scrollPct?: number // for sub-steps within a scrollable section
}

const STEPS: NavStep[] = [
  { sectionId: 'hero', label: 'Introduction', display: '1' },
  { sectionId: 'value-chain', label: 'Value Chain', display: '2.0', scrollPct: 0.03 },
  { sectionId: 'value-chain', label: 'Energy transition', display: '2.1', scrollPct: 0.16 },
  { sectionId: 'value-chain', label: 'Connecting to grid', display: '2.2', scrollPct: 0.36 },
  { sectionId: 'value-chain', label: 'Digital growth', display: '2.3', scrollPct: 0.54 },
  { sectionId: 'value-chain', label: "Symphony's role", display: '2.4', scrollPct: 0.72 },
  { sectionId: 'products', label: 'Products', display: '3' },
  { sectionId: 'why-we-exist', label: 'Why We Exist', display: '4' },
]

// Menu shows only top-level sections
const MENU_ITEMS = [
  { label: 'Introduction', stepIndex: 0, display: '1' },
  { label: 'Value Chain', stepIndex: 1, display: '2' },
  { label: 'Products', stepIndex: 6, display: '3' },
  { label: 'Why We Exist', stepIndex: 7, display: '4' },
]

interface NavigationBarProps {
  dark: boolean
  onToggleTheme: () => void
}

export default function NavigationBar({ dark, onToggleTheme }: NavigationBarProps) {
  const [current, setCurrent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  // Track current step by scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      // Check value-chain sub-steps
      const vcEl = document.getElementById('value-chain')
      if (vcEl) {
        const vcTop = vcEl.offsetTop
        const vcHeight = vcEl.scrollHeight
        const vcScrollRange = vcHeight - vh

        if (scrollY >= vcTop && scrollY < vcTop + vcHeight - vh * 0.5) {
          const pct = (scrollY - vcTop) / vcScrollRange
          // Find the matching sub-step
          const vcSteps = STEPS.filter((s) => s.sectionId === 'value-chain')
          let bestIdx = 1 // default to 2.0
          for (let i = vcSteps.length - 1; i >= 0; i--) {
            if (pct >= (vcSteps[i].scrollPct! - 0.04)) {
              bestIdx = STEPS.indexOf(vcSteps[i])
              break
            }
          }
          setCurrent(bestIdx)
          return
        }
      }

      // Check other sections
      const scrollCheck = scrollY + vh / 3
      // Check from bottom up
      for (let i = STEPS.length - 1; i >= 0; i--) {
        const step = STEPS[i]
        if (step.scrollPct !== undefined) continue // skip sub-steps, handled above
        const el = document.getElementById(step.sectionId)
        if (el && el.offsetTop <= scrollCheck) {
          setCurrent(i)
          return
        }
      }
      setCurrent(0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((stepIndex: number) => {
    const step = STEPS[stepIndex]
    const el = document.getElementById(step.sectionId)
    if (!el) return

    if (step.scrollPct !== undefined) {
      const sectionHeight = el.scrollHeight
      const scrollRange = sectionHeight - window.innerHeight
      const targetScroll = el.offsetTop + scrollRange * step.scrollPct
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }, [])

  const prev = () => { if (current > 0) scrollTo(current - 1) }
  const next = () => { if (current < STEPS.length - 1) scrollTo(current + 1) }

  // Close menu on scroll
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

  // Which top-level menu item is active
  const activeMenuIndex = MENU_ITEMS.findLastIndex((m) => m.stepIndex <= current)

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
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 3L4.5 7L8.5 11" />
          </svg>
        </button>

        <div className="w-px h-5" style={{ background: divider }} />

        {/* Menu toggle with step indicator */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative h-10 px-3 flex items-center gap-1.5 transition-colors duration-200"
          style={{ color: text }}
          aria-label="Table of contents"
        >
          <span className="text-xs font-semibold tabular-nums min-w-[24px] text-center" style={{ color: textMuted }}>
            {STEPS[current].display}
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d={menuOpen ? "M2 6.5L5 3.5L8 6.5" : "M2 3.5L5 6.5L8 3.5"} />
          </svg>
        </button>

        <div className="w-px h-5" style={{ background: divider }} />

        {/* Next */}
        <button
          onClick={next}
          disabled={current === STEPS.length - 1}
          className="w-10 h-10 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: current === STEPS.length - 1 ? 0.3 : 1, color: text }}
          aria-label="Next"
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
        aria-label="Toggle theme"
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

      {/* Dropdown menu — shows top-level sections only */}
      <AnimatePresence>
        {menuOpen && (
          <>
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
                {MENU_ITEMS.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.stepIndex)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
                    style={{
                      color: i === activeMenuIndex ? '#3B82F6' : text,
                      background: i === activeMenuIndex
                        ? (dark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)')
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (i !== activeMenuIndex) e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
                    }}
                    onMouseLeave={(e) => {
                      if (i !== activeMenuIndex) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                      style={{
                        background: i === activeMenuIndex ? '#3B82F6' : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'),
                        color: i === activeMenuIndex ? '#fff' : textMuted,
                      }}
                    >
                      {item.display}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
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
