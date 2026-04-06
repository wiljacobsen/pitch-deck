import { motion } from 'motion/react'

export default function ScrollIndicator({ dark = true }: { dark?: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className={`text-xs tracking-widest uppercase ${dark ? 'text-white/40' : 'text-gray-400'}`}>Scroll</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={dark ? 'text-white/40' : 'text-gray-400'}>
        <path d="M4 7 L10 13 L16 7" />
      </svg>
    </motion.div>
  )
}
