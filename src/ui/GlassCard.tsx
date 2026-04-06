import { motion, type HTMLMotionProps } from 'motion/react'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  highlight?: boolean
}

export default function GlassCard({ children, className = '', highlight = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl border backdrop-blur-md p-6
        ${highlight
          ? 'bg-accent/10 border-accent/30'
          : 'bg-white/5 border-white/10'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
