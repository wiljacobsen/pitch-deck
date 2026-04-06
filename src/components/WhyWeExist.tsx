import { motion } from 'motion/react'

interface BarData {
  year: string
  segments: { key: string; value: number; color: string }[]
}

const COLORS: Record<string, string> = {
  historical: '#9CA3AF',
  nem: '#1E3A5F',
  swis: '#2563EB',
  pilbara: '#38BDF8',
  dcLoad: '#86EFAC',
  dcGen: '#22C55E',
}

const LEGEND = [
  { key: 'historical', label: 'Historical', color: COLORS.historical },
  { key: 'nem', label: 'NEM', color: COLORS.nem },
  { key: 'swis', label: 'SWIS', color: COLORS.swis },
  { key: 'pilbara', label: 'Pilbara', color: COLORS.pilbara },
  { key: 'dcLoad', label: '+ DC Load', color: COLORS.dcLoad },
  { key: 'dcGen', label: '+ DC Generation', color: COLORS.dcGen },
]

const DATA: BarData[] = [
  { year: '2016', segments: [{ key: 'historical', value: 1, color: COLORS.historical }] },
  { year: '2017', segments: [{ key: 'historical', value: 3, color: COLORS.historical }] },
  { year: '2018', segments: [{ key: 'historical', value: 4, color: COLORS.historical }] },
  { year: '2019', segments: [{ key: 'historical', value: 3.5, color: COLORS.historical }] },
  { year: '2020', segments: [{ key: 'historical', value: 3, color: COLORS.historical }] },
  { year: '2021', segments: [{ key: 'historical', value: 3, color: COLORS.historical }] },
  { year: '2022', segments: [{ key: 'historical', value: 2.5, color: COLORS.historical }] },
  { year: '2023', segments: [{ key: 'historical', value: 2, color: COLORS.historical }] },
  { year: '2024', segments: [{ key: 'historical', value: 3, color: COLORS.historical }] },
  {
    year: '2025',
    segments: [
      { key: 'nem', value: 8, color: COLORS.nem },
      { key: 'swis', value: 3, color: COLORS.swis },
      { key: 'pilbara', value: 2, color: COLORS.pilbara },
      { key: 'dcLoad', value: 2, color: COLORS.dcLoad },
      { key: 'dcGen', value: 1, color: COLORS.dcGen },
    ],
  },
  {
    year: '2026',
    segments: [
      { key: 'nem', value: 14, color: COLORS.nem },
      { key: 'swis', value: 5, color: COLORS.swis },
      { key: 'pilbara', value: 3, color: COLORS.pilbara },
      { key: 'dcLoad', value: 4, color: COLORS.dcLoad },
      { key: 'dcGen', value: 3, color: COLORS.dcGen },
    ],
  },
  {
    year: '2027',
    segments: [
      { key: 'nem', value: 16, color: COLORS.nem },
      { key: 'swis', value: 6, color: COLORS.swis },
      { key: 'pilbara', value: 4, color: COLORS.pilbara },
      { key: 'dcLoad', value: 5, color: COLORS.dcLoad },
      { key: 'dcGen', value: 4, color: COLORS.dcGen },
    ],
  },
  {
    year: '2028',
    segments: [
      { key: 'nem', value: 20, color: COLORS.nem },
      { key: 'swis', value: 8, color: COLORS.swis },
      { key: 'pilbara', value: 5, color: COLORS.pilbara },
      { key: 'dcLoad', value: 7, color: COLORS.dcLoad },
      { key: 'dcGen', value: 6, color: COLORS.dcGen },
    ],
  },
  {
    year: '2029',
    segments: [
      { key: 'nem', value: 22, color: COLORS.nem },
      { key: 'swis', value: 10, color: COLORS.swis },
      { key: 'pilbara', value: 6, color: COLORS.pilbara },
      { key: 'dcLoad', value: 10, color: COLORS.dcLoad },
      { key: 'dcGen', value: 10, color: COLORS.dcGen },
    ],
  },
]

const MAX_VALUE = 70

const BULLET_POINTS = [
  'Australia has historically delivered ~3GW of HV connections annually',
  'Market capacity must scale 6\u20137x by 2029 to meet baseline decarbonisation goals',
  'Enabling the full data centre opportunity will require ~20x scale-up in network infrastructure capacity',
]

// Annotation labels for the rightmost bar
const ANNOTATIONS = [
  { label: 'Data Centre Generation', color: COLORS.dcGen, top: 5 },
  { label: 'Data Centre Load', color: COLORS.dcLoad, top: 20 },
  { label: 'Pilbara', color: COLORS.pilbara, top: 37 },
  { label: 'SWIS', color: COLORS.swis, top: 48 },
  { label: 'NEM', color: COLORS.nem, top: 62 },
]

function BarChart({ dark }: { dark: boolean }) {
  const gridColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const textColor = dark ? 'text-white/50' : 'text-gray-400'
  const gridLines = [0, 10, 20, 30, 40, 50, 60, 70]

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Y-axis label */}
      <div className={`absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] md:text-xs font-medium ${textColor} whitespace-nowrap`}>
        Annual HV Install Capacity (GW)
      </div>

      <div className="ml-10 mr-32 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {gridLines.map((val) => (
            <div key={val} className="relative w-full" style={{ position: 'absolute', bottom: `${(val / MAX_VALUE) * 100}%` }}>
              <div className="w-full h-px" style={{ backgroundColor: gridColor }} />
              <span className={`absolute -left-8 -translate-y-1/2 text-[10px] ${textColor}`}>{val}</span>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="relative flex items-end gap-1 md:gap-2" style={{ height: '400px' }}>
          {DATA.map((bar, barIndex) => {
            const total = bar.segments.reduce((s, seg) => s + seg.value, 0)
            const heightPct = (total / MAX_VALUE) * 100

            return (
              <div key={bar.year} className="flex-1 flex flex-col items-center">
                <motion.div
                  className="w-full relative rounded-t-sm overflow-hidden"
                  style={{ height: `${heightPct}%`, transformOrigin: 'bottom' }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: barIndex * 0.05, ease: 'easeOut' }}
                >
                  {/* Stack segments bottom to top */}
                  <div className="absolute inset-0 flex flex-col-reverse">
                    {bar.segments.map((seg) => (
                      <div
                        key={seg.key}
                        style={{
                          height: `${(seg.value / total) * 100}%`,
                          backgroundColor: seg.color,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
                <span className={`mt-2 text-[9px] md:text-[11px] ${textColor}`}>{bar.year}</span>
              </div>
            )
          })}
        </div>

        {/* Historical capacity brace */}
        <motion.div
          className="absolute bottom-8 left-0 flex items-center"
          style={{ width: `${(9 / DATA.length) * 100}%` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className={`w-full text-center text-[10px] md:text-xs font-medium ${textColor}`}>
            <div className="mx-4 border-b border-l border-r rounded-b-lg h-3 mb-1" style={{ borderColor: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />
            Historical capacity
          </div>
        </motion.div>
      </div>

      {/* Right-side annotations for last bar */}
      <div className="absolute right-0 top-0 bottom-8 w-28 flex flex-col justify-start" style={{ paddingTop: '0px' }}>
        {ANNOTATIONS.map((ann, i) => (
          <motion.div
            key={ann.label}
            className="absolute right-0 flex items-center gap-1.5"
            style={{ top: `${ann.top}%` }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
          >
            <svg width="16" height="8" className="shrink-0">
              <line x1="16" y1="4" x2="2" y2="4" stroke={ann.color} strokeWidth="1.5" markerEnd="" />
              <polygon points="0,1 0,7 4,4" fill={ann.color} />
            </svg>
            <span
              className="text-[9px] md:text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap"
              style={{ backgroundColor: ann.color, color: ann.color === COLORS.dcLoad || ann.color === COLORS.dcGen ? '#0A1628' : 'white' }}
            >
              {ann.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <motion.p
        className={`mt-2 text-[9px] md:text-[10px] ${textColor} ml-10 mr-32 italic`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Note: This excludes capacity needed to service regulated transmission substations and switchyards.
      </motion.p>
    </div>
  )
}

export default function WhyWeExist({ dark }: { dark: boolean }) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-gray-50'}`}>
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl md:text-4xl font-bold mb-2 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Why Do We Exist?
          </h2>
          <p className={`text-base md:text-lg mb-8 transition-colors duration-500 max-w-4xl ${dark ? 'text-white/60' : 'text-gray-500'}`}>
            Future project connections hinge on execution capability and capacity.{' '}
            <span className="text-accent font-semibold">Symphony provides certainty of delivery for our partners.</span>
          </p>

          {/* Bullet points */}
          <ul className="space-y-3 mb-12">
            {BULLET_POINTS.map((point, i) => (
              <motion.li
                key={i}
                className={`flex items-start gap-3 text-sm md:text-base ${dark ? 'text-white/80' : 'text-gray-700'}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-4 mb-6 ml-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {LEGEND.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className={`text-[10px] md:text-xs ${dark ? 'text-white/60' : 'text-gray-500'}`}>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Chart */}
        <BarChart dark={dark} />
      </div>
    </section>
  )
}
