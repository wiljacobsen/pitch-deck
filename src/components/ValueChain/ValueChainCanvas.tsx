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
}

function ChainNode({ icon, label, x, y, opacity = 1, scale = 1, highlight = false }: ChainNodeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v}%`)

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
      style={{ left, top, opacity, scale }}
    >
      <div
        className={`
          w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center
          backdrop-blur-md border
          ${highlight
            ? 'bg-accent/15 border-accent/40 text-accent-light'
            : 'bg-white/5 border-white/10 text-white/80'
          }
        `}
      >
        {icon}
      </div>
      <span className={`text-[10px] md:text-xs text-center font-medium whitespace-nowrap ${highlight ? 'text-accent-light' : 'text-white/70'}`}>
        {label}
      </span>
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
}

function ChainArrow({ x1, y1, x2, y2, bidirectional = 0, opacity = 1, id }: ArrowProps) {
  const cx1 = useTransform(x1, (v) => `${v}%`)
  const cy1 = useTransform(y1, (v) => `${v}%`)
  const cx2 = useTransform(x2, (v) => `${v}%`)
  const cy2 = useTransform(y2, (v) => `${v}%`)

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <marker id={`arrowR-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          </marker>
          <marker id={`arrowL-${id}`} viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 10 1 L 1 5 L 10 9" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
          </marker>
        </defs>
        <motion.line
          x1={cx1} y1={cy1} x2={cx2} y2={cy2}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          markerEnd={`url(#arrowR-${id})`}
        />
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
}

function OwnershipBadge({ label, isSymphony, x, y, opacity }: OwnershipBadgeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v + 10}%`)

  return (
    <motion.div
      className="absolute -translate-x-1/2 flex items-center justify-center"
      style={{ left, top, opacity }}
    >
      <span
        className={`
          text-[9px] md:text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap
          ${isSymphony
            ? 'bg-accent/20 text-accent-light border border-accent/30'
            : 'bg-white/5 text-white/50 border border-white/10'
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
}

export default function ValueChainCanvas({ scrollYProgress }: ValueChainCanvasProps) {
  const anim = useValueChainAnimation(scrollYProgress)
  const p = anim.positions

  const nodes: { id: NodeId; icon: React.ReactNode; label: string; highlight?: boolean; opacity?: MotionValue<number> | number; scale?: MotionValue<number> | number }[] = [
    { id: 'generation', icon: <WindTurbine />, label: 'Generation' },
    { id: 'nci1', icon: <Transformer className="w-8 h-8 md:w-10 md:h-10" />, label: 'Network Connection Infrastructure', highlight: true, opacity: anim.nciOpacity, scale: anim.nciScale },
    { id: 'transmission', icon: <PowerTower />, label: 'Transmission' },
    { id: 'nci2', icon: <Transformer className="w-8 h-8 md:w-10 md:h-10" />, label: 'Network Connection Infrastructure', highlight: true, opacity: anim.nciOpacity, scale: anim.nciScale },
    { id: 'industrial', icon: <DataCentre />, label: 'Large Industrial & Digital Load', opacity: anim.industrialOpacity },
    { id: 'distribution', icon: <Transformer className="w-8 h-8 md:w-10 md:h-10" />, label: 'Distribution' },
    { id: 'load', icon: <Buildings />, label: 'Load / Consumers' },
  ]

  const arrows: { from: NodeId; to: NodeId; bidirectional?: boolean; opacity?: MotionValue<number> | number }[] = [
    // State A direct arrows (fade out during transition)
    { from: 'generation', to: 'transmission', opacity: anim.stateALoadLabel },
    { from: 'transmission', to: 'distribution', opacity: anim.stateALoadLabel },
    // State B arrows (fade in during transition)
    { from: 'generation', to: 'nci1', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'nci1', to: 'transmission', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'transmission', to: 'nci2', bidirectional: true, opacity: anim.nciOpacity },
    { from: 'nci2', to: 'industrial', bidirectional: true, opacity: anim.nciOpacity },
    // Branch arrows
    { from: 'transmission', to: 'distribution', opacity: anim.branchOpacity },
    { from: 'distribution', to: 'load' },
  ]

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: anim.titleOpacity }}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-2">Our Role in the Value Chain</h2>
        <p className="text-white/40 text-sm md:text-base">How Symphony connects the energy ecosystem</p>
      </motion.div>

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
        />
      ))}

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
        />
      ))}

      {OWNERSHIP_LABELS.map((label) => (
        <OwnershipBadge
          key={`owner-${label.nodeId}`}
          label={label.text}
          isSymphony={label.isSymphony}
          x={p[label.nodeId].x}
          y={p[label.nodeId].y}
          opacity={anim.ownershipOpacity}
        />
      ))}
    </div>
  )
}
