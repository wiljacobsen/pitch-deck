'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'

const COLORS = {
  historical: '#9CA3AF',
  nem: '#0C2D5A',
  swis: '#2563EB',
  pilbara: '#38BDF8',
  dcLoad: '#86EFAC',
  dcGen: '#22C55E',
}

const LEGEND = [
  { label: 'Historical', color: COLORS.historical },
  { label: 'NEM', color: COLORS.nem },
  { label: 'SWIS', color: COLORS.swis },
  { label: 'Pilbara', color: COLORS.pilbara },
  { label: '+ DC Load', color: COLORS.dcLoad },
  { label: '+ DC Generation', color: COLORS.dcGen },
]

interface Segment { value: number; color: string }
interface BarData { year: string; segments: Segment[] }

const DATA: BarData[] = [
  { year: '2016', segments: [{ value: 0.8, color: COLORS.historical }] },
  { year: '2017', segments: [{ value: 3.5, color: COLORS.historical }] },
  { year: '2018', segments: [{ value: 4.5, color: COLORS.historical }] },
  { year: '2019', segments: [{ value: 3.2, color: COLORS.historical }] },
  { year: '2020', segments: [{ value: 3, color: COLORS.historical }] },
  { year: '2021', segments: [{ value: 2.5, color: COLORS.historical }] },
  { year: '2022', segments: [{ value: 2, color: COLORS.historical }] },
  { year: '2023', segments: [{ value: 2, color: COLORS.historical }] },
  { year: '2024', segments: [{ value: 3, color: COLORS.historical }] },
  {
    year: '2025',
    segments: [
      { value: 7, color: COLORS.nem },
      { value: 2.5, color: COLORS.swis },
      { value: 2, color: COLORS.pilbara },
      { value: 2, color: COLORS.dcLoad },
      { value: 2, color: COLORS.dcGen },
    ],
  },
  {
    year: '2026',
    segments: [
      { value: 12, color: COLORS.nem },
      { value: 4, color: COLORS.swis },
      { value: 3, color: COLORS.pilbara },
      { value: 5, color: COLORS.dcLoad },
      { value: 4, color: COLORS.dcGen },
    ],
  },
  {
    year: '2027',
    segments: [
      { value: 14, color: COLORS.nem },
      { value: 5, color: COLORS.swis },
      { value: 4, color: COLORS.pilbara },
      { value: 6, color: COLORS.dcLoad },
      { value: 6, color: COLORS.dcGen },
    ],
  },
  {
    year: '2028',
    segments: [
      { value: 18, color: COLORS.nem },
      { value: 7, color: COLORS.swis },
      { value: 5.5, color: COLORS.pilbara },
      { value: 8, color: COLORS.dcLoad },
      { value: 8, color: COLORS.dcGen },
    ],
  },
  {
    year: '2029',
    segments: [
      { value: 20, color: COLORS.nem },
      { value: 8, color: COLORS.swis },
      { value: 7, color: COLORS.pilbara },
      { value: 11, color: COLORS.dcLoad },
      { value: 12, color: COLORS.dcGen },
    ],
  },
]

const MAX_VALUE = 70
const CHART_HEIGHT = 420

const DEFAULT_BULLET_POINTS = [
  'Australia has historically delivered ~3GW of HV connections annually',
  'Market capacity must scale 6\u20137x by 2029 to meet baseline decarbonisation goals',
  'Enabling the full data centre opportunity will require ~20x scale-up in network infrastructure capacity',
]

const ANNOTATIONS = [
  { label: 'Data Centre Generation', color: COLORS.dcGen, valueMid: 52 },
  { label: 'Data Centre Load', color: COLORS.dcLoad, valueMid: 42 },
  { label: 'Pilbara', color: COLORS.pilbara, valueMid: 33 },
  { label: 'SWIS', color: COLORS.swis, valueMid: 27 },
  { label: 'NEM', color: COLORS.nem, valueMid: 10 },
]

const Y_TICKS = [0, 10, 20, 30, 40, 50, 60, 70]

export default function WhyWeExistSlide({ contentData, dark }: SlideComponentProps) {
  const title = (contentData.title as string) || 'Why Do We Exist?'
  const subtitle = (contentData.subtitle as string) || ''
  const bulletPoints = (contentData.bulletPoints as string[]) || DEFAULT_BULLET_POINTS
  const footerNote = (contentData.footerNote as string) || 'Note: This excludes capacity needed to service regulated transmission substations and switchyards.'

  const gridColor = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const textColor = dark ? 'text-white/50' : 'text-gray-400'

  return (
    <section className={`relative h-screen flex flex-col justify-center py-8 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-gray-50'}`}>
      <div className="max-w-6xl w-full mx-auto">
        {/* Title row */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-sm md:text-base transition-colors duration-500 max-w-3xl ${dark ? 'text-white/60' : 'text-gray-500'}`}>
            {subtitle || (<>Future project connections hinge on execution capability and capacity.{' '}
            <span className="text-accent font-semibold">Symphony provides certainty of delivery for our partners.</span></>)}
          </p>
        </motion.div>

        {/* Chart with overlaid bullet points */}
        <div className="relative w-full">
          <div className="flex">
            {/* Y-axis labels */}
            <div className="relative shrink-0 w-8 mr-1" style={{ height: CHART_HEIGHT }}>
              {Y_TICKS.map((val) => (
                <span
                  key={val}
                  className={`absolute right-0 -translate-y-1/2 text-[10px] md:text-xs ${textColor}`}
                  style={{ bottom: `${(val / MAX_VALUE) * 100}%` }}
                >
                  {val}
                </span>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 relative" style={{ height: CHART_HEIGHT }}>
              {/* Grid lines */}
              {Y_TICKS.map((val) => (
                <div
                  key={val}
                  className="absolute left-0 right-0 h-px"
                  style={{ bottom: `${(val / MAX_VALUE) * 100}%`, backgroundColor: gridColor }}
                />
              ))}

              {/* Bars */}
              <div className="absolute inset-0 flex items-end gap-[3px] md:gap-1.5 px-1">
                {DATA.map((bar, barIndex) => {
                  const total = bar.segments.reduce((s, seg) => s + seg.value, 0)
                  const barHeight = (total / MAX_VALUE) * CHART_HEIGHT

                  return (
                    <div key={bar.year} className="flex-1 flex flex-col items-center" style={{ height: '100%', justifyContent: 'flex-end' }}>
                      <motion.div
                        className="w-full rounded-t-sm overflow-hidden"
                        style={{ height: barHeight, transformOrigin: 'bottom' }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.7, delay: barIndex * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="w-full h-full flex flex-col-reverse">
                          {bar.segments.map((seg, segIdx) => (
                            <div
                              key={segIdx}
                              style={{
                                height: `${(seg.value / total) * 100}%`,
                                backgroundColor: seg.color,
                                minHeight: 1,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>

              {/* Frosted glass overlay with bullet points + legend */}
              <motion.div
                className="absolute top-3 left-3 z-10 max-w-[54%] rounded-xl border backdrop-blur-xl px-5 py-4"
                style={{
                  background: dark ? 'rgba(10,22,40,0.82)' : 'rgba(255,255,255,0.85)',
                  borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  boxShadow: dark
                    ? '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)'
                    : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ul className="space-y-2.5 mb-4">
                  {bulletPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      className={`flex items-start gap-2.5 text-xs md:text-sm leading-relaxed ${dark ? 'text-white/85' : 'text-gray-700'}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.1, duration: 0.4 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>

                {/* Subtle separator */}
                <div className="h-px mb-3" style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />

                {/* Legend */}
                <motion.div
                  className="flex flex-wrap gap-x-4 gap-y-1.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  {LEGEND.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-[3px]" style={{ backgroundColor: item.color }} />
                      <span className={`text-[9px] md:text-[11px] font-medium ${dark ? 'text-white/55' : 'text-gray-500'}`}>{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right-side annotation labels */}
            <div className="relative shrink-0 w-40 ml-3" style={{ height: CHART_HEIGHT }}>
              {ANNOTATIONS.map((ann, i) => (
                <motion.div
                  key={ann.label}
                  className="absolute flex items-center gap-2"
                  style={{ bottom: `${(ann.valueMid / MAX_VALUE) * 100}%`, transform: 'translateY(50%)' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                >
                  <svg width="20" height="10" className="shrink-0">
                    <line x1="20" y1="5" x2="5" y2="5" stroke={ann.color} strokeWidth="1.5" />
                    <polygon points="0,2 0,8 5,5" fill={ann.color} />
                  </svg>
                  <span
                    className="text-[9px] md:text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap"
                    style={{
                      backgroundColor: ann.color,
                      color: ann.color === COLORS.dcLoad || ann.color === COLORS.dcGen ? '#0A1628' : 'white',
                    }}
                  >
                    {ann.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* X-axis year labels */}
          <div className="flex ml-9 mr-[172px]">
            <div className="flex-1 flex gap-[3px] md:gap-1.5 px-1">
              {DATA.map((bar) => (
                <div key={bar.year} className={`flex-1 text-center text-[9px] md:text-[11px] pt-1 ${textColor}`}>
                  {bar.year}
                </div>
              ))}
            </div>
          </div>

          {/* Y-axis title */}
          <div
            className={`absolute left-0 text-[10px] md:text-xs font-medium ${textColor} whitespace-nowrap`}
            style={{ top: '50%', transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: '0 0' }}
          >
            Annual HV Install Capacity (GW)
          </div>

          {/* Note */}
          <motion.p
            className={`mt-2 text-[8px] md:text-[10px] ${textColor} ml-9 italic`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {footerNote}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
