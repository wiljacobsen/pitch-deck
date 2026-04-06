import { motion } from 'motion/react'
import AnimatedGrid from '../ui/AnimatedGrid'
import ScrollIndicator from './ScrollIndicator'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-navy">
      <AnimatedGrid />

      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Symphony
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-white/60 font-light tracking-wide"
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

      <ScrollIndicator />
    </section>
  )
}
