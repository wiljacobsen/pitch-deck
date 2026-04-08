import type { Technology, TechMatrixDefinition, ResponsibilityOwner, ResponsibilityRow, ModelId } from './types'

// Helper to build a row mapping across all 5 models
type RowMap = Record<ResponsibilityRow, Record<ModelId, ResponsibilityOwner>>

function row(
  investOwn: [ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner],
  designBuild: [ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner],
  operateMaintain: [ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner, ResponsibilityOwner],
): RowMap {
  const models: ModelId[] = ['development', 'delivery', 'operations', 'hybrid', 'discrete']
  const mk = (arr: ResponsibilityOwner[]) =>
    Object.fromEntries(models.map((m, i) => [m, arr[i]])) as Record<ModelId, ResponsibilityOwner>
  return {
    investOwn: mk(investOwn),
    designBuild: mk(designBuild),
    operateMaintain: mk(operateMaintain),
  }
}

// ── Wind ─────────────────────────────────────────────────────────

const WIND: TechMatrixDefinition = {
  columns: [
    { id: 'windfarm', label: 'Windfarm', labelSuffix: 'mw', iconId: 'windTurbine' },
    { id: 'reticulation', label: 'Reticulation', iconId: 'reticulation' },
    { id: 'internalSubs', label: 'Internal Substations', iconId: 'substation' },
    { id: 'connectionSub', label: 'Connection Sub & Switchyard', iconId: 'switchyard' },
    { id: 'publicNetwork', label: 'Public Network', iconId: 'transmissionTower' },
  ],
  responsibilities: {
    //                        Dev          Delivery     Operations   Hybrid       Discrete
    windfarm: row(
      /* invest   */ ['client',           'client',           'client',           'client',           'client'],
      /* design   */ ['symphony',         'client',           'client',           'customerOrSymphony','client'],
      /* operate  */ ['client',           'client',           'client',           'client',           'client'],
    ),
    reticulation: row(
      /* invest   */ ['symphony',         'client',           'client',           'customerOrSymphony','client'],
      /* design   */ ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      /* operate  */ ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    internalSubs: row(
      /* invest   */ ['symphony',         'symphony',         'client',           'symphony',         'client'],
      /* design   */ ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      /* operate  */ ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    connectionSub: row(
      /* invest   */ ['symphony',         'symphony',         'client',           'symphony',         'client'],
      /* design   */ ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      /* operate  */ ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    publicNetwork: row(
      /* invest   */ ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      /* design   */ ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      /* operate  */ ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
    ),
  },
  upsellItems: ['Met masts & resource measurement', 'Bird & bat monitoring', 'LiDAR systems'],
}

// ── BESS ─────────────────────────────────────────────────────────

const BESS: TechMatrixDefinition = {
  columns: [
    { id: 'bess', label: 'BESS', labelSuffix: 'mw', iconId: 'battery' },
    { id: 'electricalBOP', label: 'Electrical BOP', iconId: 'electricalBOP' },
    { id: 'contestableHV', label: 'Contestable HV Asset', iconId: 'substation' },
    { id: 'civilBOP', label: 'Civil BOP', iconId: 'civilBOP' },
    { id: 'nonContestable', label: 'Non-Contestable IUSA', iconId: 'transmissionTower' },
  ],
  responsibilities: {
    bess: row(
      /* invest   */ ['client',           'client',           'client',           'client',           'client'],
      /* design   */ ['symphony',         'client',           'client',           'customerOrSymphony','client'],
      /* operate  */ ['fluence',          'fluence',          'fluence',          'fluence',          'client'],
    ),
    electricalBOP: row(
      /* invest   */ ['customerOrSymphony','client',          'client',           'customerOrSymphony','client'],
      /* design   */ ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      /* operate  */ ['symphony',         'symphony',         'client',           'symphony',         'client'],
    ),
    contestableHV: row(
      /* invest   */ ['symphony',         'symphony',         'client',           'symphony',         'client'],
      /* design   */ ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      /* operate  */ ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    civilBOP: row(
      /* invest   */ ['customerOrSymphony','client',          'client',           'customerOrSymphony','client'],
      /* design   */ ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      /* operate  */ ['none',             'none',             'none',             'none',             'none'],
    ),
    nonContestable: row(
      /* invest   */ ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      /* design   */ ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      /* operate  */ ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
    ),
  },
  upsellItems: ['Energy management systems', 'Asset management solutions'],
}

// ── Solar ────────────────────────────────────────────────────────

const SOLAR: TechMatrixDefinition = {
  columns: [
    { id: 'solarArray', label: 'Solar Array', labelSuffix: 'mw', iconId: 'solarPanel' },
    { id: 'inverterStations', label: 'Inverter Stations', iconId: 'inverter' },
    { id: 'internalRetic', label: 'Internal Reticulation', iconId: 'reticulation' },
    { id: 'connectionSub', label: 'Connection Substation', iconId: 'substation' },
    { id: 'publicNetwork', label: 'Public Network', iconId: 'transmissionTower' },
  ],
  responsibilities: {
    solarArray: row(
      ['client',           'client',           'client',           'client',           'client'],
      ['symphony',         'client',           'client',           'customerOrSymphony','client'],
      ['client',           'client',           'client',           'client',           'client'],
    ),
    inverterStations: row(
      ['customerOrSymphony','client',          'client',           'customerOrSymphony','client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'client',           'symphony',         'client'],
    ),
    internalRetic: row(
      ['symphony',         'client',           'client',           'customerOrSymphony','client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    connectionSub: row(
      ['symphony',         'symphony',         'client',           'symphony',         'client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    publicNetwork: row(
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
    ),
  },
  upsellItems: ['Panel cleaning systems', 'Vegetation management'],
}

// ── Data Centre ──────────────────────────────────────────────────

const DATACENTRE: TechMatrixDefinition = {
  columns: [
    { id: 'dataHall', label: 'Data Hall', labelSuffix: 'mw', iconId: 'dataHall' },
    { id: 'powerDist', label: 'Power Distribution', iconId: 'electricalBOP' },
    { id: 'hvSupply', label: 'HV Supply', iconId: 'substation' },
    { id: 'cooling', label: 'Cooling Infrastructure', iconId: 'cooling' },
    { id: 'gridConnection', label: 'Grid Connection', iconId: 'transmissionTower' },
  ],
  responsibilities: {
    dataHall: row(
      ['client',           'client',           'client',           'client',           'client'],
      ['client',           'client',           'client',           'client',           'client'],
      ['client',           'client',           'client',           'client',           'client'],
    ),
    powerDist: row(
      ['customerOrSymphony','client',          'client',           'customerOrSymphony','client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'client',           'symphony',         'client'],
    ),
    hvSupply: row(
      ['symphony',         'symphony',         'client',           'symphony',         'client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    cooling: row(
      ['client',           'client',           'client',           'client',           'client'],
      ['customerOrSymphony','client',          'client',           'customerOrSymphony','client'],
      ['client',           'client',           'client',           'client',           'client'],
    ),
    gridConnection: row(
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
    ),
  },
}

// ── GPG ──────────────────────────────────────────────────────────

const GPG: TechMatrixDefinition = {
  columns: [
    { id: 'genPlant', label: 'Generation Plant', labelSuffix: 'mw', iconId: 'gasPlant' },
    { id: 'gasSupply', label: 'Gas Supply', iconId: 'gasSupply' },
    { id: 'electricalBOP', label: 'Electrical BOP', iconId: 'electricalBOP' },
    { id: 'substation', label: 'Substation', iconId: 'substation' },
    { id: 'gridConnection', label: 'Grid Connection', iconId: 'transmissionTower' },
  ],
  responsibilities: {
    genPlant: row(
      ['client',           'client',           'client',           'client',           'client'],
      ['symphony',         'client',           'client',           'customerOrSymphony','client'],
      ['client',           'client',           'client',           'client',           'client'],
    ),
    gasSupply: row(
      ['client',           'client',           'client',           'client',           'client'],
      ['client',           'client',           'client',           'client',           'client'],
      ['client',           'client',           'client',           'client',           'client'],
    ),
    electricalBOP: row(
      ['customerOrSymphony','client',          'client',           'customerOrSymphony','client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'client',           'symphony',         'client'],
    ),
    substation: row(
      ['symphony',         'symphony',         'client',           'symphony',         'client'],
      ['symphony',         'symphony',         'client',           'symphony',         'symphony'],
      ['symphony',         'symphony',         'symphony',         'symphony',         'client'],
    ),
    gridConnection: row(
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
      ['tnsp',             'tnsp',             'tnsp',             'tnsp',             'tnsp'],
    ),
  },
}

// ── Export lookup ─────────────────────────────────────────────────

export const TECH_MATRIX: Record<Technology, TechMatrixDefinition> = {
  wind: WIND,
  bess: BESS,
  solar: SOLAR,
  datacentre: DATACENTRE,
  gpg: GPG,
}

export const RESPONSIBILITY_ROW_LABELS: Record<ResponsibilityRow, string> = {
  investOwn: 'Invest & Own',
  designBuild: 'Design & Build',
  operateMaintain: 'Operate & Maintain',
}

export const RESPONSIBILITY_OWNER_LABELS: Record<ResponsibilityOwner, string> = {
  symphony: 'Symphony',
  client: 'Customer',
  customerOrSymphony: 'Customer or Symphony',
  tnsp: 'TNSP',
  fluence: 'Fluence',
  none: '—',
}
