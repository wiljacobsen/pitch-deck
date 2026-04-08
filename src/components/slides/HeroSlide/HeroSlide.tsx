'use client'

import { motion } from 'motion/react'
import SymphonyWaves from './SymphonyWaves'
import type { SlideComponentProps } from '@/types'

export default function HeroSlide({ contentData, dark }: SlideComponentProps) {
  const heading = (contentData.heading as string) || 'Your Integrated HV Infrastructure Partner'
  const subheading = (contentData.subheading as string) || ''
  const clientName = (contentData.clientName as string) || ''
  const logoUrl = (contentData.logoUrl as string) || '/Symphony_Logo_White.png'

  const now = new Date()
  const day = now.getDate()
  const suffix = day === 1 || day === 21 || day === 31 ? 'st'
    : day === 2 || day === 22 ? 'nd'
    : day === 3 || day === 23 ? 'rd'
    : 'th'
  const month = now.toLocaleString('en-GB', { month: 'long' })
  const year = now.getFullYear()
  const dateStr = `${day}${suffix} ${month} ${year}`

  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <SymphonyWaves dark={dark} />
      <div className="relative z-10 text-center px-6 mt-12 md:mt-16">
        <motion.img
          src={logoUrl}
          alt="Symphony"
          className="h-16 md:h-24 mx-auto mb-6 transition-all duration-500"
          style={dark ? {} : { filter: 'brightness(0) saturate(100%) invert(12%) sepia(95%) saturate(4744%) hue-rotate(222deg) brightness(72%) contrast(115%)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.p
          className={`text-lg md:text-2xl font-light tracking-wide transition-colors duration-500 ${dark ? 'text-white/60' : 'text-gray-400'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          {heading}
        </motion.p>
        <motion.div
          className="mt-8 w-16 h-px bg-accent/50 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        >
          {(subheading || clientName) && (
            <p className={`text-sm md:text-base font-semibold tracking-wide ${dark ? 'text-white/80' : 'text-gray-700'}`}>
              {subheading || `Business Overview Prepared for ${clientName}`}
            </p>
          )}
          <p className={`text-xs md:text-sm mt-1.5 font-light ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            {dateStr}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
