import { motion } from 'motion/react'
import { GANTT_ROWS, GANTT_GROUPS, GANTT_TOTAL_MONTHS } from './ganttData'
import type { ModelId } from './types'

// ── Month markers ────────────────────────────────────────────────

const MONTH_MARKERS = [3, 6, 9, 12, 15, 18, 21, 24]

// ── Color helpers ────────────────────────────────────────────────

function getBarColors(owner: 'symphony' | 'client', dark: boolean) {
  if (owner === 'symphony') {
    return {
      bg: dark ? '#185FA5' : '#E6F1FB',
      border: dark ? '#2070B8' : '#185FA5',
      text: dark ? '#E6F1FB' : '#0C447C',
    }
  }
  return {
    bg: dark ? '#2C2C2A' : '#F1EFE8',
    border: dark ? '#3a3a37' : '#B4B2A9',
    text: dark ? '#B4B2A9' : '#5F5E5A',
  }
}

// ── Main Component ───────────────────────────────────────────────

interface GanttChartProps {
  modelId: ModelId
  dark: boolean
}

export function GanttChart({ modelId, dark }: GanttChartProps) {
  // Group rows
  const groups = GANTT_GROUPS.map(g => ({
    ...g,
    rows: GANTT_ROWS.filter(r => r.group === g.id),
  }))

  return (
    <div>
      {/* Section title */}
      <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-4 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
        Project timeline
      </p>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="min-w-[600px]">
          {/* Month header */}
          <div className="flex mb-2">
            {/* Spacer for labels */}
            <div className="w-[70px] md:w-[90px] shrink-0" />
            <div className="w-[90px] md:w-[110px] shrink-0" />
            {/* Month grid */}
            <div className="flex-1 relative">
              <div className="flex">
                {Array.from({ length: GANTT_TOTAL_MONTHS }, (_, i) => i + 1).map(m => (
                  <div
                    key={m}
                    className="flex-1 text-center"
                  >
                    {MONTH_MARKERS.includes(m) && (
                      <span className={`text-[8px] ${dark ? 'text-white/25' : 'text-gray-300'}`}>
                        {m}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rows grouped by phase */}
          {groups.map((group) => (
            <div key={group.id} className="mb-1">
              {group.rows.map((row, rowIdx) => {
                const owner = row.modelOwnership[modelId]
                const colors = getBarColors(owner, dark)
                const startCol = row.startMonth
                const endCol = row.endMonth ?? GANTT_TOTAL_MONTHS + 1
                const startPct = ((startCol - 1) / GANTT_TOTAL_MONTHS) * 100
                const widthPct = ((endCol - startCol) / GANTT_TOTAL_MONTHS) * 100

                return (
                  <div key={row.id} className="flex items-center mb-0.5">
                    {/* Group label (only first row in group) */}
                    <div className={`w-[70px] md:w-[90px] shrink-0 pr-2 ${rowIdx === 0 ? '' : ''}`}>
                      {rowIdx === 0 && (
                        <span className={`text-[9px] md:text-[10px] font-semibold uppercase tracking-wider ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                          {group.label}
                        </span>
                      )}
                    </div>

                    {/* Row label */}
                    <div className="w-[90px] md:w-[110px] shrink-0 pr-2">
                      <span className={`text-[10px] md:text-[11px] font-medium ${dark ? 'text-white/60' : 'text-gray-500'}`}>
                        {row.label}
                      </span>
                    </div>

                    {/* Bar area */}
                    <div className={`flex-1 relative h-7 rounded ${dark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      {/* Grid lines */}
                      {MONTH_MARKERS.map(m => (
                        <div
                          key={m}
                          className={`absolute top-0 bottom-0 w-px ${dark ? 'bg-white/5' : 'bg-gray-100'}`}
                          style={{ left: `${((m - 0.5) / GANTT_TOTAL_MONTHS) * 100}%` }}
                        />
                      ))}

                      {/* Bar */}
                      <motion.div
                        animate={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          scaleX: { duration: 0.4, delay: rowIdx * 0.05, ease: 'easeOut' },
                          backgroundColor: { duration: 0.25 },
                          borderColor: { duration: 0.25 },
                        }}
                        className="absolute top-0.5 bottom-0.5 rounded border flex items-center justify-center overflow-hidden"
                        style={{
                          left: `${startPct}%`,
                          width: `${Math.min(widthPct, 100 - startPct)}%`,
                          transformOrigin: 'left',
                        }}
                      >
                        <span
                          className="text-[8px] md:text-[9px] font-medium whitespace-nowrap px-1"
                          style={{ color: colors.text }}
                        >
                          {owner === 'symphony' ? 'Symphony' : 'Client'}
                        </span>

                        {/* Fade-out gradient for ongoing bars */}
                        {row.endMonth === null && (
                          <div
                            className="absolute right-0 top-0 bottom-0 w-6"
                            style={{
                              background: `linear-gradient(to right, transparent, ${colors.bg})`,
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}

          {/* Legend */}
          <div className={`flex gap-4 mt-3 pt-2 border-t ${dark ? 'border-white/5' : 'border-gray-100'}`}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: dark ? '#185FA5' : '#E6F1FB', border: `1px solid ${dark ? '#2070B8' : '#185FA5'}` }} />
              <span className={`text-[9px] ${dark ? 'text-white/40' : 'text-gray-400'}`}>Symphony-led</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: dark ? '#2C2C2A' : '#F1EFE8', border: `1px solid ${dark ? '#3a3a37' : '#B4B2A9'}` }} />
              <span className={`text-[9px] ${dark ? 'text-white/40' : 'text-gray-400'}`}>Client-led</span>
            </div>
            <span className={`text-[9px] ml-auto ${dark ? 'text-white/20' : 'text-gray-300'}`}>Months →</span>
          </div>
        </div>
      </div>
    </div>
  )
}
