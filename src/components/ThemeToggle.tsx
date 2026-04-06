import { motion } from 'motion/react'

interface ThemeToggleProps {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full border backdrop-blur-md flex items-center justify-center transition-colors duration-300"
      style={{
        background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }}
      aria-label="Toggle dark/light mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 0 : 180 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {dark ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 12.5A7.5 7.5 0 1 1 7.5 3a5.5 5.5 0 0 0 9.5 9.5z" />
          </svg>
        )}
      </motion.div>
    </button>
  )
}
