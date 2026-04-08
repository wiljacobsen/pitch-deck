'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'

export default function ImageBlockSlide({ contentData, dark }: SlideComponentProps) {
  const imageUrl = (contentData.imageUrl as string) || ''
  const caption = (contentData.caption as string) || ''
  const heading = (contentData.heading as string) || ''
  const layout = (contentData.layout as string) || 'full'

  if (layout === 'split') {
    return (
      <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {heading && (
              <h2 className={`text-2xl md:text-4xl font-bold mb-4 tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                {heading}
              </h2>
            )}
            {caption && (
              <p className={`text-base md:text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
                {caption}
              </p>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {imageUrl && (
              <img src={imageUrl} alt={caption || heading || 'Image'} className="w-full rounded-2xl shadow-lg" />
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-5xl w-full mx-auto text-center">
        {heading && (
          <motion.h2
            className={`text-2xl md:text-4xl font-bold mb-8 tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {heading}
          </motion.h2>
        )}
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={caption || heading || 'Image'}
            className="w-full rounded-2xl shadow-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        )}
        {caption && (
          <motion.p
            className={`mt-4 text-sm ${dark ? 'text-white/50' : 'text-gray-500'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {caption}
          </motion.p>
        )}
      </div>
    </section>
  )
}
