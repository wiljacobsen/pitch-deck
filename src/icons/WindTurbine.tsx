export default function WindTurbine({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Tapered tubular tower — isometric 3/4 view */}
      <path d="M22 22 L20 42 L28 42 L26 22" />
      <path d="M20 42 L22 44 L30 44 L28 42" fill="currentColor" opacity="0.06" />
      {/* Tower panel lines */}
      <line x1="21" y1="32" x2="27" y2="32" strokeWidth="1" opacity="0.3" />
      {/* Nacelle box */}
      <path d="M20 19 L24 17 L30 19 L26 21 Z" fill="currentColor" opacity="0.06" />
      <path d="M20 19 L20 21 L26 23 L26 21 Z" fill="currentColor" opacity="0.08" />
      <path d="M30 19 L30 21 L26 23 L26 21 Z" fill="currentColor" opacity="0.12" />
      <path d="M20 19 L24 17 L30 19 L26 21 Z" />
      <path d="M20 19 L20 21 L26 23 L26 21" />
      <path d="M30 19 L30 21 L26 23" />
      {/* Hub */}
      <circle cx="24" cy="19" r="1.5" fill="currentColor" opacity="0.3" />
      {/* Blade 1 — up */}
      <path d="M24 17 L23 4 L25.5 4 L24.5 17" strokeWidth="1.2" />
      {/* Blade 2 — bottom right */}
      <path d="M25.5 20 L37 27 L36 24.5 L24.5 19" strokeWidth="1.2" />
      {/* Blade 3 — bottom left */}
      <path d="M22.5 20 L11 27 L12 24.5 L23.5 19" strokeWidth="1.2" />
      {/* Concrete foundation pad */}
      <path d="M16 42 L24 46 L32 42" strokeWidth="1.5" opacity="0.25" />
    </svg>
  )
}
