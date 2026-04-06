export default function Battery({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Battery body */}
      <rect x="8" y="12" width="32" height="28" rx="3" />
      {/* Terminal */}
      <rect x="18" y="8" width="12" height="4" rx="1" />
      {/* Charge segments */}
      <rect x="13" y="18" width="22" height="5" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="13" y="25" width="22" height="5" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="13" y="32" width="22" height="5" rx="1" fill="currentColor" opacity="0.1" />
      {/* Lightning bolt */}
      <path d="M26 20 L22 27 L26 27 L22 34" strokeWidth="2" />
    </svg>
  )
}
