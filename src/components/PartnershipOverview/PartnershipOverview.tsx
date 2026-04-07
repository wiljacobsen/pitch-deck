import { motion } from 'motion/react'
import { OVERVIEW_PHASES, PARTNERSHIP_ZONES } from './data'
import type { OverviewPhase } from './data'

// ── Inline SVG phase icons (20×20, currentColor) ────────────────────

function PhaseIcon({ id, className = '' }: { id: string; className?: string }) {
  const cn = `w-5 h-5 ${className}`
  switch (id) {
    case 'search':
      return (
        <svg className={cn} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M12.5 12.5 17 17" />
          <path d="M6 8.5h5M8.5 6v5" />
        </svg>
      )
    case 'pencil':
      return (
        <svg className={cn} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.5 3.5l3 3L6 17H3v-3L13.5 3.5z" />
          <path d="M11 6l3 3" />
        </svg>
      )
    case 'grid':
      return (
        <svg className={cn} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="12" y="2" width="6" height="6" rx="1" />
          <rect x="2" y="12" width="6" height="6" rx="1" />
          <rect x="12" y="12" width="6" height="6" rx="1" />
          <path d="M8 5h4M8 15h4M5 8v4M15 8v4" />
        </svg>
      )
    case 'blueprint':
      return (
        <svg className={cn} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="16" height="14" rx="1.5" />
          <path d="M5 7h10M5 10h6M5 13h8" />
          <path d="M14 10v5" />
          <path d="M14 10h3" />
        </svg>
      )
    case 'crane':
      return (
        <svg className={cn} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18V4l8-2v4" />
          <path d="M6 4l8 2" />
          <path d="M14 6v6" />
          <path d="M12 12h4" />
          <path d="M14 12v3" />
          <rect x="12.5" y="15" width="3" height="2" rx="0.5" />
          <path d="M4 18h4" />
        </svg>
      )
    case 'wrench':
      return (
        <svg className={cn} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2.5a4 4 0 0 0-5.28 4.74L3.5 13l-.5 4 4-.5 5.76-5.72a4 4 0 0 0 4.74-5.28l-2.5 2.5-2-2 2.5-2.5z" />
        </svg>
      )
    default:
      return null
  }
}

// ── Dollar/investment icon ───────────────────────────────────────────

function InvestmentIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x="8" y="11.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">$</text>
    </svg>
  )
}

// ── Arrow connector between phase boxes ──────────────────────────────

function ArrowConnector({ dark }: { dark: boolean }) {
  return (
    <div className="flex items-center justify-center shrink-0 w-5">
      <svg className={`w-4 h-4 ${dark ? 'text-white/30' : 'text-gray-400'}`} viewBox="0 0 16 16" fill="currentColor">
        <path d="M6 3l5 5-5 5V3z" />
      </svg>
    </div>
  )
}

// ── Phase box ────────────────────────────────────────────────────────

function PhaseBox({ phase, index, dark }: { phase: OverviewPhase; index: number; dark: boolean }) {
  const lines = phase.label.split('\n')
  return (
    <motion.div
      className={`
        flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center min-w-[110px]
        ${dark
          ? 'bg-white/[0.04] border-white/10 text-white/80'
          : 'bg-white border-gray-200 text-gray-700 shadow-sm'
        }
      `}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
    >
      <div className={`p-1.5 rounded-md ${dark ? 'bg-sym-blue/20 text-sym-blue-light' : 'bg-sym-blue-light text-sym-blue'}`}>
        <PhaseIcon id={phase.iconId} />
      </div>
      <div className="text-[10px] md:text-[11px] font-semibold leading-tight">
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────────

export default function PartnershipOverview({ dark }: { dark: boolean }) {
  // Zone background opacity levels (increasing depth)
  const zoneOpacities = [0.06, 0.12, 0.20]
  const zoneOpacitiesLight = [0.04, 0.08, 0.14]

  return (
    <section
      className={`relative flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Partnership models
          </h2>
          <p className={`text-sm md:text-base transition-colors duration-500 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            Three ways to engage across the project lifecycle
          </p>
        </motion.div>

        {/* Scrollable graphic on mobile */}
        <div className="overflow-x-auto -mx-6 px-6">
          <div className="min-w-[800px]">
            {/* Main graphic container — relative for zone backgrounds */}
            <div className="relative">

              {/* ── Zone backgrounds (absolutely positioned) ─────── */}
              {PARTNERSHIP_ZONES.map((zone, zi) => {
                // Convert 1-based col to percentage positions
                const leftPct = ((zone.startCol - 1) / 6) * 100
                const widthPct = ((zone.endCol - zone.startCol + 1) / 6) * 100
                const opacity = dark ? zoneOpacities[zi] : zoneOpacitiesLight[zi]

                return (
                  <motion.div
                    key={zone.id}
                    className="absolute rounded-xl border"
                    style={{
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      top: 0,
                      bottom: 0,
                      backgroundColor: `rgba(24, 95, 165, ${opacity})`,
                      borderColor: dark ? 'rgba(24, 95, 165, 0.2)' : 'rgba(24, 95, 165, 0.15)',
                      zIndex: zi,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: zi * 0.15 }}
                  />
                )
              })}

              {/* ── Content (above zone backgrounds) ─────────────── */}
              <div className="relative z-10 py-6">

                {/* Zone title labels row */}
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {PARTNERSHIP_ZONES.map((zone, zi) => (
                    <motion.div
                      key={zone.id}
                      className="col-span-1"
                      style={{
                        gridColumn: `${zone.startCol} / ${zone.startCol + 1}`,
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: zi * 0.15 }}
                    >
                      <h3 className={`text-sm md:text-base font-bold px-3 ${
                        dark ? 'text-white/90' : 'text-sym-blue-dark'
                      }`}>
                        {zone.label}
                      </h3>
                    </motion.div>
                  ))}
                </div>

                {/* Investment & Risk Management bar (spans delivery + operations = cols 4-6) */}
                <motion.div
                  className="grid grid-cols-6 gap-2 mb-4"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ transformOrigin: 'left' }}
                >
                  <div
                    className={`col-start-4 col-span-3 flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                      dark
                        ? 'bg-sym-blue/15 border-sym-blue/25 text-sym-blue-light'
                        : 'bg-sym-blue-light border-sym-blue/20 text-sym-blue-dark'
                    }`}
                  >
                    <InvestmentIcon />
                    Investment &amp; Risk Management
                  </div>
                </motion.div>

                {/* Phase step boxes row */}
                <div className="flex items-center gap-0.5 mb-6">
                  {OVERVIEW_PHASES.map((phase, i) => (
                    <div key={phase.id} className="contents">
                      {i > 0 && <ArrowConnector dark={dark} />}
                      <div className="flex-1">
                        <PhaseBox phase={phase} index={i} dark={dark} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description bullets — 3 columns aligned to zone widths */}
                <div className="grid grid-cols-6 gap-2 mt-6">
                  {PARTNERSHIP_ZONES.map((zone, zi) => {
                    const span = zone.endCol - zone.startCol + 1
                    return (
                      <motion.div
                        key={zone.id}
                        style={{
                          gridColumn: `${zone.startCol} / ${zone.endCol + 1}`,
                        }}
                        className={`px-3 text-[11px] md:text-xs leading-relaxed ${
                          dark ? 'text-white/60' : 'text-gray-600'
                        }`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 + zi * 0.1 }}
                      >
                        <ul className={`space-y-1.5 list-disc ${span > 1 ? 'pl-4' : 'pl-3'}`}>
                          {zone.bullets.map((bullet, bi) => (
                            <li key={bi}>{bullet}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Invest opportunity badges */}
                <div className="grid grid-cols-6 gap-2 mt-6">
                  {PARTNERSHIP_ZONES.map((zone, zi) => (
                    <motion.div
                      key={zone.id}
                      style={{
                        gridColumn: `${zone.startCol} / ${zone.startCol + 1}`,
                      }}
                      className="px-3"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.8 + zi * 0.1 }}
                    >
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] md:text-xs font-bold bg-sym-amber-light text-sym-amber-dark border border-sym-amber/20">
                        {zone.investLabel}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
