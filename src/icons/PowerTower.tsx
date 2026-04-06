export default function PowerTower({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Tower legs */}
      <line x1="16" y1="44" x2="21" y2="10" />
      <line x1="32" y1="44" x2="27" y2="10" />
      {/* Cross beams */}
      <line x1="18" y1="34" x2="30" y2="34" />
      <line x1="19" y1="26" x2="29" y2="26" />
      <line x1="20" y1="18" x2="28" y2="18" />
      {/* X braces */}
      <line x1="18.5" y1="34" x2="29" y2="26" />
      <line x1="29.5" y1="34" x2="19" y2="26" />
      {/* Top cross arm */}
      <line x1="8" y1="10" x2="40" y2="10" />
      {/* Insulators */}
      <line x1="10" y1="10" x2="10" y2="6" />
      <line x1="24" y1="10" x2="24" y2="4" />
      <line x1="38" y1="10" x2="38" y2="6" />
      {/* Wires */}
      <path d="M2 6 Q10 8, 10 6" strokeWidth="1" />
      <path d="M2 4 Q13 6, 24 4" strokeWidth="1" />
      <path d="M46 6 Q38 8, 38 6" strokeWidth="1" />
    </svg>
  )
}
