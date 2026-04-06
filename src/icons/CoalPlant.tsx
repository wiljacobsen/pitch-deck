export default function CoalPlant({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric power station building */}
      {/* Top face */}
      <path d="M20 16 L34 10 L42 14 L28 20 Z" fill="currentColor" opacity="0.06" />
      <path d="M20 16 L34 10 L42 14 L28 20 Z" />
      {/* Right face */}
      <path d="M42 14 L42 34 L28 40 L28 20 Z" fill="currentColor" opacity="0.10" />
      <path d="M42 14 L42 34 L28 40 L28 20 Z" />
      {/* Left face */}
      <path d="M20 16 L20 36 L28 40 L28 20 Z" fill="currentColor" opacity="0.04" />
      <path d="M20 16 L20 36 L28 40 L28 20 Z" />
      {/* Panel lines on left face */}
      <line x1="20" y1="24" x2="28" y2="28" />
      <line x1="20" y1="30" x2="28" y2="34" />
      {/* Smokestack */}
      <path d="M10 38 L10 12 L16 12 L16 38" />
      <path d="M10 12 L12 10 L18 10 L16 12" fill="currentColor" opacity="0.06" />
      {/* Smoke wisps */}
      <path d="M13 10 C11 6, 15 4, 13 1" strokeWidth="1" opacity="0.4" />
      <path d="M15 9 C14 6, 17 4, 15 2" strokeWidth="1" opacity="0.25" />
      {/* Cooling tower — hyperboloid */}
      <path d="M4 38 L6 24 C7 20, 11 20, 12 24 L14 38" />
      <path d="M6 22 C7.5 20, 10.5 20, 12 22" strokeWidth="1" opacity="0.4" />
      {/* Ground plane */}
      <path d="M2 38 L16 44 L44 38" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}
