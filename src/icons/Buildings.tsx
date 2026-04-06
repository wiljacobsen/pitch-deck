export default function Buildings({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric building cluster — tall, medium, short */}
      {/* Tall building — left */}
      {/* Top */}
      <path d="M8 8 L18 4 L26 8 L16 12 Z" fill="currentColor" opacity="0.06" />
      <path d="M8 8 L18 4 L26 8 L16 12 Z" />
      {/* Right face */}
      <path d="M26 8 L26 34 L16 38 L16 12 Z" fill="currentColor" opacity="0.10" />
      <path d="M26 8 L26 34 L16 38 L16 12 Z" />
      {/* Left face */}
      <path d="M8 8 L8 34 L16 38 L16 12 Z" fill="currentColor" opacity="0.04" />
      <path d="M8 8 L8 34 L16 38 L16 12 Z" />
      {/* Window grid — right face */}
      <line x1="19" y1="12" x2="19" y2="34" strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="11" x2="22" y2="33" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="14" x2="16" y2="18" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="20" x2="16" y2="24" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="26" x2="16" y2="30" strokeWidth="0.8" opacity="0.3" />
      {/* Roof HVAC unit */}
      <rect x="18" y="5" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.08" />

      {/* Short building — right */}
      {/* Top */}
      <path d="M26 22 L36 18 L44 22 L34 26 Z" fill="currentColor" opacity="0.06" />
      <path d="M26 22 L36 18 L44 22 L34 26 Z" />
      {/* Right face */}
      <path d="M44 22 L44 38 L34 42 L34 26 Z" fill="currentColor" opacity="0.10" />
      <path d="M44 22 L44 38 L34 42 L34 26 Z" />
      {/* Left face */}
      <path d="M26 22 L26 38 L34 42 L34 26 Z" fill="currentColor" opacity="0.04" />
      <path d="M26 22 L26 38 L34 42 L34 26 Z" />
      {/* Window grid — right face */}
      <line x1="37" y1="25" x2="37" y2="38" strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="24" x2="40" y2="37" strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="28" x2="34" y2="32" strokeWidth="0.8" opacity="0.3" />

      {/* Ground plane */}
      <path d="M4 34 L16 40 L34 42 L44 38" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}
