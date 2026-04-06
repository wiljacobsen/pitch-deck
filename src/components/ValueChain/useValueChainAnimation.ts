import { useTransform, type MotionValue } from 'motion/react'

export type NodeId =
  | 'coal'       // State A generation (replaced later)
  | 'solar'
  | 'wind'
  | 'battery'
  | 'nciSolar'
  | 'nciWind'
  | 'nciBattery'
  | 'transmission'
  | 'distribution'
  | 'load'

interface NodePosition {
  x: number
  y: number
}

// State A: Coal → Transmission → Distribution → Load (simple linear)
const STATE_A: Record<NodeId, NodePosition> = {
  coal:         { x: 10, y: 50 },
  solar:        { x: 10, y: 50 },
  wind:         { x: 10, y: 50 },
  battery:      { x: 10, y: 50 },
  nciSolar:     { x: 10, y: 50 },
  nciWind:      { x: 10, y: 50 },
  nciBattery:   { x: 10, y: 50 },
  transmission: { x: 37, y: 50 },
  distribution: { x: 63, y: 50 },
  load:         { x: 90, y: 50 },
}

// State B: Coal fades, renewables appear in column (not connected yet)
// State C: NCI boxes appear and everything connects
const STATE_B: Record<NodeId, NodePosition> = {
  coal:         { x: 8,  y: 25 }, // fades out
  solar:        { x: 8,  y: 25 },
  wind:         { x: 8,  y: 47 },
  battery:      { x: 8,  y: 69 },
  nciSolar:     { x: 24, y: 25 },
  nciWind:      { x: 24, y: 47 },
  nciBattery:   { x: 24, y: 69 },
  transmission: { x: 45, y: 47 },
  distribution: { x: 68, y: 47 },
  load:         { x: 90, y: 47 },
}

const ALL_NODES: NodeId[] = [
  'coal', 'solar', 'wind', 'battery',
  'nciSolar', 'nciWind', 'nciBattery',
  'transmission', 'distribution', 'load',
]

export type NodePositions = Record<NodeId, { x: MotionValue<number>; y: MotionValue<number> }>

export function useValueChainAnimation(scrollYProgress: MotionValue<number>) {
  // Timeline (500vh section):
  // 0.00–0.12: State A — Traditional chain with coal generator
  // 0.12–0.20: Title A fades, Title B fades in
  // 0.20–0.38: Coal fades out, renewables (solar/wind/battery) appear in column, spread out
  // 0.38–0.45: Pause — renewables visible but NOT connected
  // 0.45–0.55: Title C fades in — "they need grid connection"
  // 0.50–0.65: NCI boxes appear, arrows connect generators → NCI → transmission
  // 0.65–0.75: Pause — everything connected, neutral colors
  // 0.75–0.88: NCI boxes highlight to accent color (Symphony)
  // 0.88–1.00: Hold final state

  // Node positions interpolated A → B
  const positions = {} as NodePositions
  for (const id of ALL_NODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.18, 0.38], [STATE_A[id].x, STATE_B[id].x]),
      y: useTransform(scrollYProgress, [0.18, 0.38], [STATE_A[id].y, STATE_B[id].y]),
    }
  }

  // === Title/subtitle transitions ===
  const titleAOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14, 0.20], [0, 1, 1, 0])
  const titleBOpacity = useTransform(scrollYProgress, [0.18, 0.26, 0.42, 0.48], [0, 1, 1, 0])
  const titleCOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.72, 0.78], [0, 1, 1, 0])
  const titleDOpacity = useTransform(scrollYProgress, [0.76, 0.84], [0, 1])

  // === Node visibility ===
  // Coal visible in State A, fades out during transition
  const coalOpacity = useTransform(scrollYProgress, [0.18, 0.28], [1, 0])

  // Renewables fade in during expansion
  const renewablesOpacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1])

  // State A direct arrows
  const stateAFade = useTransform(scrollYProgress, [0.15, 0.25], [1, 0])

  // NCI boxes appear later (after renewables are shown disconnected)
  const nciOpacity = useTransform(scrollYProgress, [0.50, 0.62], [0, 1])
  const nciScale = useTransform(scrollYProgress, [0.50, 0.62], [0.7, 1])

  // Arrows from generators → NCI → transmission
  const connectionArrows = useTransform(scrollYProgress, [0.55, 0.65], [0, 1])

  // Transmission → distribution → load arrows (persist from State B onward)
  const coreChainArrows = useTransform(scrollYProgress, [0.30, 0.40], [0, 1])

  // NCI highlight (neutral → accent blue) = Symphony reveal
  const nciHighlight = useTransform(scrollYProgress, [0.76, 0.88], [0, 1])

  return {
    positions,
    titleAOpacity,
    titleBOpacity,
    titleCOpacity,
    titleDOpacity,
    coalOpacity,
    renewablesOpacity,
    stateAFade,
    nciOpacity,
    nciScale,
    connectionArrows,
    coreChainArrows,
    nciHighlight,
  }
}
