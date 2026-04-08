interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-navy-light rounded-2xl border border-white/10 transition-all duration-300 hover:shadow-lg hover:border-white/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
