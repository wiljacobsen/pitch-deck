export default function DataCentre({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric data centre — warehouse-style building */}
      {/* Top face */}
      <path d="M8 14 L24 8 L42 16 L26 22 Z" fill="currentColor" opacity="0.06" />
      <path d="M8 14 L24 8 L42 16 L26 22 Z" />
      {/* Right face */}
      <path d="M42 16 L42 34 L26 40 L26 22 Z" fill="currentColor" opacity="0.10" />
      <path d="M42 16 L42 34 L26 40 L26 22 Z" />
      {/* Left face */}
      <path d="M8 14 L8 32 L26 40 L26 22 Z" fill="currentColor" opacity="0.04" />
      <path d="M8 14 L8 32 L26 40 L26 22 Z" />
      {/* Roof cooling units — small boxes on top */}
      <rect x="16" y="11" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.08" />
      <rect x="22" y="12" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.08" />
      <rect x="30" y="13" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.08" />
      {/* Cable entry on left face */}
      <rect x="10" y="24" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.06" />
      <line x1="12" y1="24" x2="12" y2="29" strokeWidth="0.8" opacity="0.4" />
      {/* Server row indication — right face horizontal lines */}
      <line x1="29" y1="26" x2="39" y2="22" strokeWidth="0.8" opacity="0.3" />
      <line x1="29" y1="30" x2="39" y2="26" strokeWidth="0.8" opacity="0.3" />
      <line x1="29" y1="34" x2="39" y2="30" strokeWidth="0.8" opacity="0.3" />
      {/* Status LEDs on right face */}
      <circle cx="40" cy="20" r="0.8" fill="currentColor" opacity="0.4" />
      <circle cx="40" cy="24" r="0.8" fill="currentColor" opacity="0.4" />
      <circle cx="40" cy="28" r="0.8" fill="currentColor" opacity="0.4" />
      {/* Ground plane */}
      <path d="M4 32 L26 42 L44 34" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}
