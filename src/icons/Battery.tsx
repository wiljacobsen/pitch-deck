export default function Battery({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric containerised BESS */}
      {/* Top face */}
      <path d="M14 12 L30 6 L42 12 L26 18 Z" fill="currentColor" opacity="0.06" />
      <path d="M14 12 L30 6 L42 12 L26 18 Z" />
      {/* Right face */}
      <path d="M42 12 L42 30 L26 36 L26 18 Z" fill="currentColor" opacity="0.10" />
      <path d="M42 12 L42 30 L26 36 L26 18 Z" />
      {/* Left face */}
      <path d="M14 12 L14 30 L26 36 L26 18 Z" fill="currentColor" opacity="0.04" />
      <path d="M14 12 L14 30 L26 36 L26 18 Z" />
      {/* Ventilation louvers — left face */}
      <line x1="15" y1="17" x2="25" y2="22" />
      <line x1="15" y1="20" x2="25" y2="25" />
      <line x1="15" y1="23" x2="25" y2="28" />
      <line x1="15" y1="26" x2="25" y2="31" />
      {/* Cable entry — right face top */}
      <rect x="34" y="14" width="3" height="4" rx="0.5" fill="currentColor" opacity="0.08" />
      <line x1="35.5" y1="14" x2="35.5" y2="18" />
      {/* Status indicator */}
      <circle cx="39" cy="16" r="1" fill="currentColor" opacity="0.3" />
      {/* Electrical interfaces on right face */}
      <line x1="42" y1="20" x2="44" y2="19" strokeWidth="1" />
      <line x1="42" y1="24" x2="44" y2="23" strokeWidth="1" />
      {/* Concrete pad */}
      <path d="M10 30 L26 38 L44 30" strokeWidth="1" opacity="0.25" />
      {/* Small adjacent cabinet */}
      <path d="M6 26 L10 24 L14 26 L10 28 Z" fill="currentColor" opacity="0.06" />
      <path d="M6 26 L6 30 L10 32 L10 28 Z" />
      <path d="M14 26 L14 30 L10 32 L10 28 Z" fill="currentColor" opacity="0.08" />
    </svg>
  )
}
