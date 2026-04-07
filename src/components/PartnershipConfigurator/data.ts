import type { Technology, ModelDefinition, ScopePhase, ScopeOwner, CommercialType } from './types'

// ── Phase labels (display order) ──────────────────────────────────

export const PHASES: { id: ScopePhase; label: string }[] = [
  { id: 'siteSelection', label: 'Site selection' },
  { id: 'earlyDesign', label: 'Early design' },
  { id: 'gridConnection', label: 'Grid connection' },
  { id: 'detailedDesign', label: 'Detailed design' },
  { id: 'construction', label: 'Construction' },
  { id: 'oAndM', label: 'O&M' },
]

// ── Technology options ────────────────────────────────────────────

export const TECHNOLOGY_OPTIONS: { id: Technology; label: string }[] = [
  { id: 'wind', label: 'Wind' },
  { id: 'bess', label: 'BESS' },
  { id: 'solar', label: 'Solar' },
  { id: 'datacentre', label: 'Data centre' },
  { id: 'gpg', label: 'GPG' },
]

// ── Helper to build scope arrays ──────────────────────────────────

function scopes(...owners: ScopeOwner[]) {
  return PHASES.map((p, i) => ({ phase: p.id, owner: owners[i] }))
}

// ── Partnership models ────────────────────────────────────────────

export const MODELS: ModelDefinition[] = [
  {
    id: 'development',
    label: 'Development partnership',
    badge: 'Preferred',
    interactive: false,
    defaultScopes: scopes('symphony', 'symphony', 'symphony', 'symphony', 'symphony', 'symphony'),
    commercialMapping: { symphony: 'annualFee', client: 'none', consulting: 'servicesFee' },
    descriptionBold: 'The complete Symphony model — zero capex.',
    description: 'Build, own, operate, maintain from site selection through 30 years of operations. Fixed, indexed annual service fee. We don\'t earn a dollar until the project is live.',
  },
  {
    id: 'delivery',
    label: 'Delivery partnership',
    interactive: false,
    defaultScopes: scopes('client', 'client', 'client', 'symphony', 'symphony', 'symphony'),
    commercialMapping: { symphony: 'annualFee', client: 'none', consulting: 'servicesFee' },
    descriptionBold: 'For developers with sophisticated internal grid teams.',
    description: 'Your team leads development. Symphony takes over from detailed design, delivers construction, and owns and operates the asset for 30 years — all under an annual service fee.',
  },
  {
    id: 'operations',
    label: 'Operations partnership',
    interactive: false,
    defaultScopes: scopes('client', 'client', 'client', 'client', 'client', 'symphony'),
    commercialMapping: { symphony: 'annualFee', client: 'clientCapex', consulting: 'servicesFee' },
    descriptionBold: 'Sale and leaseback.',
    description: 'The client builds using their own delivery capability or third-party EPC. On completion, Symphony acquires the asset and operates it under a long-term annual service agreement. The client removes capex from their balance sheet.',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    interactive: true,
    interactionMode: 'cycle',
    defaultScopes: scopes('client', 'client', 'consulting', 'symphony', 'symphony', 'symphony'),
    commercialMapping: { symphony: 'annualFee', client: 'none', consulting: 'servicesFee' },
    descriptionBold: 'Flexible — configure to suit.',
    description: 'A delivery partnership base with Symphony consulting on selected development scopes. Symphony-led scopes are under the annual fee; consulting is charged as a services fee.',
  },
  {
    id: 'discrete',
    label: 'Discrete services',
    interactive: true,
    interactionMode: 'toggle',
    defaultScopes: scopes('client', 'client', 'client', 'symphony', 'symphony', 'client'),
    commercialMapping: { symphony: 'lumpSum', client: 'none', consulting: 'servicesFee' },
    descriptionBold: 'Individual packages, lump sum basis.',
    description: 'Select specific scopes. All work is delivered on a services / capex basis — no investment wrapping. Our entry point: prove capability, build the relationship.',
  },
]

// ── Color system ──────────────────────────────────────────────────

export interface ScopeColorSet {
  bg: string
  darkBg: string
  text: string
  darkText: string
  border: string
  dashed?: boolean
}

export const SCOPE_COLORS: Record<ScopeOwner, ScopeColorSet> = {
  symphony: {
    bg: '#E6F1FB',
    darkBg: '#0C447C',
    text: '#0C447C',
    darkText: '#E6F1FB',
    border: '#185FA5',
  },
  consulting: {
    bg: '#FAEEDA',
    darkBg: '#412402',
    text: '#412402',
    darkText: '#FAEEDA',
    border: '#854F0B',
  },
  client: {
    bg: '#F1EFE8',
    darkBg: '#2C2C2A',
    text: '#5F5E5A',
    darkText: '#B4B2A9',
    border: '#B4B2A9',
    dashed: true,
  },
}

export const COMMERCIAL_LABELS: Record<CommercialType, string> = {
  annualFee: 'Annual fee',
  lumpSum: 'Lump sum',
  servicesFee: 'Services fee',
  clientCapex: 'Client capex',
  none: '—',
}

export const COMMERCIAL_BAR_LABELS: Record<CommercialType, string> = {
  annualFee: 'Zero Capex — annual service fee',
  lumpSum: 'Lump sum',
  servicesFee: 'Advisory fee',
  clientCapex: 'Client capex',
  none: '',
}

export const OWNER_LABELS: Record<ScopeOwner, string> = {
  symphony: 'Symphony',
  client: 'Client',
  consulting: 'Consulting',
}
