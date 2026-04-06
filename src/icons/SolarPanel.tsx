export default function SolarPanel({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric solar array — tilted panel on structural frame */}
      {/* Panel face (tilted toward viewer) */}
      <path d="M6 12 L24 6 L42 14 L24 20 Z" fill="currentColor" opacity="0.08" />
      <path d="M6 12 L24 6 L42 14 L24 20 Z" />
      {/* Panel grid — horizontal lines */}
      <line x1="10" y1="10.5" x2="38" y2="14.5" />
      <line x1="15" y1="15" x2="33" y2="11" />
      {/* Panel grid — vertical lines */}
      <line x1="15" y1="9" x2="15" y2="16" />
      <line x1="24" y1="6" x2="24" y2="20" />
      <line x1="33" y1="10" x2="33" y2="17" />
      {/* Panel thickness — bottom edge */}
      <path d="M6 12 L6 14 L24 22 L24 20" fill="currentColor" opacity="0.10" />
      <line x1="6" y1="12" x2="6" y2="14" />
      <line x1="6" y1="14" x2="24" y2="22" />
      <line x1="24" y1="20" x2="24" y2="22" />
      <line x1="42" y1="14" x2="42" y2="16" />
      <line x1="42" y1="16" x2="24" y2="22" />
      {/* A-frame support legs */}
      <line x1="14" y1="15" x2="12" y2="38" />
      <line x1="14" y1="15" x2="20" y2="38" />
      <line x1="34" y1="15" x2="28" y2="38" />
      <line x1="34" y1="15" x2="36" y2="38" />
      {/* Cross brace */}
      <line x1="14" y1="30" x2="18" y2="30" />
      <line x1="30" y1="30" x2="34" y2="30" />
      {/* Ground pad */}
      <path d="M8 38 L24 44 L40 38" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}
