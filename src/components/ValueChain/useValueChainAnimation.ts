import { useTransform, type MotionValue } from 'motion/react'

export type NodeId =
  | 'generation'
  | 'nci1'
  | 'transmission'
  | 'nci2'
  | 'industrial'
  | 'distribution'
  | 'load'

export type OwnershipLabel = {
  nodeId: NodeId
  text: string
  isSymphony: boolean
}

export const OWNERSHIP_LABELS: OwnershipLabel[] = [
  { nodeId: 'generation', text: 'Our Clients', isSymphony: false },
  { nodeId: 'nci1', text: 'Symphony', isSymphony: true },
  { nodeId: 'transmission', text: 'Regulated TNSP', isSymphony: false },
  { nodeId: 'nci2', text: 'Symphony', isSymphony: true },
  { nodeId: 'industrial', text: 'Our Clients', isSymphony: false },
]

interface NodePosition {
  x: number
  y: number
}

const MAIN_Y = 40
const BRANCH_Y = 70

const STATE_A: Record<NodeId, NodePosition> = {
  generation:   { x: 10, y: MAIN_Y },
  nci1:         { x: 30, y: MAIN_Y },
  transmission: { x: 35, y: MAIN_Y },
  nci2:         { x: 55, y: MAIN_Y },
  industrial:   { x: 60, y: MAIN_Y },
  distribution: { x: 60, y: MAIN_Y },
  load:         { x: 85, y: MAIN_Y },
}

const STATE_B: Record<NodeId, NodePosition> = {
  generation:   { x: 5,  y: MAIN_Y },
  nci1:         { x: 20, y: MAIN_Y },
  transmission: { x: 38, y: MAIN_Y },
  nci2:         { x: 56, y: MAIN_Y },
  industrial:   { x: 78, y: MAIN_Y },
  distribution: { x: 56, y: BRANCH_Y },
  load:         { x: 78, y: BRANCH_Y },
}

const ALL_NODES: NodeId[] = ['generation', 'nci1', 'transmission', 'nci2', 'industrial', 'distribution', 'load']

export type NodePositions = Record<NodeId, { x: MotionValue<number>; y: MotionValue<number> }>

export function useValueChainAnimation(scrollYProgress: MotionValue<number>) {
  // Pre-compute ALL node positions as MotionValues (hooks at top level)
  const positions = {} as NodePositions
  for (const id of ALL_NODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    positions[id] = {
      x: useTransform(scrollYProgress, [0.3, 0.55], [STATE_A[id].x, STATE_B[id].x]),
      y: useTransform(scrollYProgress, [0.3, 0.55], [STATE_A[id].y, STATE_B[id].y]),
    }
  }

  const nciOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const nciScale = useTransform(scrollYProgress, [0.3, 0.5], [0.7, 1])
  const industrialOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const branchOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const bidirectionalOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
  const ownershipOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const stateALoadLabel = useTransform(scrollYProgress, [0.3, 0.4], [1, 0])

  return {
    positions,
    nciOpacity,
    nciScale,
    industrialOpacity,
    branchOpacity,
    bidirectionalOpacity,
    ownershipOpacity,
    titleOpacity,
    stateALoadLabel,
  }
}
