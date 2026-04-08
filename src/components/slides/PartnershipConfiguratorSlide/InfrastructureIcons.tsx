'use client'

// Simple monochrome SVG icons for infrastructure matrix column headers
// All use currentColor and accept className for sizing/color

interface IconProps {
  className?: string
}

function WindTurbineIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <line x1="16" y1="14" x2="16" y2="30" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="12" r="2" fill="currentColor" />
      <path d="M16 12L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 12L24 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 12L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function ReticulationIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <line x1="4" y1="8" x2="4" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="8" x2="28" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}

function SubstationIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="6" y="10" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="11" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="21" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SwitchyardIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="12" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="6" x2="10" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="22" y1="6" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function TransmissionTowerIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="8" x2="12" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="8" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="6" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="26" y1="6" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function BatteryIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="14" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="20" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.2" />
      <path d="M28 14h2v4h-2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ElectricalBOPIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10l-4 6h8l-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CivilBOPIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="20" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="14" width="16" height="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="14" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="10" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function SolarPanelIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="8" width="24" height="14" rx="1" stroke="currentColor" strokeWidth="2" transform="rotate(-10 16 15)" />
      <line x1="10" y1="8" x2="10" y2="22" stroke="currentColor" strokeWidth="1" transform="rotate(-10 16 15)" />
      <line x1="16" y1="8" x2="16" y2="22" stroke="currentColor" strokeWidth="1" transform="rotate(-10 16 15)" />
      <line x1="22" y1="8" x2="22" y2="22" stroke="currentColor" strokeWidth="1" transform="rotate(-10 16 15)" />
      <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="28" x2="20" y2="28" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function InverterIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16c2-4 4 4 6 0s4 4 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="24" x2="10" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="24" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function DataHallIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="8" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="14" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="20" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="10" r="1" fill="currentColor" />
      <circle cx="20" cy="16" r="1" fill="currentColor" />
      <circle cx="20" cy="22" r="1" fill="currentColor" />
    </svg>
  )
}

function CoolingIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="10" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11.8" y1="11.8" x2="20.2" y2="20.2" stroke="currentColor" strokeWidth="1" />
      <line x1="20.2" y1="11.8" x2="11.8" y2="20.2" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function GasPlantIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="14" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="8" width="6" height="20" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M24 8c0-2 1-4 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="21" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function GasSupplyIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="14" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="16" x2="4" y2="22" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="16" x2="28" y2="22" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

// ── Lookup map ───────────────────────────────────────────────────

export const INFRA_ICONS: Record<string, React.FC<IconProps>> = {
  windTurbine: WindTurbineIcon,
  reticulation: ReticulationIcon,
  substation: SubstationIcon,
  switchyard: SwitchyardIcon,
  transmissionTower: TransmissionTowerIcon,
  battery: BatteryIcon,
  electricalBOP: ElectricalBOPIcon,
  civilBOP: CivilBOPIcon,
  solarPanel: SolarPanelIcon,
  inverter: InverterIcon,
  dataHall: DataHallIcon,
  cooling: CoolingIcon,
  gasPlant: GasPlantIcon,
  gasSupply: GasSupplyIcon,
}
