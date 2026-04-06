export default function GasGenerator({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric gas generator — containerised enclosure */}
      {/* Top face */}
      <path d="M12 14 L28 8 L40 14 L24 20 Z" fill="currentColor" opacity="0.06" />
      <path d="M12 14 L28 8 L40 14 L24 20 Z" />
      {/* Right face */}
      <path d="M40 14 L40 30 L24 36 L24 20 Z" fill="currentColor" opacity="0.10" />
      <path d="M40 14 L40 30 L24 36 L24 20 Z" />
      {/* Left face */}
      <path d="M12 14 L12 30 L24 36 L24 20 Z" fill="currentColor" opacity="0.04" />
      <path d="M12 14 L12 30 L24 36 L24 20 Z" />
      {/* Air intake louvers — left face */}
      <line x1="13" y1="19" x2="23" y2="24" />
      <line x1="13" y1="22" x2="23" y2="27" />
      <line x1="13" y1="25" x2="23" y2="30" />
      {/* Exhaust stack on top */}
      <path d="M32 10 L32 4 L36 4 L36 10" />
      <path d="M32 4 L33 3 L37 3 L36 4" fill="currentColor" opacity="0.06" />
      {/* Exhaust wisps */}
      <path d="M34 3 C33 0, 36 -1, 34 -3" strokeWidth="1" opacity="0.3" />
      {/* Control panel on right face */}
      <rect x="32" y="18" width="4" height="6" rx="0.5" fill="currentColor" opacity="0.06" />
      <line x1="34" y1="18" x2="34" y2="24" strokeWidth="0.8" opacity="0.3" />
      {/* Fuel pipe */}
      <line x1="12" y1="28" x2="6" y2="30" strokeWidth="1" />
      <circle cx="5" cy="30.5" r="1.5" fill="currentColor" opacity="0.08" />
      {/* Ground pad */}
      <path d="M8 30 L24 38 L42 30" strokeWidth="1" opacity="0.25" />
    </svg>
  )
}
