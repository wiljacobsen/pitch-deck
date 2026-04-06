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
// Coal at left, then linear right. Renewables + NCI hidden behind coal.
const STATE_A: Record<NodeId, NodePosition> = {
  coal:         { x: 15, y: 50 },
  solar:        { x: 15, y: 50 },
  wind:         { x: 15, y: 50 },
  battery:      { x: 15, y: 50 },
  nciSolar:     { x: 15, y: 50 },
  nciWind:      { x: 15, y: 50 },
  nciBattery:   { x: 15, y: 50 },
  transmission: { x: 40, y: 50 },
  distribution: { x: 65, y: 50 },
  load:         { x: 90, y: 50 },
}

// State B: Coal fades out at top of column, renewables appear below it in a column.
// Transmission/distribution/load shift down to align with middle of generator column.
// NCI boxes still hidden (same position as their generator for now).
const STATE_B: Record<NodeId, NodePosition> = {
  coal:         { x: 10, y: 28 }, // fades out in place
  solar:        { x: 10, y: 28 },
  wind:         { x: 10, y: 46 },
  battery:      { x: 10, y: 64 },
  nciSolar:     { x: 26, y: 28 },
  nciWind:      { x: 26, y: 46 },
  nciBattery:   { x: 26, y: 64 },
  transmission: { x: 46, y: 46 },
  distribution: { x: 68, y: 46 },
  load:         { x: 90, y: 46 },
}

const ALL_NODES: NodeId[] = [
  'coal', 'solar', 'wind', 'battery',
  'nciSolar', 'nciWind', 'nciBattery',
  'transmission', 'distribution', 'load',
]

export type NodePositions = Record<NodeId, { x: MotionValue<number>; y: MotionValue<number> }>

export function useValueChainAnimation(scrollYProgress: MotionValue<number>) {
  // Timeline (500vh section):
  // 0.00–0.10: State A fades in — Traditional chain with coal generator
  // 0.10–0.18: Title A fades out, Title B fades in
  // 0.14–0.30: Positions morph A → B (coal moves up, renewables fan out below)
  //            Coal fades out, renewables fade in — SAME scroll as title B appearing
  // 0.30–0.40: Pause — renewables visible but NOT connected
  // 0.38–0.46: Title B fades, Title C fades in — "connecting to the grid"
  // 0.42–0.56: NCI boxes appear, arrows connect generators → NCI → transmission
  // 0.56–0.66: Pause — everything connected, neutral colors
  // 0.66–0.78: Title C fades, Title D fades in, NCI boxes highlight (Symphony)
  // 0.78–1.00: Hold final state

  // Node positions interpolated A → B
  const positions = {} as NodePositions
  for (const id of ALL_NODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.14, 0.30], [STATE_A[id].x, STATE_B[id].x]),
      y: useTransform(scrollYProgress, [0.14, 0.30], [STATE_A[id].y, STATE_B[id].y]),
    }
  }

  // === Title/subtitle transitions ===
  const titleAOpacity = useTransform(scrollYProgress, [0, 0.05, 0.10, 0.16], [0, 1, 1, 0])
  const titleBOpacity = useTransform(scrollYProgress, [0.14, 0.20, 0.34, 0.40], [0, 1, 1, 0])
  const titleCOpacity = useTransform(scrollYProgress, [0.38, 0.44, 0.60, 0.66], [0, 1, 1, 0])
  const titleDOpacity = useTransform(scrollYProgress, [0.66, 0.74], [0, 1])

  // === Node visibility ===
  // Coal visible in State A, fades out as renewables appear (same scroll as title B)
  const coalOpacity = useTransform(scrollYProgress, [0.14, 0.24], [1, 0])

  // Renewables fade in during position morph (aligned with title B appearing)
  const renewablesOpacity = useTransform(scrollYProgress, [0.16, 0.28], [0, 1])

  // State A direct arrows (coal → transmission → distribution → load)
  const stateAFade = useTransform(scrollYProgress, [0.12, 0.20], [1, 0])

  // NCI boxes appear later (after renewables are shown disconnected)
  const nciOpacity = useTransform(scrollYProgress, [0.42, 0.54], [0, 1])
  const nciScale = useTransform(scrollYProgress, [0.42, 0.54], [0.7, 1])

  // Arrows from generators → NCI → transmission
  const connectionArrows = useTransform(scrollYProgress, [0.46, 0.56], [0, 1])

  // Transmission → distribution → load arrows (persist from State B onward)
  const coreChainArrows = useTransform(scrollYProgress, [0.24, 0.34], [0, 1])

  // NCI highlight (neutral → accent blue) = Symphony reveal
  const nciHighlight = useTransform(scrollYProgress, [0.68, 0.78], [0, 1])

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
