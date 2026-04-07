import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import GlassCard from '../../ui/GlassCard'
import {
  PHASES, TECHNOLOGY_OPTIONS, MODELS, SCOPE_COLORS,
  COMMERCIAL_BAR_LABELS, OWNER_LABELS, CONNECTION_VOLTAGES,
  OTHER_BOP_OPTIONS, DEFAULT_INFRASTRUCTURE,
} from './data'
import { ResponsibilityMatrix } from './ResponsibilityMatrix'
import { GanttChart } from './GanttChart'
import type {
  Technology, ModelId, ScopeOwner, ScopePhase, ScopeState,
  CommercialType, ConnectionVoltage,
  InfrastructureConfig, WizardStep, PartnershipConfiguratorProps,
} from './types'

// ── Helpers ───────────────────────────────────────────────────────

function getTechLabel(id: Technology) {
  return TECHNOLOGY_OPTIONS.find(t => t.id === id)!.label
}

function getModel(id: ModelId) {
  return MODELS.find(m => m.id === id)!
}

// ── Commercial Bar Segments ──────────────────────────────────────

interface CommercialSegment {
  type: CommercialType
  label: string
  span: number
  owner: ScopeOwner
}

function computeSegments(
  scopes: ScopeState[],
  mapping: Record<ScopeOwner, CommercialType>,
): CommercialSegment[] {
  const segments: CommercialSegment[] = []
  for (const s of scopes) {
    const type = mapping[s.owner]
    const last = segments[segments.length - 1]
    if (last && last.type === type) {
      last.span++
    } else {
      segments.push({
        type,
        label: COMMERCIAL_BAR_LABELS[type],
        span: 1,
        owner: s.owner,
      })
    }
  }
  return segments
}

// ── Chevron Icon ─────────────────────────────────────────────────

function ChevronDown({ open, dark }: { open: boolean; dark: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className={`${dark ? 'text-white/30' : 'text-gray-400'}`}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

// ── Zap Icon (for result summary) ────────────────────────────────

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent shrink-0">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Technology Pill ───────────────────────────────────────────────

function TechnologyPill({ id, label, active, dark, onSelect }: {
  id: Technology; label: string; active: boolean; dark: boolean; onSelect: (id: Technology) => void
}) {
  return (
    <motion.button
      onClick={() => onSelect(id)}
      animate={{ scale: active ? 1.02 : 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`px-3.5 py-2 rounded-full text-[12px] font-medium transition-colors duration-200 cursor-pointer
        ${active
          ? 'bg-accent text-white shadow-sm'
          : dark
            ? 'bg-white/5 text-white/60 hover:bg-white/10'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {label}
    </motion.button>
  )
}

// ── Toggle Button (Yes/No) ───────────────────────────────────────

function ToggleButton({ value, onChange, dark }: {
  value: boolean; onChange: (v: boolean) => void; dark: boolean
}) {
  return (
    <div className={`inline-flex rounded-full p-0.5 ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
      {['Yes', 'No'].map((label) => {
        const isActive = label === 'Yes' ? value : !value
        return (
          <button
            key={label}
            onClick={() => onChange(label === 'Yes')}
            className={`relative px-3 py-1 rounded-full text-[11px] font-medium transition-colors duration-200 cursor-pointer
              ${isActive
                ? dark ? 'bg-white/10 text-white' : 'bg-white text-gray-900 shadow-sm'
                : dark ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ── Toggle Row ───────────────────────────────────────────────────

function ToggleRow({ label, value, onChange, dark }: {
  label: string; value: boolean; onChange: (v: boolean) => void; dark: boolean
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-[12px] font-medium ${dark ? 'text-white/70' : 'text-gray-600'}`}>
        {label}
      </span>
      <ToggleButton value={value} onChange={onChange} dark={dark} />
    </div>
  )
}

// ── Number Input ─────────────────────────────────────────────────

function NumberInput({ value, onChange, placeholder, suffix, dark }: {
  value: number | null; onChange: (v: number | null) => void; placeholder: string; suffix: string; dark: boolean
}) {
  return (
    <div className={`flex items-center rounded-lg border px-3 py-2 ${
      dark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
    }`}>
      <input
        type="number"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        placeholder={placeholder}
        className={`w-full bg-transparent text-[12px] outline-none ${
          dark ? 'text-white placeholder:text-white/30' : 'text-gray-900 placeholder:text-gray-400'
        }`}
      />
      <span className={`text-[11px] font-medium ml-2 shrink-0 ${dark ? 'text-white/30' : 'text-gray-400'}`}>
        {suffix}
      </span>
    </div>
  )
}

// ── Voltage Select ───────────────────────────────────────────────

function VoltageSelect({ value, onChange, dark, placeholder }: {
  value: ConnectionVoltage | null; onChange: (v: ConnectionVoltage | null) => void; dark: boolean; placeholder: string
}) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value ? (e.target.value as ConnectionVoltage) : null)}
      className={`w-full rounded-lg border px-3 py-2 text-[12px] font-medium outline-none cursor-pointer appearance-none ${
        dark
          ? 'bg-white/5 border-white/10 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      } ${!value ? (dark ? 'text-white/30' : 'text-gray-400') : ''}`}
    >
      <option value="">{placeholder}</option>
      {CONNECTION_VOLTAGES.map(v => (
        <option key={v.value} value={v.value}>{v.label}</option>
      ))}
    </select>
  )
}

// ── BOP Checkbox ─────────────────────────────────────────────────

function BOPCheckbox({ label, checked, onChange, dark }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; dark: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 py-1.5 cursor-pointer group w-full text-left"
    >
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
        checked
          ? 'bg-accent border-accent'
          : dark ? 'border-white/20 group-hover:border-white/40' : 'border-gray-300 group-hover:border-gray-400'
      }`}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={`text-[12px] ${dark ? 'text-white/70' : 'text-gray-600'}`}>{label}</span>
    </button>
  )
}

// ── Project Config Panel (Step 1 Expanded) ───────────────────────

function ProjectConfigPanel({ technology, onSelectTech, projectSizeMW, onSizeChange, infrastructure, onInfraChange, dark }: {
  technology: Technology
  onSelectTech: (id: Technology) => void
  projectSizeMW: number | null
  onSizeChange: (v: number | null) => void
  infrastructure: InfrastructureConfig
  onInfraChange: (fn: (prev: InfrastructureConfig) => InfrastructureConfig) => void
  dark: boolean
}) {
  const relevantBOP = OTHER_BOP_OPTIONS.filter(o => o.techs.includes(technology))

  return (
    <div className={`rounded-2xl border p-6 mt-4 ${
      dark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50/50 border-gray-200'
    }`}>
      {/* Technology */}
      <div className="mb-5">
        <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-3 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
          Technology
        </p>
        <div className="flex flex-wrap gap-2">
          {TECHNOLOGY_OPTIONS.map(t => (
            <TechnologyPill key={t.id} id={t.id} label={t.label} active={technology === t.id} dark={dark} onSelect={onSelectTech} />
          ))}
        </div>
      </div>

      {/* Project size */}
      <div className="mb-5">
        <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-2 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
          Project size
        </p>
        <div className="max-w-[200px]">
          <NumberInput value={projectSizeMW} onChange={onSizeChange} placeholder="e.g. 150" suffix="MW" dark={dark} />
        </div>
      </div>

      {/* Infrastructure */}
      <div className="mb-5">
        <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-2 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
          Infrastructure
        </p>
        <div className={`divide-y ${dark ? 'divide-white/5' : 'divide-gray-100'}`}>
          <ToggleRow
            label="Substation?"
            value={infrastructure.hasSubstation}
            onChange={(v) => onInfraChange(prev => ({ ...prev, hasSubstation: v }))}
            dark={dark}
          />
          <ToggleRow
            label="Switchyard?"
            value={infrastructure.hasSwitchyard}
            onChange={(v) => onInfraChange(prev => ({ ...prev, hasSwitchyard: v }))}
            dark={dark}
          />
          <ToggleRow
            label="Transmission line?"
            value={infrastructure.hasTransmissionLine}
            onChange={(v) => onInfraChange(prev => ({
              ...prev,
              hasTransmissionLine: v,
              ...(!v && { transmissionKm: null, transmissionVoltage: null }),
            }))}
            dark={dark}
          />

          {/* Transmission line sub-fields */}
          <AnimatePresence>
            {infrastructure.hasTransmissionLine && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-3 py-3 pl-4">
                  <div className="flex-1">
                    <p className={`text-[10px] font-medium mb-1.5 ${dark ? 'text-white/40' : 'text-gray-400'}`}>Distance</p>
                    <NumberInput
                      value={infrastructure.transmissionKm}
                      onChange={(v) => onInfraChange(prev => ({ ...prev, transmissionKm: v }))}
                      placeholder="e.g. 45"
                      suffix="km"
                      dark={dark}
                    />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] font-medium mb-1.5 ${dark ? 'text-white/40' : 'text-gray-400'}`}>Voltage</p>
                    <VoltageSelect
                      value={infrastructure.transmissionVoltage}
                      onChange={(v) => onInfraChange(prev => ({ ...prev, transmissionVoltage: v }))}
                      dark={dark}
                      placeholder="Select voltage"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Connection voltage */}
      <div className="mb-5">
        <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-2 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
          Connection voltage
        </p>
        <div className="max-w-[200px]">
          <VoltageSelect
            value={infrastructure.connectionVoltage}
            onChange={(v) => onInfraChange(prev => ({ ...prev, connectionVoltage: v }))}
            dark={dark}
            placeholder="Select voltage"
          />
        </div>
      </div>

      {/* Other BOP */}
      {relevantBOP.length > 0 && (
        <div>
          <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-2 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            Other balance of plant
          </p>
          {relevantBOP.map(opt => (
            <BOPCheckbox
              key={opt.id}
              label={opt.label}
              checked={infrastructure.otherBOP.includes(opt.id)}
              onChange={(checked) => {
                onInfraChange(prev => ({
                  ...prev,
                  otherBOP: checked
                    ? [...prev.otherBOP, opt.id]
                    : prev.otherBOP.filter(id => id !== opt.id),
                }))
              }}
              dark={dark}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Model Tabs ────────────────────────────────────────────────────

function ModelTabs({ activeModel, dark, onSelect }: {
  activeModel: ModelId; dark: boolean; onSelect: (id: ModelId) => void
}) {
  return (
    <div className={`flex gap-1 rounded-xl p-1 overflow-x-auto ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
      {MODELS.map(m => {
        const active = activeModel === m.id
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`relative flex-1 min-w-0 px-3 py-2.5 rounded-lg text-[11px] md:text-[12px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap
              ${active
                ? dark ? 'text-white' : 'text-gray-900'
                : dark ? 'text-white/50 hover:text-white/70' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {active && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 rounded-lg ${dark ? 'bg-white/10' : 'bg-white shadow-sm'}`}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex flex-col items-center gap-0.5">
              {m.badge && (
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-accent/20 text-accent leading-none">
                  {m.badge}
                </span>
              )}
              {m.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ── Scope Cell ───────────────────────────────────────────────────

function ScopeCell({ phase, owner, interactive, dark, onClick }: {
  phase: ScopePhase; owner: ScopeOwner; interactive: boolean; dark: boolean
  onClick?: () => void
}) {
  const colors = SCOPE_COLORS[owner]
  const phaseLabel = PHASES.find(p => p.id === phase)!.label

  return (
    <motion.div
      onClick={interactive ? onClick : undefined}
      animate={{
        backgroundColor: dark ? colors.darkBg : colors.bg,
        borderColor: colors.border,
      }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-lg border text-center min-h-[64px] md:min-h-[72px]
        ${colors.dashed ? 'border-dashed' : 'border-solid'}
        ${interactive ? 'cursor-pointer hover:brightness-110 active:scale-[0.98]' : ''}
      `}
    >
      <span
        className="text-[10px] md:text-[11px] font-medium leading-tight"
        style={{ color: dark ? colors.darkText : colors.text }}
      >
        {phaseLabel}
      </span>
      <span
        className="text-[9px] md:text-[10px] font-medium mt-1 opacity-80"
        style={{ color: dark ? colors.darkText : colors.text }}
      >
        {OWNER_LABELS[owner]}
      </span>
    </motion.div>
  )
}

// ── Commercial Bar ───────────────────────────────────────────────

function CommercialBar({ segments, dark }: {
  segments: CommercialSegment[]; dark: boolean
}) {
  const totalSpan = segments.reduce((sum, s) => sum + s.span, 0)

  const getSegmentStyle = (type: CommercialType) => {
    switch (type) {
      case 'annualFee':
        return { bg: dark ? '#0C447C' : '#E6F1FB', color: dark ? '#E6F1FB' : '#0C447C' }
      case 'servicesFee':
      case 'lumpSum':
        return { bg: dark ? '#412402' : '#FAEEDA', color: dark ? '#FAEEDA' : '#412402' }
      case 'clientCapex':
        return { bg: dark ? '#2C2C2A' : '#F1EFE8', color: dark ? '#B4B2A9' : '#5F5E5A' }
      default:
        return { bg: 'transparent', color: 'transparent' }
    }
  }

  return (
    <div className="flex gap-1.5">
      {segments.map((seg, i) => {
        const style = getSegmentStyle(seg.type)
        const widthPct = (seg.span / totalSpan) * 100

        if (seg.type === 'none') {
          return <div key={i} style={{ flex: `0 0 ${widthPct}%` }} />
        }

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-lg py-2.5 px-3 text-center overflow-hidden"
            style={{
              flex: `0 0 calc(${widthPct}% - ${segments.length > 1 ? '3px' : '0px'})`,
              backgroundColor: style.bg,
              color: style.color,
            }}
          >
            <span className="text-[10px] md:text-[11px] font-semibold whitespace-nowrap">
              {seg.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Model Description ─────────────────────────────────────────────

function ModelDescription({ bold, text, dark }: { bold: string; text: string; dark: boolean }) {
  return (
    <div className={`border-l-2 border-accent pl-4 mt-6 ${dark ? 'text-white/70' : 'text-gray-600'}`}>
      <p className="text-[13px] leading-relaxed">
        <strong className={dark ? 'text-white/90' : 'text-gray-800'}>{bold}</strong>{' '}
        {text}
      </p>
    </div>
  )
}

// ── Model Panel (Step 2 Expanded) ────────────────────────────────

function RowLabel({ label, dark }: { label: string; dark: boolean }) {
  return (
    <div className={`flex items-center pr-3 shrink-0 w-[72px] md:w-[88px]`}>
      <span className={`text-[10px] md:text-[11px] font-semibold uppercase tracking-[1px] ${
        dark ? 'text-white/35' : 'text-gray-400'
      }`}>
        {label}
      </span>
    </div>
  )
}

function ModelPanel({ activeModelId, onSelectModel, effectiveScopes, segments, model, interactive, dark, onScopeClick }: {
  activeModelId: ModelId
  onSelectModel: (id: ModelId) => void
  effectiveScopes: ScopeState[]
  segments: CommercialSegment[]
  model: { interactive: boolean; interactionMode?: string; descriptionBold: string; description: string }
  interactive: boolean
  dark: boolean
  onScopeClick: (phase: ScopePhase) => void
}) {
  return (
    <div className={`rounded-2xl border p-6 mt-4 ${
      dark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50/50 border-gray-200'
    }`}>
      {/* Model row */}
      <div className="flex items-stretch">
        <RowLabel label="Model" dark={dark} />
        <div className="flex-1 min-w-0">
          <ModelTabs activeModel={activeModelId} dark={dark} onSelect={onSelectModel} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeModelId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mt-5"
        >
          {/* Interactive hint */}
          {interactive && (
            <p className={`text-[11px] mb-3 pl-[72px] md:pl-[88px] ${dark ? 'text-accent/60' : 'text-accent/80'}`}>
              {model.interactionMode === 'cycle'
                ? 'Click scope boxes to cycle: Client → Consulting → Symphony'
                : 'Click scope boxes to toggle Symphony on/off'}
            </p>
          )}

          {/* Scope row */}
          <div className="flex items-stretch">
            <RowLabel label="Scope" dark={dark} />
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-6 gap-1.5">
                {effectiveScopes.map((s) => (
                  <ScopeCell
                    key={s.phase}
                    phase={s.phase}
                    owner={s.owner}
                    interactive={interactive}
                    dark={dark}
                    onClick={() => onScopeClick(s.phase)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Commercial row */}
          <div className="flex items-stretch mt-3">
            <RowLabel label="Commercial" dark={dark} />
            <div className="flex-1 min-w-0">
              <CommercialBar segments={segments} dark={dark} />
            </div>
          </div>

          {/* Description */}
          <div className="pl-[72px] md:pl-[88px]">
            <ModelDescription bold={model.descriptionBold} text={model.description} dark={dark} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Legend ─────────────────────────────────────────────────────────

function Legend({ dark }: { dark: boolean }) {
  const dotClass = 'w-2.5 h-2.5 rounded-full inline-block'
  const labelClass = `text-[10px] ${dark ? 'text-white/50' : 'text-gray-500'}`

  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-4 border-t ${dark ? 'border-white/8' : 'border-gray-200'}`}>
      <div className="flex items-center gap-1.5">
        <span className={dotClass} style={{ background: '#185FA5' }} />
        <span className={labelClass}>Symphony-led</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={dotClass} style={{ background: '#854F0B' }} />
        <span className={labelClass}>Consulting</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`${dotClass} border border-dashed`} style={{ borderColor: '#B4B2A9', background: 'transparent' }} />
        <span className={labelClass}>Client-led</span>
      </div>
    </div>
  )
}

// ── Directional Arrow ─────────────────────────────────────────────

function DirectionalArrow({ dark }: { dark: boolean }) {
  return (
    <p className={`text-center text-[11px] mt-4 ${dark ? 'text-white/30' : 'text-gray-400'}`}>
      Discrete ———→ Development partnership — better outcome, zero capex
    </p>
  )
}

// ── Main Component ────────────────────────────────────────────────

export function PartnershipConfigurator({
  defaultTechnology = 'wind',
  defaultModel = 'development',
  onChange,
  theme = 'auto',
}: PartnershipConfiguratorProps) {
  const dark = theme === 'dark' || (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  // Wizard step
  const [expandedStep, setExpandedStep] = useState<WizardStep>(0)

  // Step 1: Project configuration
  const [technology, setTechnology] = useState<Technology>(defaultTechnology)
  const [projectSizeMW, setProjectSizeMW] = useState<number | null>(null)
  const [infrastructure, setInfrastructure] = useState<InfrastructureConfig>(DEFAULT_INFRASTRUCTURE)

  // Step 2: Partnership model
  const [activeModelId, setActiveModelId] = useState<ModelId>(defaultModel)
  const [scopeOverrides, setScopeOverrides] = useState<Map<ScopePhase, ScopeOwner>>(new Map())

  const model = getModel(activeModelId)

  // Reset overrides when model changes
  useEffect(() => {
    setScopeOverrides(new Map())
  }, [activeModelId])

  // Auto-deselect invalid BOP options when technology changes
  useEffect(() => {
    const validBOP = OTHER_BOP_OPTIONS.filter(o => o.techs.includes(technology)).map(o => o.id)
    setInfrastructure(prev => ({
      ...prev,
      otherBOP: prev.otherBOP.filter(id => validBOP.includes(id)),
    }))
  }, [technology])

  // Compute effective scopes
  const effectiveScopes = useMemo<ScopeState[]>(() => {
    if (!model.interactive) return model.defaultScopes
    return model.defaultScopes.map(s => {
      const override = scopeOverrides.get(s.phase)
      return override ? { ...s, owner: override } : s
    })
  }, [model, scopeOverrides])

  // Compute commercial bar segments
  const segments = useMemo(
    () => computeSegments(effectiveScopes, model.commercialMapping),
    [effectiveScopes, model],
  )

  // Derived: step completion
  const step1HasContent = projectSizeMW !== null && projectSizeMW > 0

  // Fire onChange
  useEffect(() => {
    onChange?.({
      technology,
      model: activeModelId,
      scopes: effectiveScopes,
      project: { technology, projectSizeMW, infrastructure },
    })
  }, [technology, activeModelId, effectiveScopes, projectSizeMW, infrastructure, onChange])

  function handleScopeClick(phase: ScopePhase) {
    if (!model.interactive) return
    setScopeOverrides(prev => {
      const next = new Map(prev)
      const current = next.get(phase) ?? model.defaultScopes.find(s => s.phase === phase)!.owner
      if (model.interactionMode === 'cycle') {
        const cycle: ScopeOwner[] = ['client', 'consulting', 'symphony']
        next.set(phase, cycle[(cycle.indexOf(current) + 1) % 3])
      } else {
        next.set(phase, current === 'client' ? 'symphony' : 'client')
      }
      return next
    })
  }

  function toggleStep(step: WizardStep) {
    setExpandedStep(prev => prev === step ? 0 : step)
  }

  // Build Box 1 summary text
  const box1Summary = step1HasContent
    ? `${getTechLabel(technology)} — ${projectSizeMW} MW`
    : null

  // Build Box 3 result summary
  const resultSummary = useMemo(() => {
    const infraParts: string[] = []
    if (infrastructure.hasSubstation) infraParts.push('Substation')
    if (infrastructure.hasSwitchyard) infraParts.push('Switchyard')

    let transmissionLine: string | null = null
    if (infrastructure.hasTransmissionLine) {
      const parts = []
      if (infrastructure.transmissionKm) parts.push(`${infrastructure.transmissionKm} km`)
      parts.push('transmission')
      if (infrastructure.transmissionVoltage) parts.push(`@ ${infrastructure.transmissionVoltage} kV`)
      transmissionLine = parts.join(' ')
    }

    const connectionVoltage = infrastructure.connectionVoltage
      ? `Connection @ ${infrastructure.connectionVoltage} kV`
      : null

    const bopItems = infrastructure.otherBOP.map(
      id => OTHER_BOP_OPTIONS.find(o => o.id === id)!.label,
    )

    return {
      headline: projectSizeMW
        ? `${projectSizeMW} MW ${getTechLabel(technology)}`
        : getTechLabel(technology),
      model: model.label,
      infraParts,
      transmissionLine,
      connectionVoltage,
      bopItems,
      hasProject: step1HasContent,
    }
  }, [technology, projectSizeMW, infrastructure, model, step1HasContent])

  return (
    <div className="max-w-5xl w-full mx-auto">
      {/* ── Three Boxes Row ── */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 mb-2">

        {/* Box 1: What are you connecting? */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[1.5px] font-semibold mb-2 bg-accent/15 text-accent border border-accent/20`}>
            Step 1
          </span>
          <div
            onClick={() => toggleStep(1)}
            className="cursor-pointer flex-1"
          >
            <GlassCard dark={dark} className={`h-full transition-all duration-200 ${expandedStep === 1 ? 'ring-1 ring-accent/40' : ''}`}>
              <div className="flex items-start justify-between">
                <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-3 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                  What are you connecting?
                </p>
                <ChevronDown open={expandedStep === 1} dark={dark} />
              </div>
              <AnimatePresence mode="wait">
                {box1Summary ? (
                  <motion.p
                    key={box1Summary}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`text-sm font-semibold ${dark ? 'text-white/85' : 'text-gray-800'}`}
                  >
                    {box1Summary}
                  </motion.p>
                ) : (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`text-[12px] ${dark ? 'text-white/25' : 'text-gray-400'}`}
                  >
                    Click to configure
                  </motion.p>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </motion.div>

        {/* + connector */}
        <div className="hidden md:flex items-end justify-center px-3 pb-6">
          <span className={`text-2xl font-semibold ${dark ? 'text-white/40' : 'text-gray-400'}`}>+</span>
        </div>

        {/* Box 2: How do you want to partner? */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[1.5px] font-semibold mb-2 bg-accent/15 text-accent border border-accent/20`}>
            Step 2
          </span>
          <div
            onClick={() => toggleStep(2)}
            className="cursor-pointer flex-1"
          >
            <GlassCard dark={dark} className={`h-full transition-all duration-200 ${expandedStep === 2 ? 'ring-1 ring-accent/40' : ''}`}>
              <div className="flex items-start justify-between">
                <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-3 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                  How do you want to partner?
                </p>
                <ChevronDown open={expandedStep === 2} dark={dark} />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={model.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`text-sm font-semibold ${dark ? 'text-white/85' : 'text-gray-800'}`}
                >
                  {model.label}
                </motion.p>
              </AnimatePresence>
              <p className={`text-[11px] mt-2 ${dark ? 'text-white/30' : 'text-gray-400'}`}>
                Select a model below — defines scope, ownership and commercial terms
              </p>
            </GlassCard>
          </div>
        </motion.div>

        {/* = connector */}
        <div className="hidden md:flex items-end justify-center px-3 pb-6">
          <span className={`text-2xl font-semibold ${dark ? 'text-white/40' : 'text-gray-400'}`}>=</span>
        </div>

        {/* Box 3: View your partnership model */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        >
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[1.5px] font-semibold mb-2 bg-accent/15 text-accent border border-accent/20`}>
            Step 3
          </span>
          <div
            onClick={() => toggleStep(3)}
            className="cursor-pointer flex-1"
          >
            <GlassCard dark={dark} highlight className={`h-full transition-all duration-200 ${expandedStep === 3 ? 'ring-1 ring-accent/40' : ''}`}>
              <div className="flex items-start justify-between">
                <p className="text-[10px] uppercase tracking-[1.2px] font-medium mb-3 text-accent">
                  View your partnership model
                </p>
                <ChevronDown open={expandedStep === 3} dark={dark} />
              </div>
              <AnimatePresence mode="wait">
                {resultSummary.hasProject ? (
                  <motion.div
                    key={`${resultSummary.headline}-${resultSummary.model}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-2">
                      <ZapIcon />
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                          {resultSummary.headline}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${dark ? 'text-white/60' : 'text-gray-500'}`}>
                          {resultSummary.model}
                        </p>
                        {(resultSummary.infraParts.length > 0 || resultSummary.transmissionLine || resultSummary.connectionVoltage) && (
                          <div className={`text-[10px] mt-2 space-y-0.5 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                            {resultSummary.infraParts.length > 0 && (
                              <p>{resultSummary.infraParts.join(' · ')}</p>
                            )}
                            {resultSummary.transmissionLine && (
                              <p>{resultSummary.transmissionLine}</p>
                            )}
                            {resultSummary.connectionVoltage && (
                              <p>{resultSummary.connectionVoltage}</p>
                            )}
                            {resultSummary.bopItems.length > 0 && (
                              <p>{resultSummary.bopItems.join(' · ')}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="empty-result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`text-[12px] ${dark ? 'text-white/25' : 'text-gray-400'}`}
                  >
                    Configure your project to see the result
                  </motion.p>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </motion.div>
      </div>

      {/* ── Expanded Panels ── */}
      <AnimatePresence mode="wait">
        {expandedStep === 1 && (
          <motion.div
            key="step1-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <ProjectConfigPanel
              technology={technology}
              onSelectTech={setTechnology}
              projectSizeMW={projectSizeMW}
              onSizeChange={setProjectSizeMW}
              infrastructure={infrastructure}
              onInfraChange={setInfrastructure}
              dark={dark}
            />
          </motion.div>
        )}
        {expandedStep === 2 && (
          <motion.div
            key="step2-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <ModelPanel
              activeModelId={activeModelId}
              onSelectModel={setActiveModelId}
              effectiveScopes={effectiveScopes}
              segments={segments}
              model={model}
              interactive={model.interactive}
              dark={dark}
              onScopeClick={handleScopeClick}
            />
          </motion.div>
        )}
        {expandedStep === 3 && (
          <motion.div
            key="step3-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className={`rounded-2xl border p-6 mt-4 ${
              dark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50/50 border-gray-200'
            }`}>
              <ResponsibilityMatrix
                technology={technology}
                modelId={activeModelId}
                projectSizeMW={projectSizeMW}
                dark={dark}
              />
              <div className="mt-8">
                <GanttChart modelId={activeModelId} dark={dark} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Legend + Directional Arrow (always visible) ── */}
      <Legend dark={dark} />
      <DirectionalArrow dark={dark} />
    </div>
  )
}

export default PartnershipConfigurator
