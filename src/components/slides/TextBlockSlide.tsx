'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'

export default function TextBlockSlide({ contentData, dark }: SlideComponentProps) {
  const heading = (contentData.heading as string) || ''
  const body = (contentData.body as string) || ''
  const alignment = (contentData.alignment as string) || 'left'

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className={`max-w-3xl w-full mx-auto ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
        {heading && (
          <motion.h2
            className={`text-2xl md:text-4xl font-bold mb-6 tracking-tight transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {heading}
          </motion.h2>
        )}
        {body && (
          <motion.div
            className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${dark ? 'text-white/70' : 'text-gray-600'} whitespace-pre-wrap`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {body}
          </motion.div>
        )}
      </div>
    </section>
  )
}
