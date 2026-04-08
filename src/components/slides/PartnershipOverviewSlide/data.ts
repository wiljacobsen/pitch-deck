// ── Phase definitions for the overview graphic ──────────────────────

export interface OverviewPhase {
  id: string
  label: string
  iconId: string
}

export const OVERVIEW_PHASES: OverviewPhase[] = [
  { id: 'siteSelection',  label: 'Site Selection\n& Grid Strategy',              iconId: 'search' },
  { id: 'earlyDesign',    label: 'Early Planning\n& Design',                     iconId: 'pencil' },
  { id: 'gridConnection', label: 'Grid Modelling &\nConnection Application',     iconId: 'grid' },
  { id: 'detailedDesign', label: 'Detailed Design\n& Engineering',               iconId: 'blueprint' },
  { id: 'construction',   label: 'Procurement,\nConstruction &\nCommissioning',  iconId: 'crane' },
  { id: 'oAndM',          label: 'Operations &\nMaintenance',                    iconId: 'wrench' },
]

// ── Partnership zone definitions ─────────────────────────────────────

export interface PartnershipZone {
  id: string
  label: string
  /** 1-based column start (inclusive) */
  startCol: number
  /** 1-based column end (inclusive) */
  endCol: number
  bullets: string[]
  investLabel: string
}

export const PARTNERSHIP_ZONES: PartnershipZone[] = [
  {
    id: 'development',
    label: '1. Development Partnership',
    startCol: 1,
    endCol: 6,
    bullets: [
      'Early engagement supporting site selection, grid strategy, connection planning, and design, with continuity through delivery, ownership, operation, and maintenance.',
      'Early engagement enables integrated lifecycle responsibility, optimising design and layout, streamlining grid connection pathways, aligning commercial and technical requirements, reducing cost and delivery risk, and supporting an efficient and cost-effective connection to the network.',
    ],
    investLabel: 'Invest opportunity #1',
  },
  {
    id: 'delivery',
    label: '2. Delivery Partnership',
    startCol: 4,
    endCol: 6,
    bullets: [
      'A fully outsourced delivery and operations solution where Symphony funds, builds, owns, operates, and maintains the asset.',
      'Converts upfront capital expenditure into a long-term operating cost, transferring delivery, performance, and operational risk to Symphony while providing predictable, whole-of-life outcomes.',
    ],
    investLabel: 'Invest opportunity #2',
  },
  {
    id: 'operations',
    label: '3. Operation Partnership',
    startCol: 6,
    endCol: 6,
    bullets: [
      'Lease and buy-back structures for existing or planned asset.',
      'Frees up client capital and transfers technical and operational responsibility to a specialist platform with lower cost of capital and deep network infrastructure expertise, improving long-term cost and performance outcomes.',
    ],
    investLabel: 'Invest opportunity #3',
  },
]
