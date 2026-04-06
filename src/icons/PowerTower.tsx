export default function PowerTower({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Lattice tower legs */}
      <line x1="17" y1="44" x2="21.5" y2="12" />
      <line x1="31" y1="44" x2="26.5" y2="12" />
      {/* Horizontal beams */}
      <line x1="18.5" y1="36" x2="29.5" y2="36" />
      <line x1="19.5" y1="28" x2="28.5" y2="28" />
      <line x1="20.5" y1="20" x2="27.5" y2="20" />
      {/* X bracing */}
      <line x1="19" y1="36" x2="28" y2="28" />
      <line x1="29" y1="36" x2="20" y2="28" />
      <line x1="20" y1="28" x2="27" y2="20" />
      <line x1="28" y1="28" x2="21" y2="20" />
      {/* Cross arm — isometric with depth */}
      <line x1="6" y1="12" x2="42" y2="12" />
      <line x1="6" y1="12" x2="8" y2="14" />
      <line x1="42" y1="12" x2="40" y2="14" />
      <line x1="8" y1="14" x2="40" y2="14" />
      {/* Insulator strings */}
      <line x1="10" y1="12" x2="10" y2="6" />
      <circle cx="10" cy="5.5" r="1.2" />
      <line x1="24" y1="12" x2="24" y2="4" />
      <circle cx="24" cy="3.5" r="1.2" />
      <line x1="38" y1="12" x2="38" y2="6" />
      <circle cx="38" cy="5.5" r="1.2" />
      {/* Conductor wires */}
      <path d="M2 5.5 Q6 7.5, 10 5.5" strokeWidth="1" />
      <path d="M2 3.5 Q13 6, 24 3.5" strokeWidth="1" />
      <path d="M46 5.5 Q42 7.5, 38 5.5" strokeWidth="1" />
      {/* Foundation */}
      <path d="M14 44 L17 44" strokeWidth="2.5" opacity="0.3" />
      <path d="M31 44 L34 44" strokeWidth="2.5" opacity="0.3" />
    </svg>
  )
}
