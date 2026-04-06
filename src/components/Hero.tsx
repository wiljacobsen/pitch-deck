import { motion } from 'motion/react'
import AnimatedGrid from '../ui/AnimatedGrid'
import ScrollIndicator from './ScrollIndicator'

export default function Hero({ dark }: { dark: boolean }) {
  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <AnimatedGrid />

      <div className="relative z-10 text-center px-6">
        <motion.img
          src="/Symphony_Logo_White.png"
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
          Network Connection Infrastructure
        </motion.p>

        <motion.div
          className="mt-8 w-16 h-px bg-accent/50 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        />
      </div>

      <ScrollIndicator dark={dark} />
    </section>
  )
}
