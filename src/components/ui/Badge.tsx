const colorMap: Record<string, string> = {
  Introduction: 'bg-accent/10 text-accent',
  'Value Chain': 'bg-cat-gen/10 text-cat-gen',
  Products: 'bg-cat-conn/10 text-cat-conn',
  Partnerships: 'bg-sym-blue/20 text-sym-blue-light',
  Team: 'bg-cat-load/10 text-cat-load',
  Company: 'bg-cat-network/10 text-cat-network',
  Custom: 'bg-white/10 text-gray-300',
  ADMIN: 'bg-accent/10 text-accent',
  VIEWER: 'bg-cat-load/10 text-cat-load',
  Published: 'bg-cat-load/10 text-cat-load',
  Draft: 'bg-white/10 text-gray-400',
}

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className = '' }: BadgeProps) {
  const colors = colorMap[label] || 'bg-white/10 text-gray-300'
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${colors} ${className}`}
    >
      {label}
    </span>
  )
}
