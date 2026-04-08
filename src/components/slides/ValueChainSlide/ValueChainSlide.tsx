'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useMotionValue, animate } from 'motion/react'
import ValueChainCanvas from './ValueChainCanvas'
import type { SlideComponentProps } from '@/types'

const TOTAL_STEPS = 5
const STEP_POSITIONS = [0.0, 0.2, 0.4, 0.6, 0.9]

export default function ValueChainSlide({ contentData, dark }: SlideComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const scrollYProgress = useMotionValue(0)
  const isAnimating = useRef(false)

  const goToStep = useCallback((step: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_STEPS - 1, step))
    if (clamped === currentStep && isAnimating.current) return
    setCurrentStep(clamped)
    isAnimating.current = true
    animate(scrollYProgress, STEP_POSITIONS[clamped], {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => { isAnimating.current = false },
    })
  }, [currentStep, scrollYProgress])

  // Wheel handler: block during animation, single scroll advances one step
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault()
        return
      }

      const dir = e.deltaY > 0 ? 1 : -1
      const nextStep = currentStep + dir

      // Let page scroll naturally past boundaries
      if (nextStep < 0 || nextStep >= TOTAL_STEPS) return

      e.preventDefault()
      goToStep(nextStep)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [currentStep, goToStep])

  // Keyboard support
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleKey = (e: KeyboardEvent) => {
      const rect = el.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentStep < TOTAL_STEPS - 1) {
          e.preventDefault()
          goToStep(currentStep + 1)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentStep > 0) {
          e.preventDefault()
          goToStep(currentStep - 1)
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentStep, goToStep])

  // Expose goToStep for external navigation
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    ;(el as HTMLElement & { __goToStep?: (s: number) => void }).__goToStep = goToStep
  }, [goToStep])

  // IntersectionObserver: fade in on viewport entry, reset to step 0
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (entry.boundingClientRect.top > 0) {
            setCurrentStep(0)
            scrollYProgress.set(0)
          }
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [scrollYProgress])

  return (
    <div
      id="value-chain"
      ref={containerRef}
      className={`relative h-screen transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-gray-50'}`}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}
      data-value-chain-step={currentStep}
    >
      <ValueChainCanvas scrollYProgress={scrollYProgress} dark={dark} currentStep={currentStep} />

      {/* Step indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {STEP_POSITIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goToStep(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentStep
                ? 'bg-accent scale-125'
                : dark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Step 1.${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
