import { motion } from 'motion/react'
import ScrollIndicator from './ScrollIndicator'
import SymphonyWaves from '../ui/SymphonyWaves'

export default function Hero({ dark }: { dark: boolean }) {
  // Format today's date as "7th April 2026" style
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
      {/* Animated wave background */}
      <SymphonyWaves dark={dark} />

      <div className="relative z-10 text-center px-6 mt-12 md:mt-16">
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
          Powering Australia's Grid Transformation
        </motion.p>

        <motion.div
          className="mt-8 w-16 h-px bg-accent/50 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        />

        {/* Key propositions */}
        <motion.div
          className="mt-10 max-w-xl mx-auto text-left"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        >
          <ul className={`space-y-2.5 text-sm md:text-base ${dark ? 'text-white/70' : 'text-gray-600'}`}>
            <li className="flex gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
              <span>Specialist designer, builder, and owner of high-voltage connection infrastructure</span>
            </li>
            <li className="flex gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
              <span>Enabling the renewable energy and data centre investment pipeline across Australia</span>
            </li>
            <li className="flex gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
              <span>Integrated delivery spanning the full project lifecycle — feasibility through 30-year operations</span>
            </li>
            <li className="flex gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
              <span>Independent, third-party platform de-risking grid connection for developers and investors</span>
            </li>
          </ul>
          <p className={`text-center mt-8 text-xs ${dark ? 'text-white/30' : 'text-gray-400'}`}>
            Business Overview Prepared for Client A &middot; {dateStr}
          </p>
        </motion.div>
      </div>

      <ScrollIndicator dark={dark} />
    </section>
  )
}
