export default function SolarPanel({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Panel frame - tilted */}
      <rect x="6" y="10" width="36" height="24" rx="2" transform="rotate(-5 24 22)" />
      {/* Grid lines horizontal */}
      <line x1="7" y1="18" x2="41" y2="16" />
      <line x1="8" y1="26" x2="42" y2="24" />
      {/* Grid lines vertical */}
      <line x1="15" y1="9" x2="14" y2="33" />
      <line x1="24" y1="8.5" x2="24" y2="32.5" />
      <line x1="33" y1="8" x2="34" y2="32" />
      {/* Stand */}
      <line x1="24" y1="34" x2="24" y2="44" />
      <line x1="18" y1="44" x2="30" y2="44" />
    </svg>
  )
}
