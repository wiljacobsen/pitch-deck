export default function Buildings({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Building 1 - tall left */}
      <rect x="4" y="12" width="12" height="32" rx="1" />
      <rect x="7" y="16" width="3" height="3" rx="0.5" />
      <rect x="7" y="22" width="3" height="3" rx="0.5" />
      <rect x="7" y="28" width="3" height="3" rx="0.5" />
      <rect x="7" y="34" width="3" height="3" rx="0.5" />
      {/* Building 2 - medium center */}
      <rect x="18" y="20" width="12" height="24" rx="1" />
      <rect x="21" y="24" width="3" height="3" rx="0.5" />
      <rect x="21" y="30" width="3" height="3" rx="0.5" />
      <rect x="21" y="36" width="3" height="3" rx="0.5" />
      {/* Building 3 - short right */}
      <rect x="32" y="28" width="12" height="16" rx="1" />
      <rect x="35" y="32" width="3" height="3" rx="0.5" />
      <rect x="35" y="38" width="3" height="3" rx="0.5" />
      {/* Ground */}
      <line x1="2" y1="44" x2="46" y2="44" />
    </svg>
  )
}
