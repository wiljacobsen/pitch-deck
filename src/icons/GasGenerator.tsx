export default function GasGenerator({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Turbine housing */}
      <rect x="10" y="16" width="28" height="20" rx="3" />
      {/* Intake */}
      <path d="M10 22 L4 18 L4 30 L10 26" />
      {/* Exhaust */}
      <path d="M38 22 L44 18 L44 30 L38 26" />
      {/* Turbine blades inside */}
      <circle cx="24" cy="26" r="6" />
      <path d="M24 20 C20 23, 20 29, 24 32" />
      <path d="M24 20 C28 23, 28 29, 24 32" />
      {/* Shaft */}
      <line x1="24" y1="36" x2="24" y2="42" />
      {/* Generator */}
      <rect x="20" y="42" width="8" height="4" rx="1" />
      {/* Flame indicators */}
      <path d="M14 10 C14 6, 18 6, 18 10" strokeWidth="1" />
      <path d="M22 8 C22 4, 26 4, 26 8" strokeWidth="1" />
      <path d="M30 10 C30 6, 34 6, 34 10" strokeWidth="1" />
    </svg>
  )
}
