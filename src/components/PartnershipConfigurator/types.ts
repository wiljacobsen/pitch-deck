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

export interface ScopeState {
  phase: ScopePhase
  owner: ScopeOwner
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
  onChange?: (config: { technology: string; model: string; scopes: ScopeState[] }) => void
  compact?: boolean
  theme?: 'light' | 'dark' | 'auto'
}
