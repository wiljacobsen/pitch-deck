export default function WindTurbine({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Tower */}
      <line x1="24" y1="22" x2="22" y2="44" />
      <line x1="24" y1="22" x2="26" y2="44" />
      {/* Hub */}
      <circle cx="24" cy="20" r="2.5" fill="currentColor" />
      {/* Blade 1 - top */}
      <path d="M24 17.5 C22 10, 23 4, 24 2 C25 4, 26 10, 24 17.5" fill="currentColor" opacity="0.3" />
      {/* Blade 2 - bottom right */}
      <path d="M26 21.5 C32 24, 37 22, 39 21 C37 23, 32 26, 26 21.5" fill="currentColor" opacity="0.3" />
      {/* Blade 3 - bottom left */}
      <path d="M22 21.5 C16 24, 11 22, 9 21 C11 23, 16 26, 22 21.5" fill="currentColor" opacity="0.3" />
      {/* Base */}
      <line x1="18" y1="44" x2="30" y2="44" />
    </svg>
  )
}
