'use client'

import { useEffect, useRef } from 'react'
import { motion, type MotionValue, useTransform } from 'motion/react'
import { CoalPlant, SolarPanel, WindTurbine, Battery, DataCentre, Transformer, PowerTower, PowerPole, Buildings } from '@/icons'
import { useValueChainAnimation, type NodeId } from './useValueChainAnimation'

// ── Category color system ──────────────────────────────────────────

type NodeCategory = 'generation' | 'connection' | 'network' | 'load'

interface CategoryColors {
  bg: string
  border: string
  icon: string
  label: string
}

function getCategoryColors(cat: NodeCategory, dark: boolean): CategoryColors {
  if (dark) {
    switch (cat) {
      case 'generation':
        return { bg: '#1c1a12', border: 'rgba(245,158,11,0.25)', icon: 'rgba(245,158,11,0.85)', label: 'rgba(245,158,11,0.75)' }
      case 'connection':
        return { bg: '#141e35', border: 'rgba(59,130,246,0.25)', icon: 'rgba(147,197,253,0.9)', label: 'rgba(147,197,253,0.75)' }
      case 'network':
        return { bg: '#181e28', border: 'rgba(100,116,139,0.35)', icon: 'rgba(148,163,184,0.9)', label: 'rgba(148,163,184,0.75)' }
      case 'load':
        return { bg: '#121e1a', border: 'rgba(16,185,129,0.25)', icon: 'rgba(52,211,153,0.85)', label: 'rgba(52,211,153,0.75)' }
    }
  } else {
    switch (cat) {
      case 'generation':
        return { bg: '#fffbeb', border: 'rgba(245,158,11,0.35)', icon: 'rgba(180,83,9,1)', label: 'rgba(146,64,14,1)' }
      case 'connection':
        return { bg: '#eff6ff', border: 'rgba(59,130,246,0.35)', icon: 'rgba(37,99,235,1)', label: 'rgba(37,99,235,0.85)' }
      case 'network':
        return { bg: '#f8fafc', border: 'rgba(100,116,139,0.35)', icon: 'rgba(51,65,85,1)', label: 'rgba(71,85,105,1)' }
      case 'load':
        return { bg: '#ecfdf5', border: 'rgba(16,185,129,0.35)', icon: 'rgba(4,120,87,1)', label: 'rgba(6,95,70,1)' }
    }
  }
}

// ── ChainNode ──────────────────────────────────────────────────────

interface ChainNodeProps {
  icon: React.ReactNode
  label: string
  x: MotionValue<number>
  y: MotionValue<number>
  opacity?: MotionValue<number> | number
  scale?: MotionValue<number> | number
  highlightProgress?: MotionValue<number>
  category?: NodeCategory
  dark: boolean
}

function ChainNode({ icon, label, x, y, opacity = 1, scale = 1, highlightProgress, category = 'network', dark }: ChainNodeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v}%`)
  const cat = getCategoryColors(category, dark)

  const borderColor = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [cat.border, 'rgba(59,130,246,0.6)'])
    : undefined

  const bgColor = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [cat.bg, dark ? '#172554' : '#dbeafe'])
    : undefined

  const iconColorVal = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [cat.icon, 'rgba(59,130,246,1)'])
    : undefined

  const labelColorVal = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [cat.label, dark ? 'rgba(96,165,250,1)' : 'rgba(37,99,235,1)'])
    : undefined

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-[30px] md:-translate-y-[38px] flex flex-col items-center gap-1.5"
      style={{ left, top, opacity, scale }}
    >
      <motion.div
        className="w-16 h-16 md:w-[76px] md:h-[76px] rounded-2xl flex items-center justify-center border"
        style={{
          borderColor: borderColor || cat.border,
          backgroundColor: bgColor || cat.bg,
          boxShadow: dark
            ? `0 0 0 1px ${cat.border}, 0 2px 8px rgba(0,0,0,0.3)`
            : `0 0 0 1px ${cat.border}, 0 1px 3px rgba(0,0,0,0.08)`,
        }}
      >
        <motion.div
          className="w-9 h-9 md:w-11 md:h-11"
          style={{ color: iconColorVal || cat.icon }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <motion.span
        className="text-[10px] md:text-xs text-center font-medium whitespace-nowrap"
        style={{ color: labelColorVal || cat.label }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

// ── Routing types ──────────────────────────────────────────────────
// 'straight' = direct line, 'h-first' = horizontal then vertical 90° turn,
// 'v-first' = vertical then horizontal 90° turn

type Routing = 'straight' | 'h-first' | 'v-first'

// ── ChainArrow ─────────────────────────────────────────────────────

interface ArrowProps {
  x1: MotionValue<number>
  y1: MotionValue<number>
  x2: MotionValue<number>
  y2: MotionValue<number>
  opacity?: MotionValue<number> | number
  id: string
  dark: boolean
  variant?: 'primary' | 'secondary'
  routing?: Routing
}

function ChainArrow({ x1, y1, x2, y2, opacity = 1, id, dark, variant = 'primary', routing = 'straight' }: ArrowProps) {
  const cx1 = useTransform(x1, (v) => `${v}%`)
  const cy1 = useTransform(y1, (v) => `${v}%`)
  const cx2 = useTransform(x2, (v) => `${v}%`)
  const cy2 = useTransform(y2, (v) => `${v}%`)

  // Midpoint for 90° routing (always computed to avoid conditional hooks)
  // h-first: mid = (x2, y1) — go horizontal first, then vertical
  // v-first: mid = (x1, y2) — go vertical first, then horizontal
  const cmx = useTransform(routing === 'v-first' ? x1 : x2, (v) => `${v}%`)
  const cmy = useTransform(routing === 'v-first' ? y2 : y1, (v) => `${v}%`)

  const isPrimary = variant === 'primary'
  const lineColor = dark
    ? (isPrimary ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)')
    : (isPrimary ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.18)')
  const arrowColor = dark
    ? (isPrimary ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.45)')
    : (isPrimary ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.3)')
  const strokeW = isPrimary ? 3 : 2.5
  const dotColor = dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.10)'

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <marker id={`ar-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 1.5 L 9 5 L 0 8.5" fill="none" stroke={arrowColor} strokeWidth="1.8" />
          </marker>
        </defs>
        {/* Terminal dots */}
        <motion.circle cx={cx1} cy={cy1} r="3" fill={dotColor} />
        <motion.circle cx={cx2} cy={cy2} r="3" fill={dotColor} />
        {routing === 'straight' ? (
          <motion.line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke={lineColor} strokeWidth={strokeW} markerEnd={`url(#ar-${id})`} />
        ) : (
          <>
            <motion.line x1={cx1} y1={cy1} x2={cmx} y2={cmy} stroke={lineColor} strokeWidth={strokeW} />
            <motion.circle cx={cmx} cy={cmy} r="2" fill={dotColor} />
            <motion.line x1={cmx} y1={cmy} x2={cx2} y2={cy2} stroke={lineColor} strokeWidth={strokeW} markerEnd={`url(#ar-${id})`} />
          </>
        )}
      </svg>
    </motion.div>
  )
}

// ── ElectronDots (rAF-based, follows paths including 90° turns) ───

let electronIdCounter = 0

function ElectronDots({ x1, y1, x2, y2, opacity = 1, delay, routing = 'straight' }: {
  x1: MotionValue<number>; y1: MotionValue<number>
  x2: MotionValue<number>; y2: MotionValue<number>
  opacity?: MotionValue<number> | number
  delay: number
  routing?: Routing
}) {
  const gRef = useRef<SVGGElement>(null)
  const filterIdRef = useRef(`edot-${electronIdCounter++}`)
  const COUNT = 3
  const SPACING = 1 // seconds between electron groups
  const DUR = 3 // seconds per full traversal

  useEffect(() => {
    let raf: number
    const start = performance.now()

    function tick(now: number) {
      const g = gRef.current
      if (!g) { raf = requestAnimationFrame(tick); return }

      // Build path from current MotionValue positions
      const ax = x1.get(), ay = y1.get(), bx = x2.get(), by = y2.get()
      let pts: { x: number; y: number }[]
      if (routing === 'h-first') {
        pts = [{ x: ax, y: ay }, { x: bx, y: ay }, { x: bx, y: by }]
      } else if (routing === 'v-first') {
        pts = [{ x: ax, y: ay }, { x: ax, y: by }, { x: bx, y: by }]
      } else {
        pts = [{ x: ax, y: ay }, { x: bx, y: by }]
      }

      // Segment lengths
      const segLens: number[] = []
      let total = 0
      for (let i = 1; i < pts.length; i++) {
        const len = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
        segLens.push(len)
        total += len
      }
      if (total < 0.5) { raf = requestAnimationFrame(tick); return }

      const elapsed = (now - start) / 1000
      const circles = g.children

      for (let d = 0; d < COUNT * 2; d++) {
        const isTrail = d % 2 === 1
        const dotDelay = delay + Math.floor(d / 2) * SPACING + (isTrail ? 0.15 : 0)
        const raw = ((elapsed - dotDelay) % DUR + DUR) % DUR
        const t = raw / DUR

        // Position along multi-segment path
        const dist = t * total
        let acc = 0, px = pts[0].x, py = pts[0].y
        for (let s = 0; s < segLens.length; s++) {
          if (acc + segLens[s] >= dist) {
            const segT = segLens[s] > 0 ? (dist - acc) / segLens[s] : 0
            px = pts[s].x + (pts[s + 1].x - pts[s].x) * segT
            py = pts[s].y + (pts[s + 1].y - pts[s].y) * segT
            break
          }
          acc += segLens[s]
          if (s === segLens.length - 1) { px = pts[pts.length - 1].x; py = pts[pts.length - 1].y }
        }

        const el = circles[d] as SVGCircleElement | undefined
        if (!el) continue
        el.setAttribute('cx', `${px}%`)
        el.setAttribute('cy', `${py}%`)
        // Fade in/out at path edges
        const fade = t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1
        const base = isTrail ? 0.35 : 0.9
        el.setAttribute('opacity', `${fade * base}`)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // MotionValues are stable refs — safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <filter id={filterIdRef.current}>
            <feGaussianBlur stdDeviation="3" result="c" />
            <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g ref={gRef}>
          {Array.from({ length: COUNT }).flatMap((_, i) => [
            <circle key={`m${i}`} r="3.5" fill="#3B82F6" filter={`url(#${filterIdRef.current})`} opacity="0" />,
            <circle key={`t${i}`} r="3" fill="#3B82F6" filter={`url(#${filterIdRef.current})`} opacity="0" />,
          ])}
        </g>
      </svg>
    </motion.div>
  )
}

// ── Main Canvas ────────────────────────────────────────────────────

export default function ValueChainCanvas({ scrollYProgress, dark }: { scrollYProgress: MotionValue<number>; dark: boolean }) {
  const anim = useValueChainAnimation(scrollYProgress)
  const p = anim.positions
  const iconSize = "w-9 h-9 md:w-11 md:h-11"

  return (
    <div className="relative w-full h-full">
      {/* ===== TITLE A: Traditional value chain ===== */}
      <motion.div
        className="absolute top-[4%] left-0 z-10 w-[55%] px-8 md:px-12"
        style={{ opacity: anim.titleAOpacity }}
      >
        <h2 className={`text-xl md:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          The Traditional Grid
        </h2>
        <p className={`text-sm md:text-base leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Power has historically flowed one way — from large centralised generators through transmission and distribution networks to consumers. Coal and gas plants dominated Australian generation for over a century. The grid was designed around a small number of large, predictable power stations.
        </p>
      </motion.div>

      {/* ===== TITLE B: Energy transition ===== */}
      <motion.div
        className="absolute top-[4%] left-0 z-10 w-[55%] px-8 md:px-12"
        style={{ opacity: anim.titleBOpacity }}
      >
        <h2 className={`text-xl md:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Australia's Energy Transformation
        </h2>
        <p className={`text-sm md:text-base leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Australia's ageing coal fleet is rapidly retiring — over 60% of capacity scheduled to close by 2035. Renewables are the cheapest and fastest replacement: distributed wind, solar, and battery storage. AEMO's Integrated System Plan projects massive new capacity to meet demand.
        </p>
      </motion.div>

      {/* ===== TITLE C: Connecting to grid ===== */}
      <motion.div
        className="absolute top-[4%] left-0 z-10 w-[55%] px-8 md:px-12"
        style={{ opacity: anim.titleCOpacity }}
      >
        <h2 className={`text-xl md:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          The Transmission Bottleneck
        </h2>
        <p className={`text-sm md:text-base leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Every new generator and large load requires dedicated HV connection infrastructure — substations, switchyards, and protection systems. Regulated network operators are stretched — the pipeline of work far exceeds their delivery capacity. Contestable connection infrastructure enables specialist third parties to deliver and own this critical infrastructure, creating a multi-billion dollar market.
        </p>
      </motion.div>

      {/* ===== TITLE D: Digital growth ===== */}
      <motion.div
        className="absolute top-[4%] left-0 z-10 w-[55%] px-8 md:px-12"
        style={{ opacity: anim.titleDOpacity }}
      >
        <h2 className={`text-xl md:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          The AI Race
        </h2>
        <p className={`text-sm md:text-base leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Global AI investment is driving unprecedented demand for data centre capacity in Australia. Each hyperscale facility requires 100–500 MW of dedicated grid connection — equivalent to a large wind farm. Australia's pipeline exceeds 10 GW of new load, creating a second wave of connection infrastructure demand alongside the energy transition.
        </p>
      </motion.div>

      {/* ===== TITLE E: Symphony's role ===== */}
      <motion.div
        className="absolute top-[4%] left-0 z-10 w-[55%] px-8 md:px-12"
        style={{ opacity: anim.titleEOpacity }}
      >
        <h2 className={`text-xl md:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          <span className="text-accent">Symphony's</span> Role in the Energy Value Chain
        </h2>
        <p className={`text-sm md:text-base leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Symphony designs, builds, owns, and operates the connection infrastructure linking generators and loads to the grid. We provide certainty of delivery, de-risking projects for developers, investors, and network operators. Our integrated model spans the full lifecycle — feasibility through construction to 30-year asset management.
        </p>
        <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 w-fit">
          <div className="w-3 h-3 rounded bg-accent" />
          <span className="text-xs font-semibold text-accent-light">Symphony Connection Infrastructure</span>
        </div>
      </motion.div>

      {/* Infographic area — below titles, with breathing room */}
      <div className="absolute top-[28%] left-[1%] right-[1%] bottom-[3%]">
        <div className="relative w-full h-full">

          {/* ===== State A arrows: Coal → Transmission → Distribution → Load (straight horizontal) ===== */}
          <ChainArrow id="a0" x1={p.coal.x} y1={p.coal.y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.stateAFade} dark={dark} />
          <ChainArrow id="a1" x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.stateAFade} dark={dark} />
          <ChainArrow id="a2" x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.stateAFade} dark={dark} />

          {/* State A electrons */}
          <ElectronDots x1={p.coal.x} y1={p.coal.y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.stateAFade} delay={0} />
          <ElectronDots x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.stateAFade} delay={0.5} />
          <ElectronDots x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.stateAFade} delay={1} />

          {/* ===== Core chain arrows (from phase 1.2): thermal→trans with 90° turn (v-first: down then right), trans→dist→load straight ===== */}
          <ChainArrow id="ct" x1={p.coal.x} y1={p.coal.y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.coreChainArrows} dark={dark} routing="v-first" />
          <ChainArrow id="c0" x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.coreChainArrows} dark={dark} />
          <ChainArrow id="c1" x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.coreChainArrows} dark={dark} />

          {/* Core chain electrons */}
          <ElectronDots x1={p.coal.x} y1={p.coal.y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.coreChainArrows} delay={0} routing="v-first" />
          <ElectronDots x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.coreChainArrows} delay={0.3} />
          <ElectronDots x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.coreChainArrows} delay={0.8} />

          {/* ===== Generator → NCI (straight) → Transmission (90° h-first turn) arrows (phase 1.3) ===== */}
          {(['solar', 'wind', 'battery'] as const).map((gen, i) => {
            const nci = `nci${gen.charAt(0).toUpperCase() + gen.slice(1)}` as NodeId
            return (
              <span key={gen}>
                <ChainArrow id={`g${i}`} x1={p[gen].x} y1={p[gen].y} x2={p[nci].x} y2={p[nci].y} opacity={anim.connectionArrows} dark={dark} variant="secondary" />
                <ChainArrow id={`n${i}`} x1={p[nci].x} y1={p[nci].y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.connectionArrows} dark={dark} variant="secondary" routing="v-first" />
                <ElectronDots x1={p[gen].x} y1={p[gen].y} x2={p[nci].x} y2={p[nci].y} opacity={anim.connectionArrows} delay={i * 0.4} />
                <ElectronDots x1={p[nci].x} y1={p[nci].y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.connectionArrows} delay={i * 0.4 + 0.2} routing="v-first" />
              </span>
            )
          })}

          {/* ===== DC arrows: transmission → nciDC (90° v-first turn) → dataCentre (straight) (phase 1.4) ===== */}
          <ChainArrow id="dc0" x1={p.transmission.x} y1={p.transmission.y} x2={p.nciDataCentre.x} y2={p.nciDataCentre.y} opacity={anim.dcArrows} dark={dark} variant="secondary" routing="h-first" />
          <ChainArrow id="dc1" x1={p.nciDataCentre.x} y1={p.nciDataCentre.y} x2={p.dataCentre.x} y2={p.dataCentre.y} opacity={anim.dcArrows} dark={dark} variant="secondary" />
          <ElectronDots x1={p.transmission.x} y1={p.transmission.y} x2={p.nciDataCentre.x} y2={p.nciDataCentre.y} opacity={anim.dcArrows} delay={0.1} routing="h-first" />
          <ElectronDots x1={p.nciDataCentre.x} y1={p.nciDataCentre.y} x2={p.dataCentre.x} y2={p.dataCentre.y} opacity={anim.dcArrows} delay={0.4} />

          {/* ===== NODES ===== */}

          {/* Generation */}
          <ChainNode icon={<CoalPlant className={iconSize} />} label="Generator" x={p.coal.x} y={p.coal.y} category="generation" dark={dark} />

          {/* Coal retirement annotation — appears in phase 1.2 */}
          <motion.div
            className="absolute flex flex-col justify-center pointer-events-none"
            style={{
              left: useTransform(p.coal.x, (v) => `calc(${v}% + 48px)`),
              top: useTransform(p.coal.y, (v) => `calc(${v}% - 16px)`),
              opacity: anim.coalRetirementOpacity,
            }}
          >
            <span className="text-xs md:text-sm font-semibold text-red-400 leading-tight whitespace-nowrap">60% to close by 2030</span>
            <span className={`text-[10px] md:text-xs leading-tight ${dark ? 'text-white/40' : 'text-gray-500'}`}>AEMO ISP, Step Change</span>
          </motion.div>

          <ChainNode icon={<SolarPanel className={iconSize} />} label="Solar" x={p.solar.x} y={p.solar.y} opacity={anim.renewablesOpacity} category="generation" dark={dark} />
          <ChainNode icon={<WindTurbine className={iconSize} />} label="Wind" x={p.wind.x} y={p.wind.y} opacity={anim.renewablesOpacity} category="generation" dark={dark} />
          <ChainNode icon={<Battery className={iconSize} />} label="Battery" x={p.battery.x} y={p.battery.y} opacity={anim.renewablesOpacity} category="generation" dark={dark} />

          {/* AEMO ISP GW labels — positioned to the right of each renewable icon */}
          {([
            { node: 'solar' as const, gw: '~68 GW', label: 'Solar by 2050', color: 'text-amber-400' },
            { node: 'wind' as const, gw: '~32 GW', label: 'Wind by 2050', color: 'text-sky-400' },
            { node: 'battery' as const, gw: '~19 GW', label: 'Storage by 2050', color: 'text-emerald-400' },
          ]).map((isp) => (
            <motion.div
              key={isp.node}
              className="absolute flex flex-col justify-center pointer-events-none"
              style={{
                left: useTransform(p[isp.node].x, (v) => `calc(${v}% + 48px)`),
                top: useTransform(p[isp.node].y, (v) => `calc(${v}% - 20px)`),
                opacity: anim.ispLabelsOpacity,
              }}
            >
              <span className={`text-base md:text-lg font-bold leading-tight ${isp.color}`}>{isp.gw}</span>
              <span className={`text-[10px] md:text-xs leading-tight ${dark ? 'text-white/50' : 'text-gray-500'}`}>{isp.label}</span>
            </motion.div>
          ))}

          {/* Connection Infrastructure — highlight in phase 1.5 */}
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciSolar.x} y={p.nciSolar.y} opacity={anim.nciOpacity} scale={anim.nciScale} highlightProgress={anim.nciHighlight} category="connection" dark={dark} />
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciWind.x} y={p.nciWind.y} opacity={anim.nciOpacity} scale={anim.nciScale} highlightProgress={anim.nciHighlight} category="connection" dark={dark} />
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciBattery.x} y={p.nciBattery.y} opacity={anim.nciOpacity} scale={anim.nciScale} highlightProgress={anim.nciHighlight} category="connection" dark={dark} />
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciDataCentre.x} y={p.nciDataCentre.y} opacity={anim.dcOpacity} scale={anim.dcScale} highlightProgress={anim.nciHighlight} category="connection" dark={dark} />

          {/* Network */}
          <ChainNode icon={<PowerTower className={iconSize} />} label="Transmission" x={p.transmission.x} y={p.transmission.y} category="network" dark={dark} />
          <ChainNode icon={<PowerPole className={iconSize} />} label="Distribution" x={p.distribution.x} y={p.distribution.y} category="network" dark={dark} />

          {/* Load */}
          <ChainNode icon={<Buildings className={iconSize} />} label="Load / Consumers" x={p.load.x} y={p.load.y} category="load" dark={dark} />
          <ChainNode icon={<DataCentre className={iconSize} />} label="Data Centres" x={p.dataCentre.x} y={p.dataCentre.y} opacity={anim.dcOpacity} scale={anim.dcScale} category="load" dark={dark} />
        </div>
      </div>
    </div>
  )
}
