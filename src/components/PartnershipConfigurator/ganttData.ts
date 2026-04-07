import type { GanttRow, GanttPhaseGroup } from './types'

export const GANTT_TOTAL_MONTHS = 24

export const GANTT_GROUPS: { id: GanttPhaseGroup; label: string }[] = [
  { id: 'develop', label: 'Develop' },
  { id: 'deliver', label: 'Deliver' },
  { id: 'operate', label: 'Operate' },
]

export const GANTT_ROWS: GanttRow[] = [
  // ── Develop ──
  {
    id: 'financing',
    label: 'Financing',
    group: 'develop',
    startMonth: 1,
    endMonth: 6,
    modelOwnership: { development: 'symphony', delivery: 'client', operations: 'client', hybrid: 'client', discrete: 'client' },
  },
  {
    id: 'fid',
    label: 'FID',
    group: 'develop',
    startMonth: 6,
    endMonth: 7,
    modelOwnership: { development: 'symphony', delivery: 'client', operations: 'client', hybrid: 'client', discrete: 'client' },
  },
  {
    id: 'procurement',
    label: 'Procurement',
    group: 'develop',
    startMonth: 4,
    endMonth: 12,
    modelOwnership: { development: 'symphony', delivery: 'client', operations: 'client', hybrid: 'symphony', discrete: 'client' },
  },
  // ── Deliver ──
  {
    id: 'design',
    label: 'Design',
    group: 'deliver',
    startMonth: 6,
    endMonth: 14,
    modelOwnership: { development: 'symphony', delivery: 'symphony', operations: 'client', hybrid: 'symphony', discrete: 'symphony' },
  },
  {
    id: 'construction',
    label: 'Construction',
    group: 'deliver',
    startMonth: 12,
    endMonth: 20,
    modelOwnership: { development: 'symphony', delivery: 'symphony', operations: 'client', hybrid: 'symphony', discrete: 'symphony' },
  },
  {
    id: 'commissioning',
    label: 'Commissioning',
    group: 'deliver',
    startMonth: 18,
    endMonth: 22,
    modelOwnership: { development: 'symphony', delivery: 'symphony', operations: 'client', hybrid: 'symphony', discrete: 'client' },
  },
  // ── Operate ──
  {
    id: 'operations',
    label: 'Operations',
    group: 'operate',
    startMonth: 22,
    endMonth: null,
    modelOwnership: { development: 'symphony', delivery: 'symphony', operations: 'symphony', hybrid: 'symphony', discrete: 'client' },
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    group: 'operate',
    startMonth: 22,
    endMonth: null,
    modelOwnership: { development: 'symphony', delivery: 'symphony', operations: 'symphony', hybrid: 'symphony', discrete: 'client' },
  },
]
