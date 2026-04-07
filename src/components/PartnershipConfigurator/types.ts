export type Technology = 'wind' | 'bess' | 'solar' | 'datacentre' | 'gpg'

export type ModelId = 'development' | 'delivery' | 'operations' | 'hybrid' | 'discrete'

export type ScopeOwner = 'symphony' | 'client' | 'consulting'

export type ScopePhase =
  | 'siteSelection'
  | 'earlyDesign'
  | 'gridConnection'
  | 'detailedDesign'
  | 'construction'
  | 'oAndM'

export type CommercialType = 'annualFee' | 'lumpSum' | 'servicesFee' | 'clientCapex' | 'none'

export type ConnectionVoltage = '33' | '66' | '110' | '132' | '220' | '275' | '330' | '400' | '500'

export type OtherBOPOption = 'internalReticulation' | 'bessBOP' | 'switchgear' | 'protectionSystems'

export type WizardStep = 0 | 1 | 2 | 3

// ── Responsibility matrix types ──────────────────────────────────

export type ResponsibilityOwner = 'symphony' | 'client' | 'customerOrSymphony' | 'tnsp' | 'fluence' | 'none'

export type ResponsibilityRow = 'investOwn' | 'designBuild' | 'operateMaintain'

export interface InfraColumn {
  id: string
  label: string
  labelSuffix?: 'mw'
  iconId: string
}

export interface TechMatrixDefinition {
  columns: InfraColumn[]
  responsibilities: Record<string, Record<ResponsibilityRow, Record<ModelId, ResponsibilityOwner>>>
  upsellItems?: string[]
}

// ── Gantt chart types ────────────────────────────────────────────

export type GanttPhaseGroup = 'develop' | 'deliver' | 'operate'

export interface GanttRow {
  id: string
  label: string
  group: GanttPhaseGroup
  startMonth: number
  endMonth: number | null
  modelOwnership: Record<ModelId, 'symphony' | 'client'>
}

// ── Existing interfaces ──────────────────────────────────────────

export interface ScopeState {
  phase: ScopePhase
  owner: ScopeOwner
}

export interface InfrastructureConfig {
  hasSubstation: boolean
  hasSwitchyard: boolean
  hasTransmissionLine: boolean
  transmissionKm: number | null
  transmissionVoltage: ConnectionVoltage | null
  connectionVoltage: ConnectionVoltage | null
  otherBOP: OtherBOPOption[]
}

export interface ProjectConfig {
  technology: Technology
  projectSizeMW: number | null
  infrastructure: InfrastructureConfig
}

export interface ModelDefinition {
  id: ModelId
  label: string
  badge?: string
  interactive: boolean
  interactionMode?: 'cycle' | 'toggle'
  defaultScopes: ScopeState[]
  commercialMapping: Record<ScopeOwner, CommercialType>
  description: string
  descriptionBold: string
}

export interface PartnershipConfiguratorProps {
  defaultTechnology?: Technology
  defaultModel?: ModelId
  onChange?: (config: { technology: string; model: string; scopes: ScopeState[]; project?: ProjectConfig }) => void
  compact?: boolean
  theme?: 'light' | 'dark' | 'auto'
}
