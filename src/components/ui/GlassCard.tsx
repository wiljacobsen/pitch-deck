'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  highlight?: boolean
  dark?: boolean
}

export default function GlassCard({ children, className = '', highlight = false, dark = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl border backdrop-blur-md p-6 transition-colors duration-500
        ${highlight
          ? 'bg-accent/10 border-accent/30'
          : dark
            ? 'bg-white/5 border-white/10'
            : 'bg-gray-50 border-gray-200'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
