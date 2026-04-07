export default function PowerPole({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Wooden pole — slightly tapered */}
      <line x1="23.5" y1="6" x2="24.5" y2="44" strokeWidth="2.5" />
      {/* Crossarm */}
      <line x1="10" y1="10" x2="38" y2="10" strokeWidth="2" />
      {/* Insulators */}
      <line x1="14" y1="10" x2="14" y2="6" />
      <circle cx="14" cy="5.5" r="1.2" />
      <line x1="24" y1="10" x2="24" y2="6" />
      <circle cx="24" cy="5.5" r="1.2" />
      <line x1="34" y1="10" x2="34" y2="6" />
      <circle cx="34" cy="5.5" r="1.2" />
      {/* Conductor wires — drooping catenary */}
      <path d="M4 5.5 Q9 8, 14 5.5" strokeWidth="1" />
      <path d="M14 5.5 Q19 8, 24 5.5" strokeWidth="1" />
      <path d="M24 5.5 Q29 8, 34 5.5" strokeWidth="1" />
      <path d="M34 5.5 Q39 8, 44 5.5" strokeWidth="1" />
      {/* Lower crossarm (smaller) */}
      <line x1="16" y1="16" x2="32" y2="16" strokeWidth="1.5" />
      {/* Distribution transformer barrel */}
      <rect x="28" y="18" width="5" height="8" rx="1.5" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" />
      <line x1="30.5" y1="26" x2="30.5" y2="30" strokeWidth="1" />
      {/* Ground */}
      <path d="M20 44 L28 44" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}
