import { motion, type MotionValue, useTransform } from 'motion/react'
import { SolarPanel, WindTurbine, Battery, GasGenerator, Transformer, PowerTower, Buildings } from '../../icons'
import { useValueChainAnimation, type NodeId } from './useValueChainAnimation'

interface ChainNodeProps {
  icon: React.ReactNode
  label: string
  x: MotionValue<number>
  y: MotionValue<number>
  opacity?: MotionValue<number> | number
  scale?: MotionValue<number> | number
  highlightProgress?: MotionValue<number>
  dark: boolean
}

function ChainNode({ icon, label, x, y, opacity = 1, scale = 1, highlightProgress, dark }: ChainNodeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v}%`)

  // Interpolate colors based on highlight progress
  const borderColor = highlightProgress
    ? useTransform(highlightProgress, [0, 1], [
        dark ? 'rgba(255,255,255,0.2)' : 'rgba(209,213,219,1)',
        'rgba(59,130,246,0.5)',
      ])
    : undefined

  const bgColor = highlightProgress
    ? useTransform(highlightProgress, [0, 1], [
        dark ? '#152035' : '#ffffff',
        dark ? '#1a2d52' : '#eff6ff',
      ])
    : undefined

  const iconColor = highlightProgress
    ? useTransform(highlightProgress, [0, 1], [
        dark ? 'rgba(255,255,255,0.85)' : 'rgba(55,65,81,1)',
        'rgba(59,130,246,1)',
      ])
    : undefined

  const labelColor = highlightProgress
    ? useTransform(highlightProgress, [0, 1], [
        dark ? 'rgba(255,255,255,0.8)' : 'rgba(75,85,99,1)',
        dark ? 'rgba(96,165,250,1)' : 'rgba(59,130,246,1)',
      ])
    : undefined

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
      style={{ left, top, opacity, scale }}
    >
      <motion.div
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border transition-shadow duration-500"
        style={{
          borderColor: borderColor || (dark ? 'rgba(255,255,255,0.2)' : 'rgba(209,213,219,1)'),
          backgroundColor: bgColor || (dark ? '#152035' : '#ffffff'),
          boxShadow: highlightProgress ? undefined : (dark ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'),
        }}
      >
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12"
          style={{ color: iconColor || (dark ? 'rgba(255,255,255,0.85)' : 'rgba(55,65,81,1)') }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <motion.span
        className="text-[10px] md:text-xs text-center font-medium whitespace-nowrap"
        style={{ color: labelColor || (dark ? 'rgba(255,255,255,0.8)' : 'rgba(75,85,99,1)') }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

interface ArrowProps {
  x1: MotionValue<number>
  y1: MotionValue<number>
  x2: MotionValue<number>
  y2: MotionValue<number>
  opacity?: MotionValue<number> | number
  id: string
  dark: boolean
}

function ChainArrow({ x1, y1, x2, y2, opacity = 1, id, dark }: ArrowProps) {
  const cx1 = useTransform(x1, (v) => `${v}%`)
  const cy1 = useTransform(y1, (v) => `${v}%`)
  const cx2 = useTransform(x2, (v) => `${v}%`)
  const cy2 = useTransform(y2, (v) => `${v}%`)

  const lineColor = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
  const arrowColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <marker id={`ar-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 9 5 L 0 8.5" fill="none" stroke={arrowColor} strokeWidth="1.5" />
          </marker>
        </defs>
        <motion.line
          x1={cx1} y1={cy1} x2={cx2} y2={cy2}
          stroke={lineColor}
          strokeWidth="1"
          markerEnd={`url(#ar-${id})`}
        />
      </svg>
    </motion.div>
  )
}

interface ElectronPathProps {
  x1: MotionValue<number>
  y1: MotionValue<number>
  x2: MotionValue<number>
  y2: MotionValue<number>
  opacity?: MotionValue<number> | number
  delay: number
  id: string
}

function ElectronPath({ x1, y1, x2, y2, opacity = 1, delay, id: _id }: ElectronPathProps) {
  const sx = useTransform(x1, (v) => `${v}%`)
  const sy = useTransform(y1, (v) => `${v}%`)
  const ex = useTransform(x2, (v) => `${v}%`)
  const ey = useTransform(y2, (v) => `${v}%`)

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 1, 2].map((i) => (
          <circle key={i} r="2.5" fill="#3B82F6" filter="url(#glow)">
            <animate attributeName="cx" values={`${sx.get()};${ex.get()}`} dur="4s" begin={`${delay + i * 1.3}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${sy.get()};${ey.get()}`} dur="4s" begin={`${delay + i * 1.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="4s" begin={`${delay + i * 1.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </motion.div>
  )
}

interface ValueChainCanvasProps {
  scrollYProgress: MotionValue<number>
  dark: boolean
}

export default function ValueChainCanvas({ scrollYProgress, dark }: ValueChainCanvasProps) {
  const anim = useValueChainAnimation(scrollYProgress)
  const p = anim.positions

  const iconSize = "w-10 h-10 md:w-12 md:h-12"

  // Node definitions
  const nodes: {
    id: NodeId
    icon: React.ReactNode
    label: string
    opacity?: MotionValue<number> | number
    scale?: MotionValue<number> | number
    highlightProgress?: MotionValue<number>
  }[] = [
    // Generators (solar always visible, others expand)
    { id: 'solar', icon: <SolarPanel className={iconSize} />, label: 'Solar' },
    { id: 'wind', icon: <WindTurbine className={iconSize} />, label: 'Wind', opacity: anim.generatorExpand },
    { id: 'battery', icon: <Battery className={iconSize} />, label: 'Battery', opacity: anim.generatorExpand },
    { id: 'gas', icon: <GasGenerator className={iconSize} />, label: 'Gas', opacity: anim.generatorExpand },
    // NCI boxes (appear in State B, highlight in State C)
    { id: 'nciSolar', icon: <Transformer className={iconSize} />, label: 'Connection Infra', opacity: anim.nciOpacity, scale: anim.nciScale, highlightProgress: anim.nciHighlight },
    { id: 'nciWind', icon: <Transformer className={iconSize} />, label: 'Connection Infra', opacity: anim.nciOpacity, scale: anim.nciScale, highlightProgress: anim.nciHighlight },
    { id: 'nciBattery', icon: <Transformer className={iconSize} />, label: 'Connection Infra', opacity: anim.nciOpacity, scale: anim.nciScale, highlightProgress: anim.nciHighlight },
    { id: 'nciGas', icon: <Transformer className={iconSize} />, label: 'Connection Infra', opacity: anim.nciOpacity, scale: anim.nciScale, highlightProgress: anim.nciHighlight },
    // Core chain
    { id: 'transmission', icon: <PowerTower className={iconSize} />, label: 'Transmission' },
    { id: 'distribution', icon: <Transformer className={iconSize} />, label: 'Distribution' },
    { id: 'load', icon: <Buildings className={iconSize} />, label: 'Load / Consumers' },
  ]

  // State A arrows (simple linear, fade out during expansion)
  const stateAArrows: { from: NodeId; to: NodeId }[] = [
    { from: 'solar', to: 'transmission' },
    { from: 'transmission', to: 'distribution' },
    { from: 'distribution', to: 'load' },
  ]

  // State B arrows (generator → NCI → transmission, fade in)
  const stateBArrows: { from: NodeId; to: NodeId }[] = [
    { from: 'solar', to: 'nciSolar' },
    { from: 'wind', to: 'nciWind' },
    { from: 'battery', to: 'nciBattery' },
    { from: 'gas', to: 'nciGas' },
    { from: 'nciSolar', to: 'transmission' },
    { from: 'nciWind', to: 'transmission' },
    { from: 'nciBattery', to: 'transmission' },
    { from: 'nciGas', to: 'transmission' },
    { from: 'transmission', to: 'distribution' },
    { from: 'distribution', to: 'load' },
  ]

  // Electron paths for State B
  const electronPaths: { from: NodeId; to: NodeId; opacity?: MotionValue<number> | number; delay: number }[] = [
    // State A electrons
    { from: 'solar', to: 'transmission', opacity: anim.stateAFade, delay: 0 },
    { from: 'transmission', to: 'distribution', opacity: anim.stateAFade, delay: 0.5 },
    { from: 'distribution', to: 'load', delay: 1 },
    // State B electrons
    { from: 'solar', to: 'nciSolar', opacity: anim.stateBArrows, delay: 0 },
    { from: 'wind', to: 'nciWind', opacity: anim.stateBArrows, delay: 0.3 },
    { from: 'battery', to: 'nciBattery', opacity: anim.stateBArrows, delay: 0.6 },
    { from: 'gas', to: 'nciGas', opacity: anim.stateBArrows, delay: 0.9 },
    { from: 'nciSolar', to: 'transmission', opacity: anim.stateBArrows, delay: 0.2 },
    { from: 'nciWind', to: 'transmission', opacity: anim.stateBArrows, delay: 0.5 },
    { from: 'nciBattery', to: 'transmission', opacity: anim.stateBArrows, delay: 0.8 },
    { from: 'nciGas', to: 'transmission', opacity: anim.stateBArrows, delay: 1.1 },
  ]

  return (
    <div className="relative w-full h-full">
      {/* Title area */}
      <motion.div
        className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center z-10 w-full max-w-4xl px-6"
        style={{ opacity: anim.titleOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-3 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Traditional electricity value chain
        </h2>
        {/* State A subtitle */}
        <motion.p
          className={`text-sm md:text-base max-w-3xl mx-auto transition-colors duration-500 ${dark ? 'text-white/40' : 'text-gray-400'}`}
          style={{ opacity: anim.subtitleAOpacity }}
        >
          Historically, power has flowed from large scale centralised generators through transmission and distribution networks to commercial, industrial and residential load customers
        </motion.p>
        {/* State B/C subtitle */}
        <motion.p
          className={`text-sm md:text-base max-w-3xl mx-auto absolute top-full left-1/2 -translate-x-1/2 mt-1 w-full transition-colors duration-500 ${dark ? 'text-white/40' : 'text-gray-400'}`}
          style={{ opacity: anim.subtitleBOpacity }}
        >
          The energy transition requires new connection infrastructure between generators and the transmission network
        </motion.p>
      </motion.div>

      {/* State C annotation — "Symphony" label */}
      <motion.div
        className="absolute top-[18%] right-[5%] z-10"
        style={{ opacity: anim.stateCAnnotation }}
      >
        <div className="bg-accent/20 border border-accent/40 rounded-xl px-4 py-2 text-center">
          <span className="text-accent-light text-xs md:text-sm font-semibold">Symphony</span>
          <p className={`text-[10px] md:text-xs mt-0.5 ${dark ? 'text-white/40' : 'text-gray-400'}`}>Connection Infrastructure</p>
        </div>
      </motion.div>

      {/* "Generation" label for State A (over the single solar node) */}
      <motion.div
        className="absolute z-10 -translate-x-1/2"
        style={{
          left: useTransform(p.solar.x, (v) => `${v}%`),
          top: useTransform(p.solar.y, (v) => `${v - 12}%`),
          opacity: anim.stateAFade,
        }}
      >
        <span className={`text-xs md:text-sm font-semibold ${dark ? 'text-white/60' : 'text-gray-500'}`}>
          Generation
        </span>
      </motion.div>

      {/* Arrow lines — State A */}
      {stateAArrows.map((arrow, i) => (
        <ChainArrow
          key={`sa-${i}`}
          id={`sa${i}`}
          x1={p[arrow.from].x}
          y1={p[arrow.from].y}
          x2={p[arrow.to].x}
          y2={p[arrow.to].y}
          opacity={anim.stateAFade}
          dark={dark}
        />
      ))}

      {/* Arrow lines — State B */}
      {stateBArrows.map((arrow, i) => (
        <ChainArrow
          key={`sb-${i}`}
          id={`sb${i}`}
          x1={p[arrow.from].x}
          y1={p[arrow.from].y}
          x2={p[arrow.to].x}
          y2={p[arrow.to].y}
          opacity={anim.stateBArrows}
          dark={dark}
        />
      ))}

      {/* Electron particles */}
      {electronPaths.map((ep, i) => (
        <ElectronPath
          key={`e-${i}`}
          id={`e${i}`}
          x1={p[ep.from].x}
          y1={p[ep.from].y}
          x2={p[ep.to].x}
          y2={p[ep.to].y}
          opacity={ep.opacity}
          delay={ep.delay}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <ChainNode
          key={node.id}
          icon={node.icon}
          label={node.label}
          x={p[node.id].x}
          y={p[node.id].y}
          opacity={node.opacity}
          scale={node.scale}
          highlightProgress={node.highlightProgress}
          dark={dark}
        />
      ))}
    </div>
  )
}
