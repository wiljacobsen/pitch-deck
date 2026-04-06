export default function Transformer({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Transformer body */}
      <rect x="12" y="14" width="24" height="24" rx="2" />
      {/* Top insulators */}
      <line x1="18" y1="8" x2="18" y2="14" />
      <line x1="30" y1="8" x2="30" y2="14" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="30" cy="7" r="2" />
      {/* Coil symbol left */}
      <path d="M18 22 C14 22, 14 26, 18 26 C14 26, 14 30, 18 30" />
      {/* Coil symbol right */}
      <path d="M30 22 C34 22, 34 26, 30 26 C34 26, 34 30, 30 30" />
      {/* Core */}
      <line x1="22" y1="20" x2="22" y2="32" />
      <line x1="26" y1="20" x2="26" y2="32" />
      {/* Base */}
      <line x1="10" y1="38" x2="38" y2="38" />
      {/* Legs */}
      <line x1="16" y1="38" x2="16" y2="44" />
      <line x1="32" y1="38" x2="32" y2="44" />
    </svg>
  )
}
