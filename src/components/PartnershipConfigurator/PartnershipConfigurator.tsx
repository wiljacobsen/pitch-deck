import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import GlassCard from '../../ui/GlassCard'
import { PHASES, TECHNOLOGY_OPTIONS, MODELS, SCOPE_COLORS, COMMERCIAL_LABELS, OWNER_LABELS } from './data'
import type { Technology, ModelId, ScopeOwner, ScopePhase, ScopeState, PartnershipConfiguratorProps } from './types'

// ── Helpers ───────────────────────────────────────────────────────

function getTechLabel(id: Technology) {
  return TECHNOLOGY_OPTIONS.find(t => t.id === id)!.label
}

function getModel(id: ModelId) {
  return MODELS.find(m => m.id === id)!
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
      className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-200 cursor-pointer
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

// ── Configurator Boxes Row ────────────────────────────────────────

function ConfiguratorRow({ technology, modelLabel, resultText, dark, onSelectTech }: {
  technology: Technology; modelLabel: string; resultText: string; dark: boolean
  onSelectTech: (id: Technology) => void
}) {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 mb-8">
      {/* Box 1: Technology */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <GlassCard dark={dark} className="h-full">
          <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-3 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            What are you connecting?
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {TECHNOLOGY_OPTIONS.map(t => (
              <TechnologyPill key={t.id} id={t.id} label={t.label} active={technology === t.id} dark={dark} onSelect={onSelectTech} />
            ))}
          </div>
          <p className={`text-[11px] mt-2 ${dark ? 'text-white/30' : 'text-gray-400'}`}>
            The technology defines the engineering specification
          </p>
        </GlassCard>
      </motion.div>

      {/* + connector */}
      <div className="hidden md:flex items-center justify-center px-3">
        <span className={`text-lg font-light ${dark ? 'text-white/20' : 'text-gray-300'}`}>+</span>
      </div>

      {/* Box 2: Model display */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      >
        <GlassCard dark={dark} className="h-full">
          <p className={`text-[10px] uppercase tracking-[1.2px] font-medium mb-3 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            How do you want to partner?
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={modelLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-sm font-semibold ${dark ? 'text-white/85' : 'text-gray-800'}`}
            >
              {modelLabel}
            </motion.p>
          </AnimatePresence>
          <p className={`text-[11px] mt-2 ${dark ? 'text-white/30' : 'text-gray-400'}`}>
            Select a model below — defines scope, ownership and commercial terms
          </p>
        </GlassCard>
      </motion.div>

      {/* = connector */}
      <div className="hidden md:flex items-center justify-center px-3">
        <span className={`text-lg font-light ${dark ? 'text-white/20' : 'text-gray-300'}`}>=</span>
      </div>

      {/* Box 3: Result */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      >
        <GlassCard dark={dark} highlight className="h-full">
          <p className="text-[10px] uppercase tracking-[1.2px] font-medium mb-3 text-accent">
            Your partnership product
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={resultText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}
            >
              {resultText}
            </motion.p>
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// ── Model Tabs ────────────────────────────────────────────────────

function ModelTabs({ activeModel, dark, onSelect }: {
  activeModel: ModelId; dark: boolean; onSelect: (id: ModelId) => void
}) {
  return (
    <div className={`flex gap-1 rounded-xl p-1 mb-6 overflow-x-auto ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
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

// ── Scope Cell ────────────────────────────────────────────────────

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
      className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-t-lg border text-center min-h-[64px] md:min-h-[72px]
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

// ── Commercial Cell ───────────────────────────────────────────────

function CommercialCell({ owner, commercialType, dark }: {
  owner: ScopeOwner; commercialType: string; dark: boolean
}) {
  const colors = SCOPE_COLORS[owner]
  const isNone = commercialType === '—'

  return (
    <motion.div
      animate={{
        backgroundColor: isNone
          ? (dark ? 'rgba(44,44,42,0.5)' : 'rgba(241,239,232,0.5)')
          : (dark ? colors.darkBg : colors.bg),
        borderColor: isNone ? (dark ? 'rgba(180,178,169,0.3)' : 'rgba(180,178,169,0.5)') : colors.border,
      }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-center p-1.5 md:p-2 rounded-b-lg border-x border-b text-center min-h-[32px]
        ${isNone ? 'border-dashed' : colors.dashed ? 'border-dashed' : 'border-solid'}`}
    >
      <span
        className="text-[8px] md:text-[9px] font-medium"
        style={{ color: isNone ? (dark ? '#B4B2A9' : '#5F5E5A') : (dark ? colors.darkText : colors.text) }}
      >
        {commercialType}
      </span>
    </motion.div>
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
      <div className="w-px" />
      <div className="flex items-center gap-1.5">
        <span className={dotClass} style={{ background: '#185FA5' }} />
        <span className={labelClass}>Annual service fee</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={dotClass} style={{ background: '#854F0B' }} />
        <span className={labelClass}>Lump sum / services / client capex</span>
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

  const [technology, setTechnology] = useState<Technology>(defaultTechnology)
  const [activeModelId, setActiveModelId] = useState<ModelId>(defaultModel)
  const [scopeOverrides, setScopeOverrides] = useState<Map<ScopePhase, ScopeOwner>>(new Map())

  const model = getModel(activeModelId)

  // Reset overrides when model changes
  useEffect(() => {
    setScopeOverrides(new Map())
  }, [activeModelId])

  // Compute effective scopes
  const effectiveScopes = useMemo<ScopeState[]>(() => {
    if (!model.interactive) return model.defaultScopes
    return model.defaultScopes.map(s => {
      const override = scopeOverrides.get(s.phase)
      return override ? { ...s, owner: override } : s
    })
  }, [model, scopeOverrides])

  // Derive commercial types
  const commercialTypes = useMemo(() => {
    return effectiveScopes.map(s => ({
      phase: s.phase,
      type: COMMERCIAL_LABELS[model.commercialMapping[s.owner]],
    }))
  }, [effectiveScopes, model])

  // Fire onChange
  useEffect(() => {
    onChange?.({ technology, model: activeModelId, scopes: effectiveScopes })
  }, [technology, activeModelId, effectiveScopes, onChange])

  const resultText = `${getTechLabel(technology)} connection — ${model.label.toLowerCase()}`

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

  return (
    <div className="max-w-5xl w-full mx-auto">
      {/* Section 1: Configurator boxes */}
      <ConfiguratorRow
        technology={technology}
        modelLabel={model.label}
        resultText={resultText}
        dark={dark}
        onSelectTech={setTechnology}
      />

      {/* Section 2: Model tabs */}
      <ModelTabs activeModel={activeModelId} dark={dark} onSelect={setActiveModelId} />

      {/* Section 3: Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModelId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Interactive hint */}
          {model.interactive && (
            <p className={`text-[11px] mb-3 ${dark ? 'text-accent/60' : 'text-accent/80'}`}>
              {model.interactionMode === 'cycle'
                ? '💡 Click scope boxes to cycle: Client → Consulting → Symphony'
                : '💡 Click scope boxes to toggle Symphony on/off'}
            </p>
          )}

          {/* Scope grid */}
          <div className="grid grid-cols-6 gap-px">
            {effectiveScopes.map((s) => (
              <ScopeCell
                key={s.phase}
                phase={s.phase}
                owner={s.owner}
                interactive={model.interactive}
                dark={dark}
                onClick={() => handleScopeClick(s.phase)}
              />
            ))}
          </div>

          {/* Commercial grid */}
          <div className="grid grid-cols-6 gap-px -mt-px">
            {commercialTypes.map((c, i) => (
              <CommercialCell
                key={c.phase}
                owner={effectiveScopes[i].owner}
                commercialType={c.type}
                dark={dark}
              />
            ))}
          </div>

          {/* Description */}
          <ModelDescription bold={model.descriptionBold} text={model.description} dark={dark} />
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <Legend dark={dark} />

      {/* Directional arrow */}
      <DirectionalArrow dark={dark} />
    </div>
  )
}

export default PartnershipConfigurator
