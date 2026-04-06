import { useTransform, type MotionValue } from 'motion/react'

export type NodeId =
  | 'coal'
  | 'solar'
  | 'wind'
  | 'battery'
  | 'nciSolar'
  | 'nciWind'
  | 'nciBattery'
  | 'transmission'
  | 'distribution'
  | 'load'
  | 'dataCentre'
  | 'nciDataCentre'

interface NodePosition {
  x: number
  y: number
}

// State A: Coal → Transmission → Distribution → Load (simple linear)
const STATE_A: Record<NodeId, NodePosition> = {
  coal:           { x: 15, y: 50 },
  solar:          { x: 15, y: 50 },
  wind:           { x: 15, y: 50 },
  battery:        { x: 15, y: 50 },
  nciSolar:       { x: 15, y: 50 },
  nciWind:        { x: 15, y: 50 },
  nciBattery:     { x: 15, y: 50 },
  transmission:   { x: 40, y: 50 },
  distribution:   { x: 65, y: 50 },
  load:           { x: 90, y: 50 },
  dataCentre:     { x: 90, y: 50 },
  nciDataCentre:  { x: 90, y: 50 },
}

// State B: Renewables fanned out in column, coal fades out at top
const STATE_B: Record<NodeId, NodePosition> = {
  coal:           { x: 10, y: 18 },
  solar:          { x: 10, y: 18 },
  wind:           { x: 10, y: 44 },
  battery:        { x: 10, y: 70 },
  nciSolar:       { x: 26, y: 18 },
  nciWind:        { x: 26, y: 44 },
  nciBattery:     { x: 26, y: 70 },
  transmission:   { x: 46, y: 44 },
  distribution:   { x: 68, y: 44 },
  load:           { x: 90, y: 44 },
  dataCentre:     { x: 90, y: 44 },
  nciDataCentre:  { x: 78, y: 44 },
}

// State C overrides: load shifts up, DC + nciDC drop down
const STATE_C: Partial<Record<NodeId, NodePosition>> = {
  distribution:   { x: 68, y: 36 },
  load:           { x: 90, y: 24 },
  dataCentre:     { x: 90, y: 62 },
  nciDataCentre:  { x: 78, y: 62 },
}

// Nodes that only morph A→B
const SIMPLE_NODES: NodeId[] = [
  'coal', 'solar', 'wind', 'battery',
  'nciSolar', 'nciWind', 'nciBattery',
  'transmission',
]

// Nodes that morph A→B then B→C
const DUAL_NODES: NodeId[] = [
  'distribution', 'load', 'dataCentre', 'nciDataCentre',
]

export type NodePositions = Record<NodeId, { x: MotionValue<number>; y: MotionValue<number> }>

export function useValueChainAnimation(scrollYProgress: MotionValue<number>) {
  // Timeline (600vh section):
  // 0.00–0.06  State A fades in — Traditional chain with coal
  // 0.06–0.12  Title A fades out
  // 0.10–0.14  Title B fades in (energy transition)
  // 0.10–0.22  Positions morph A→B, coal fades, renewables appear — NO arrows from renewables yet
  // 0.22–0.28  Pause (renewables visible but disconnected)
  // 0.26–0.32  Title B fades out, Title C fades in (connecting to grid)
  // 0.30–0.40  NCI boxes appear, generator→NCI→transmission arrows + electrons
  // 0.40–0.46  Pause (all connected)
  // 0.44–0.50  Title C fades out, Title D fades in (digital growth)
  // 0.48–0.58  Load shifts up, DC + nciDC appear, DC arrows + electrons
  // 0.58–0.64  Pause (DC connected)
  // 0.62–0.68  Title D fades out, Title E fades in (Symphony)
  // 0.66–0.78  NCI highlight (all NCI including nciDC)
  // 0.78–1.00  Hold final state

  const positions = {} as NodePositions

  // Simple A→B morph nodes
  for (const id of SIMPLE_NODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.10, 0.22], [STATE_A[id].x, STATE_B[id].x]),
      y: useTransform(scrollYProgress, [0.10, 0.22], [STATE_A[id].y, STATE_B[id].y]),
    }
  }

  // Dual A→B→C morph nodes
  for (const id of DUAL_NODES) {
    const c = STATE_C[id]!
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.10, 0.22, 0.48, 0.58], [STATE_A[id].x, STATE_B[id].x, STATE_B[id].x, c.x]),
      y: useTransform(scrollYProgress, [0.10, 0.22, 0.48, 0.58], [STATE_A[id].y, STATE_B[id].y, STATE_B[id].y, c.y]),
    }
  }

  // === Title transitions ===
  const titleAOpacity = useTransform(scrollYProgress, [0, 0.04, 0.06, 0.12], [0, 1, 1, 0])
  const titleBOpacity = useTransform(scrollYProgress, [0.10, 0.16, 0.24, 0.30], [0, 1, 1, 0])
  const titleCOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.42, 0.48], [0, 1, 1, 0])
  const titleDOpacity = useTransform(scrollYProgress, [0.46, 0.52, 0.60, 0.66], [0, 1, 1, 0])
  const titleEOpacity = useTransform(scrollYProgress, [0.64, 0.72], [0, 1])

  // === Node visibility ===
  const coalOpacity = useTransform(scrollYProgress, [0.10, 0.20], [1, 0])
  const renewablesOpacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1])
  const stateAFade = useTransform(scrollYProgress, [0.08, 0.16], [1, 0])

  // NCI boxes (generator side) — appear when connecting to grid
  const nciOpacity = useTransform(scrollYProgress, [0.30, 0.40], [0, 1])
  const nciScale = useTransform(scrollYProgress, [0.30, 0.40], [0.7, 1])

  // Arrows + electrons from generators → NCI → transmission
  const connectionArrows = useTransform(scrollYProgress, [0.32, 0.42], [0, 1])

  // Core chain arrows (transmission → distribution → load) from State B onward
  const coreChainArrows = useTransform(scrollYProgress, [0.20, 0.30], [0, 1])

  // DC phase: dataCentre + nciDataCentre appear
  const dcOpacity = useTransform(scrollYProgress, [0.48, 0.58], [0, 1])
  const dcScale = useTransform(scrollYProgress, [0.48, 0.58], [0.7, 1])

  // DC connection arrows + electrons
  const dcArrows = useTransform(scrollYProgress, [0.50, 0.60], [0, 1])

  // Arrow from distribution up to load (appears when load shifts up)
  const loadBranchArrow = useTransform(scrollYProgress, [0.52, 0.60], [0, 1])

  // NCI highlight (neutral → accent blue) = Symphony reveal — ALL NCI including DC
  const nciHighlight = useTransform(scrollYProgress, [0.66, 0.78], [0, 1])

  return {
    positions,
    titleAOpacity,
    titleBOpacity,
    titleCOpacity,
    titleDOpacity,
    titleEOpacity,
    coalOpacity,
    renewablesOpacity,
    stateAFade,
    nciOpacity,
    nciScale,
    connectionArrows,
    coreChainArrows,
    dcOpacity,
    dcScale,
    dcArrows,
    loadBranchArrow,
    nciHighlight,
  }
}
