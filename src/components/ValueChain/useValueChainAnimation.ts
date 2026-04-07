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

// State A: Coal → Transmission → Distribution → Load (simple linear, spread wide)
const STATE_A: Record<NodeId, NodePosition> = {
  coal:           { x: 10, y: 50 },
  solar:          { x: 10, y: 50 },
  wind:           { x: 10, y: 50 },
  battery:        { x: 10, y: 50 },
  nciSolar:       { x: 10, y: 50 },
  nciWind:        { x: 10, y: 50 },
  nciBattery:     { x: 10, y: 50 },
  transmission:   { x: 37, y: 50 },
  distribution:   { x: 63, y: 50 },
  load:           { x: 90, y: 50 },
  dataCentre:     { x: 72, y: 68 },
  nciDataCentre:  { x: 56, y: 68 },
}

// State B: Thermal stays at top, renewables fan out below — 4 rows
const STATE_B: Record<NodeId, NodePosition> = {
  coal:           { x: 8, y: 12 },
  solar:          { x: 8, y: 34 },
  wind:           { x: 8, y: 56 },
  battery:        { x: 8, y: 78 },
  nciSolar:       { x: 24, y: 34 },
  nciWind:        { x: 24, y: 56 },
  nciBattery:     { x: 24, y: 78 },
  transmission:   { x: 44, y: 44 },
  distribution:   { x: 66, y: 44 },
  load:           { x: 90, y: 44 },
  dataCentre:     { x: 72, y: 72 },
  nciDataCentre:  { x: 56, y: 72 },
}

const ALL_NODES: NodeId[] = [
  'coal', 'solar', 'wind', 'battery',
  'nciSolar', 'nciWind', 'nciBattery',
  'transmission', 'distribution', 'load',
  'dataCentre', 'nciDataCentre',
]

export type NodePositions = Record<NodeId, { x: MotionValue<number>; y: MotionValue<number> }>

export function useValueChainAnimation(scrollYProgress: MotionValue<number>) {
  // Timeline (600vh section) — 5 phases, each ~20% with clean stable zones:
  //
  // Phase 1.1 Traditional  (0.00–0.18)  stable 0.03–0.15  nav→0.06
  //   Title A: fade in 0–0.03, hold 0.03–0.15, fade out 0.15–0.20
  //   State A arrows + electrons visible 0–0.18
  //
  // Phase 1.2 Energy trans  (0.18–0.38)  stable 0.26–0.35  nav→0.30
  //   Morph A→B: 0.17–0.25 (coal fades, renewables appear)
  //   Title B: fade in 0.18–0.23, hold 0.23–0.35, fade out 0.35–0.40
  //   Renewables visible but disconnected
  //
  // Phase 1.3 Connecting    (0.38–0.58)  stable 0.48–0.55  nav→0.50
  //   NCI appear: 0.38–0.46, connection arrows 0.40–0.48
  //   Title C: fade in 0.37–0.42, hold 0.42–0.55, fade out 0.55–0.60
  //   Core chain arrows (trans→dist→load): 0.24–0.32
  //
  // Phase 1.4 Digital       (0.58–0.78)  stable 0.68–0.75  nav→0.70
  //   DC + nciDC appear: 0.58–0.66, DC arrows 0.60–0.68
  //   Title D: fade in 0.57–0.62, hold 0.62–0.75, fade out 0.75–0.80
  //
  // Phase 1.5 Symphony      (0.78–1.00)  stable 0.88–1.00  nav→0.90
  //   NCI highlight: 0.80–0.90
  //   Title E: fade in 0.78–0.84, hold 0.84–1.00

  const positions = {} as NodePositions

  for (const id of ALL_NODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.17, 0.25], [STATE_A[id].x, STATE_B[id].x]),
      y: useTransform(scrollYProgress, [0.17, 0.25], [STATE_A[id].y, STATE_B[id].y]),
    }
  }

  // === Title transitions ===
  const titleAOpacity = useTransform(scrollYProgress, [0, 0.03, 0.15, 0.20], [0, 1, 1, 0])
  const titleBOpacity = useTransform(scrollYProgress, [0.18, 0.23, 0.35, 0.40], [0, 1, 1, 0])
  const titleCOpacity = useTransform(scrollYProgress, [0.37, 0.42, 0.55, 0.60], [0, 1, 1, 0])
  const titleDOpacity = useTransform(scrollYProgress, [0.57, 0.62, 0.75, 0.80], [0, 1, 1, 0])
  const titleEOpacity = useTransform(scrollYProgress, [0.78, 0.84], [0, 1])

  // === Node visibility ===
  // Thermal (coal) stays visible throughout — no fade
  const renewablesOpacity = useTransform(scrollYProgress, [0.19, 0.26], [0, 1])

  // State A direct arrows (coal → trans → dist → load)
  const stateAFade = useTransform(scrollYProgress, [0.10, 0.16], [1, 0])

  // Core chain arrows (thermal→trans, trans→dist→load) appear after morph
  const coreChainArrows = useTransform(scrollYProgress, [0.24, 0.32], [0, 1])

  // NCI boxes (generator side) — appear when connecting to grid (phase 1.3)
  const nciOpacity = useTransform(scrollYProgress, [0.38, 0.46], [0, 1])
  const nciScale = useTransform(scrollYProgress, [0.38, 0.46], [0.7, 1])

  // Arrows + electrons from generators → NCI → transmission
  const connectionArrows = useTransform(scrollYProgress, [0.40, 0.48], [0, 1])

  // DC phase (1.4): dataCentre + nciDataCentre appear, connect to transmission
  const dcOpacity = useTransform(scrollYProgress, [0.58, 0.66], [0, 1])
  const dcScale = useTransform(scrollYProgress, [0.58, 0.66], [0.7, 1])
  const dcArrows = useTransform(scrollYProgress, [0.60, 0.68], [0, 1])

  // NCI highlight (neutral → accent blue) = Symphony reveal (phase 1.5)
  const nciHighlight = useTransform(scrollYProgress, [0.80, 0.90], [0, 1])

  // ISP GW labels next to renewable icons — visible in phase 1.2, fade out when NCI appears
  const ispLabelsOpacity = useTransform(scrollYProgress, [0.19, 0.26, 0.38, 0.46], [0, 1, 1, 0])

  return {
    positions,
    titleAOpacity,
    titleBOpacity,
    titleCOpacity,
    titleDOpacity,
    titleEOpacity,
    renewablesOpacity,
    stateAFade,
    nciOpacity,
    nciScale,
    connectionArrows,
    coreChainArrows,
    dcOpacity,
    dcScale,
    dcArrows,
    nciHighlight,
    ispLabelsOpacity,
  }
}
