export default function CoalPlant({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Smokestack */}
      <rect x="10" y="8" width="6" height="28" rx="1" />
      {/* Smoke */}
      <path d="M13 8 C11 4, 15 2, 13 -1" strokeWidth="1.2" opacity="0.5" />
      <path d="M11 6 C9 3, 12 1, 10 -1" strokeWidth="1" opacity="0.3" />
      {/* Building body */}
      <rect x="18" y="20" width="22" height="16" rx="1" />
      {/* Roof */}
      <path d="M18 20 L29 12 L40 20" />
      {/* Windows */}
      <rect x="22" y="24" width="4" height="4" rx="0.5" />
      <rect x="30" y="24" width="4" height="4" rx="0.5" />
      {/* Door */}
      <rect x="26" y="30" width="5" height="6" rx="0.5" />
      {/* Ground */}
      <line x1="6" y1="36" x2="44" y2="36" />
      {/* Cooling tower */}
      <path d="M38 36 L36 18 C36 16, 40 16, 40 18 L42 36" fill="none" />
      {/* Base platform */}
      <line x1="6" y1="44" x2="44" y2="44" />
      <line x1="10" y1="36" x2="10" y2="44" />
      <line x1="40" y1="36" x2="40" y2="44" />
    </svg>
  )
}
