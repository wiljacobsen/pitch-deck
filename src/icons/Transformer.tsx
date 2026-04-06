export default function Transformer({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Isometric transformer tank */}
      {/* Top face */}
      <path d="M24 10 L37 17 L24 24 L11 17 Z" fill="currentColor" opacity="0.06" />
      <path d="M24 10 L37 17 L24 24 L11 17 Z" />
      {/* Right face */}
      <path d="M37 17 L37 33 L24 40 L24 24 Z" fill="currentColor" opacity="0.10" />
      <path d="M37 17 L37 33 L24 40 L24 24 Z" />
      {/* Left face */}
      <path d="M11 17 L11 33 L24 40 L24 24 Z" fill="currentColor" opacity="0.04" />
      <path d="M11 17 L11 33 L24 40 L24 24 Z" />
      {/* Bushing insulators */}
      <line x1="19" y1="15" x2="19" y2="8" />
      <ellipse cx="19" cy="7" rx="1.5" ry="1" />
      <ellipse cx="19" cy="9.5" rx="2" ry="0.8" />
      <line x1="29" y1="15" x2="29" y2="8" />
      <ellipse cx="29" cy="7" rx="1.5" ry="1" />
      <ellipse cx="29" cy="9.5" rx="2" ry="0.8" />
      {/* Radiator fins — right face */}
      <line x1="35" y1="21" x2="35" y2="29" />
      <line x1="33" y1="22.5" x2="33" y2="30.5" />
      <line x1="31" y1="24" x2="31" y2="32" />
      {/* Core coil on left face */}
      <path d="M16 25 C13.5 25, 13.5 28, 16 28 C13.5 28, 13.5 31, 16 31" />
    </svg>
  )
}
