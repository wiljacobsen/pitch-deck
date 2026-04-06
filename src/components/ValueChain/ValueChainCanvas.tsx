import { motion, type MotionValue, useTransform } from 'motion/react'
import { WindTurbine, PowerTower, Transformer, Buildings, DataCentre } from '../../icons'
import { useValueChainAnimation, OWNERSHIP_LABELS, type NodeId } from './useValueChainAnimation'

interface ChainNodeProps {
  icon: React.ReactNode
  label: string
  x: MotionValue<number>
  y: MotionValue<number>
  opacity?: MotionValue<number> | number
  scale?: MotionValue<number> | number
  highlight?: boolean
  dark: boolean
}

function ChainNode({ icon, label, x, y, opacity = 1, scale = 1, highlight = false, dark }: ChainNodeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v}%`)

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
      style={{ left, top, opacity, scale }}
    >
      <div
        className={`
          w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center
          border transition-colors duration-500
          ${highlight
            ? dark
              ? 'bg-accent/20 border-accent/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
              : 'bg-blue-50 border-accent/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
            : dark
              ? 'bg-white/10 border-white/20'
              : 'bg-white border-gray-300 shadow-sm'
          }
        `}
      >
        <div className={highlight ? 'text-accent' : dark ? 'text-white' : 'text-gray-700'}>
          {icon}
        </div>
      </div>
      <span className={`text-xs md:text-sm text-center font-medium whitespace-nowrap ${highlight ? (dark ? 'text-accent-light' : 'text-accent') : dark ? 'text-white/80' : 'text-gray-600'}`}>
        {label}
      </span>
    </motion.div>
  )
}

// Animated electron dots that travel along the connection lines
interface ElectronPathProps {
  x1: MotionValue<number>
  y1: MotionValue<number>
  x2: MotionValue<number>
  y2: MotionValue<number>
  opacity?: MotionValue<number> | number
  delay: number
  id: string
}

function ElectronPath({ x1, y1, x2, y2, opacity = 1, delay, id }: ElectronPathProps) {
  const sx = useTransform(x1, (v) => `${v}%`)
  const sy = useTransform(y1, (v) => `${v}%`)
  const ex = useTransform(x2, (v) => `${v}%`)
  const ey = useTransform(y2, (v) => `${v}%`)

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <linearGradient id={`eg-${id}`}>
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Electron dots traveling left to right only */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="3"
            fill="#3B82F6"
            filter="url(#glow)"
            initial={{ cx: sx.get(), cy: sy.get() }}
          >
            <animate
              attributeName="cx"
              values={`${sx.get()};${ex.get()}`}
              dur="5s"
              begin={`${delay + i * 1.6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${sy.get()};${ey.get()}`}
              dur="5s"
              begin={`${delay + i * 1.6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              dur="5s"
              begin={`${delay + i * 1.6}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
      </svg>
    </motion.div>
  )
}

interface ArrowProps {
  x1: MotionValue<number>
  y1: MotionValue<number>
  x2: MotionValue<number>
  y2: MotionValue<number>
  bidirectional?: MotionValue<number> | number
  opacity?: MotionValue<number> | number
  id: string
  dark: boolean
}

function ChainArrow({ x1, y1, x2, y2, bidirectional = 0, opacity = 1, id, dark }: ArrowProps) {
  const cx1 = useTransform(x1, (v) => `${v}%`)
  const cy1 = useTransform(y1, (v) => `${v}%`)
  const cx2 = useTransform(x2, (v) => `${v}%`)
  const cy2 = useTransform(y2, (v) => `${v}%`)

  const lineColor = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
  const arrowColor = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'

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
          <marker id={`arrowR-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={arrowColor} strokeWidth="1.5" />
          </marker>
          <marker id={`arrowL-${id}`} viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 10 1 L 1 5 L 10 9" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
          </marker>
        </defs>
        <motion.line
          x1={cx1} y1={cy1} x2={cx2} y2={cy2}
          stroke={lineColor}
          strokeWidth="1"
          markerEnd={`url(#arrowR-${id})`}
        />
        {/* Electron particles along the arrow */}
        {[0, 1, 2].map((i) => (
          <circle key={i} r="2.5" fill="#3B82F6" opacity="0" filter="url(#glow)">
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.5s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <motion.div className="absolute inset-0" style={{ opacity: bidirectional }}>
        <svg className="w-full h-full absolute inset-0" overflow="visible">
          <motion.line
            x1={cx2} y1={cy2} x2={cx1} y2={cy1}
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
            markerEnd={`url(#arrowL-${id})`}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

interface OwnershipBadgeProps {
  label: string
  isSymphony: boolean
  x: MotionValue<number>
  y: MotionValue<number>
  opacity: MotionValue<number>
  dark: boolean
}

function OwnershipBadge({ label, isSymphony, x, y, opacity, dark }: OwnershipBadgeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v + 12}%`)

  return (
    <motion.div
      className="absolute -translate-x-1/2 flex items-center justify-center"
      style={{ left, top, opacity }}
    >
      <span
        className={`
          text-[9px] md:text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap transition-colors duration-500
          ${isSymphony
            ? 'bg-accent/20 text-accent-light border border-accent/30'
            : dark
              ? 'bg-white/5 text-white/50 border border-white/10'
              : 'bg-gray-100 text-gray-500 border border-gray-200'
          }
        `}
      >
        {label}
      </span>
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

  const iconSize = "w-12 h-12 md:w-14 md:h-14"
  const nciIconSize = "w-10 h-10 md:w-12 md:h-12"

  const nodes: { id: NodeId; icon: React.ReactNode; label: string; highlight?: boolean; opacity?: MotionValue<number> | number; scale?: MotionValue<number> | number }[] = [
    { id: 'generation', icon: <WindTurbine className={iconSize} />, label: 'Generation' },
    { id: 'nci1', icon: <Transformer className={nciIconSize} />, label: 'Network Connection Infrastructure', highlight: true, opacity: anim.nciOpacity, scale: anim.nciScale },
    { id: 'transmission', icon: <PowerTower className={iconSize} />, label: 'Transmission' },
    { id: 'nci2', icon: <Transformer className={nciIconSize} />, label: 'Network Connection Infrastructure', highlight: true, opacity: anim.nciOpacity, scale: anim.nciScale },
    { id: 'industrial', icon: <DataCentre className={iconSize} />, label: 'Large Industrial & Digital Load', opacity: anim.industrialOpacity },
    { id: 'distribution', icon: <Transformer className={nciIconSize} />, label: 'Distribution' },
    { id: 'load', icon: <Buildings className={iconSize} />, label: 'Load / Consumers' },
  ]

  const arrows: { from: NodeId; to: NodeId; bidirectional?: boolean; opacity?: MotionValue<number> | number }[] = [
    { from: 'generation', to: 'transmission', opacity: anim.stateALoadLabel },
    { from: 'transmission', to: 'distribution', opacity: anim.stateALoadLabel },
    { from: 'generation', to: 'nci1', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'nci1', to: 'transmission', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'transmission', to: 'nci2', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'nci2', to: 'industrial', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'transmission', to: 'distribution', opacity: anim.branchOpacity },
    { from: 'distribution', to: 'load' },
  ]

  // Electron paths follow the same connections as arrows
  const electronPaths: { from: NodeId; to: NodeId; opacity?: MotionValue<number> | number; delay: number }[] = [
    { from: 'generation', to: 'transmission', opacity: anim.stateALoadLabel, delay: 0 },
    { from: 'transmission', to: 'distribution', opacity: anim.stateALoadLabel, delay: 0.5 },
    { from: 'distribution', to: 'load', delay: 1 },
    { from: 'generation', to: 'nci1', opacity: anim.nciOpacity, delay: 0.2 },
    { from: 'nci1', to: 'transmission', opacity: anim.nciOpacity, delay: 0.7 },
    { from: 'transmission', to: 'nci2', opacity: anim.nciOpacity, delay: 0.4 },
    { from: 'nci2', to: 'industrial', opacity: anim.nciOpacity, delay: 0.9 },
  ]

  return (
    <div className="relative w-full h-full">
      {/* Global SVG filter for electron glow */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: anim.titleOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-2 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>
          The Traditional Energy Value Chain
        </h2>
        <p className={`text-sm md:text-base transition-colors duration-500 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
          How electricity flows from generation to consumption
        </p>
      </motion.div>

      {/* Arrow lines */}
      {arrows.map((arrow, i) => (
        <ChainArrow
          key={`arrow-${i}`}
          id={`a${i}`}
          x1={p[arrow.from].x}
          y1={p[arrow.from].y}
          x2={p[arrow.to].x}
          y2={p[arrow.to].y}
          bidirectional={arrow.bidirectional ? anim.bidirectionalOpacity : 0}
          opacity={arrow.opacity}
          dark={dark}
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
          highlight={node.highlight}
          dark={dark}
        />
      ))}

      {/* Electron particles — rendered on top of nodes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {electronPaths.map((ep, i) => (
          <ElectronPath
            key={`electron-${i}`}
            id={`e${i}`}
            x1={p[ep.from].x}
            y1={p[ep.from].y}
            x2={p[ep.to].x}
            y2={p[ep.to].y}
            opacity={ep.opacity}
            delay={ep.delay}
          />
        ))}
      </div>

      {/* Ownership labels */}
      {OWNERSHIP_LABELS.map((label) => (
        <OwnershipBadge
          key={`owner-${label.nodeId}`}
          label={label.text}
          isSymphony={label.isSymphony}
          x={p[label.nodeId].x}
          y={p[label.nodeId].y}
          opacity={anim.ownershipOpacity}
          dark={dark}
        />
      ))}
    </div>
  )
}
