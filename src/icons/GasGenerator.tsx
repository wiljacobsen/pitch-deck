export default function GasGenerator({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Cooling tower shape */}
      <path d="M14 44 C14 44, 10 28, 12 20 C14 12, 20 8, 24 8 C28 8, 34 12, 36 20 C38 28, 34 44, 34 44" />
      {/* Inner opening */}
      <path d="M18 14 C20 10, 28 10, 30 14" />
      {/* Smoke stack */}
      <line x1="24" y1="8" x2="24" y2="4" />
      {/* Smoke puffs */}
      <path d="M22 4 C20 1, 24 -1, 26 2" strokeWidth="1" />
      <path d="M20 2 C18 -1, 22 -2, 24 0" strokeWidth="1" />
      {/* Base */}
      <line x1="10" y1="44" x2="38" y2="44" />
      {/* Coal pile */}
      <ellipse cx="24" cy="40" rx="8" ry="3" fill="currentColor" opacity="0.15" />
      {/* Conveyor */}
      <line x1="6" y1="38" x2="16" y2="40" />
      <rect x="3" y="36" width="5" height="4" rx="1" fill="currentColor" opacity="0.15" />
    </svg>
  )
}
