export default function DataCentre({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Server rack */}
      <rect x="10" y="4" width="28" height="40" rx="2" />
      {/* Server unit 1 */}
      <rect x="14" y="8" width="20" height="8" rx="1" />
      <circle cx="30" cy="12" r="1.5" fill="#3B82F6" />
      <line x1="17" y1="12" x2="24" y2="12" />
      {/* Server unit 2 */}
      <rect x="14" y="20" width="20" height="8" rx="1" />
      <circle cx="30" cy="24" r="1.5" fill="#3B82F6" />
      <line x1="17" y1="24" x2="24" y2="24" />
      {/* Server unit 3 */}
      <rect x="14" y="32" width="20" height="8" rx="1" />
      <circle cx="30" cy="36" r="1.5" fill="#3B82F6" />
      <line x1="17" y1="36" x2="24" y2="36" />
    </svg>
  )
}
