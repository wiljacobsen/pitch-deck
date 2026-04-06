import { useTransform, type MotionValue } from 'motion/react'

export type NodeId =
  | 'solar'
  | 'wind'
  | 'battery'
  | 'gas'
  | 'nciSolar'
  | 'nciWind'
  | 'nciBattery'
  | 'nciGas'
  | 'transmission'
  | 'distribution'
  | 'load'

interface NodePosition {
  x: number
  y: number
}

// State A: simple linear chain (only solar/transmission/distribution/load visible)
// wind/battery/gas stacked behind solar, NCI nodes hidden
const STATE_A: Record<NodeId, NodePosition> = {
  solar:        { x: 10, y: 45 },
  wind:         { x: 10, y: 45 },
  battery:      { x: 10, y: 45 },
  gas:          { x: 10, y: 45 },
  nciSolar:     { x: 10, y: 45 },
  nciWind:      { x: 10, y: 45 },
  nciBattery:   { x: 10, y: 45 },
  nciGas:       { x: 10, y: 45 },
  transmission: { x: 37, y: 45 },
  distribution: { x: 63, y: 45 },
  load:         { x: 90, y: 45 },
}

// State B: generators expand into left column, each with NCI box
const STATE_B: Record<NodeId, NodePosition> = {
  solar:        { x: 8,  y: 20 },
  wind:         { x: 8,  y: 38 },
  battery:      { x: 8,  y: 56 },
  gas:          { x: 8,  y: 74 },
  nciSolar:     { x: 24, y: 20 },
  nciWind:      { x: 24, y: 38 },
  nciBattery:   { x: 24, y: 56 },
  nciGas:       { x: 24, y: 74 },
  transmission: { x: 45, y: 45 },
  distribution: { x: 68, y: 45 },
  load:         { x: 90, y: 45 },
}

const ALL_NODES: NodeId[] = [
  'solar', 'wind', 'battery', 'gas',
  'nciSolar', 'nciWind', 'nciBattery', 'nciGas',
  'transmission', 'distribution', 'load',
]

const NCI_NODES: NodeId[] = ['nciSolar', 'nciWind', 'nciBattery', 'nciGas']

export type NodePositions = Record<NodeId, { x: MotionValue<number>; y: MotionValue<number> }>

export function useValueChainAnimation(scrollYProgress: MotionValue<number>) {
  // Timeline:
  // 0.0–0.15: State A visible (simple 4-node chain)
  // 0.15–0.45: Morph A → B (generators expand, NCI boxes appear)
  // 0.45–0.6: State B holds
  // 0.6–0.8: State C (NCI boxes highlight to accent color)
  // 0.8–1.0: State C holds

  // All node positions interpolated A → B
  const positions = {} as NodePositions
  for (const id of ALL_NODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.15, 0.45], [STATE_A[id].x, STATE_B[id].x]),
      y: useTransform(scrollYProgress, [0.15, 0.45], [STATE_A[id].y, STATE_B[id].y]),
    }
  }

  // Generator expansion: wind/battery/gas fade in
  const generatorExpand = useTransform(scrollYProgress, [0.18, 0.4], [0, 1])

  // NCI nodes fade/scale in
  const nciOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
  const nciScale = useTransform(scrollYProgress, [0.25, 0.45], [0.7, 1])

  // NCI highlight transition (neutral → accent color) for State C
  const nciHighlight = useTransform(scrollYProgress, [0.6, 0.78], [0, 1])

  // State A direct arrows fade out
  const stateAFade = useTransform(scrollYProgress, [0.15, 0.3], [1, 0])

  // State B arrows (generator → NCI → transmission) fade in
  const stateBArrows = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])

  // Title
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  // Subtitle text transition (State A text fades, State B text appears)
  const subtitleAOpacity = useTransform(scrollYProgress, [0.12, 0.22], [1, 0])
  const subtitleBOpacity = useTransform(scrollYProgress, [0.35, 0.48], [0, 1])

  // State C annotation
  const stateCAnnotation = useTransform(scrollYProgress, [0.65, 0.8], [0, 1])

  return {
    positions,
    generatorExpand,
    nciOpacity,
    nciScale,
    nciHighlight,
    stateAFade,
    stateBArrows,
    titleOpacity,
    subtitleAOpacity,
    subtitleBOpacity,
    stateCAnnotation,
    NCI_NODES,
  }
}
