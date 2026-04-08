'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'

interface StatItem {
  icon: string
  value: string
  label: string
}

export default function StatsBlockSlide({ contentData, dark }: SlideComponentProps) {
  const heading = (contentData.heading as string) || ''
  const stats = (contentData.stats as StatItem[]) || []

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-5xl w-full mx-auto">
        {heading && (
          <motion.h2
            className={`text-2xl md:text-4xl font-bold mb-12 text-center tracking-tight transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {heading}
          </motion.h2>
        )}
        <div className={`grid gap-6 ${stats.length <= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border p-8 text-center ${dark ? 'bg-navy-light border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {stat.icon && <div className="text-3xl mb-3">{stat.icon}</div>}
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${dark ? 'text-accent-light' : 'text-accent'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${dark ? 'text-white/60' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
