import { motion, type MotionValue, useTransform } from 'motion/react'
import { CoalPlant, SolarPanel, WindTurbine, Battery, DataCentre, Transformer, PowerTower, Buildings } from '../../icons'
import { useValueChainAnimation, type NodeId } from './useValueChainAnimation'

interface ChainNodeProps {
  icon: React.ReactNode
  label: string
  x: MotionValue<number>
  y: MotionValue<number>
  opacity?: MotionValue<number> | number
  scale?: MotionValue<number> | number
  highlightProgress?: MotionValue<number>
  dark: boolean
}

function ChainNode({ icon, label, x, y, opacity = 1, scale = 1, highlightProgress, dark }: ChainNodeProps) {
  const left = useTransform(x, (v) => `${v}%`)
  const top = useTransform(y, (v) => `${v}%`)

  const borderColor = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [
        dark ? 'rgba(255,255,255,0.2)' : 'rgba(209,213,219,1)',
        'rgba(59,130,246,0.5)',
      ])
    : undefined

  const bgColor = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [
        dark ? '#152035' : '#ffffff',
        dark ? '#1a2d52' : '#eff6ff',
      ])
    : undefined

  const iconColorVal = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [
        dark ? 'rgba(255,255,255,0.85)' : 'rgba(55,65,81,1)',
        'rgba(59,130,246,1)',
      ])
    : undefined

  const labelColorVal = highlightProgress
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useTransform(highlightProgress, [0, 1], [
        dark ? 'rgba(255,255,255,0.8)' : 'rgba(75,85,99,1)',
        dark ? 'rgba(96,165,250,1)' : 'rgba(59,130,246,1)',
      ])
    : undefined

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
      style={{ left, top, opacity, scale }}
    >
      <motion.div
        className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center border"
        style={{
          borderColor: borderColor || (dark ? 'rgba(255,255,255,0.2)' : 'rgba(209,213,219,1)'),
          backgroundColor: bgColor || (dark ? '#152035' : '#ffffff'),
          boxShadow: dark ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <motion.div
          className="w-7 h-7 md:w-9 md:h-9"
          style={{ color: iconColorVal || (dark ? 'rgba(255,255,255,0.85)' : 'rgba(55,65,81,1)') }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <motion.span
        className="text-[9px] md:text-[11px] text-center font-medium whitespace-nowrap"
        style={{ color: labelColorVal || (dark ? 'rgba(255,255,255,0.8)' : 'rgba(75,85,99,1)') }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

interface ArrowProps {
  x1: MotionValue<number>
  y1: MotionValue<number>
  x2: MotionValue<number>
  y2: MotionValue<number>
  opacity?: MotionValue<number> | number
  id: string
  dark: boolean
}

function ChainArrow({ x1, y1, x2, y2, opacity = 1, id, dark }: ArrowProps) {
  const cx1 = useTransform(x1, (v) => `${v}%`)
  const cy1 = useTransform(y1, (v) => `${v}%`)
  const cx2 = useTransform(x2, (v) => `${v}%`)
  const cy2 = useTransform(y2, (v) => `${v}%`)
  const lineColor = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
  const arrowColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <marker id={`ar-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 9 5 L 0 8.5" fill="none" stroke={arrowColor} strokeWidth="1.5" />
          </marker>
        </defs>
        <motion.line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke={lineColor} strokeWidth="1" markerEnd={`url(#ar-${id})`} />
      </svg>
    </motion.div>
  )
}

function ElectronPath({ x1, y1, x2, y2, opacity = 1, delay }: { x1: MotionValue<number>; y1: MotionValue<number>; x2: MotionValue<number>; y2: MotionValue<number>; opacity?: MotionValue<number> | number; delay: number }) {
  const sx = useTransform(x1, (v) => `${v}%`)
  const sy = useTransform(y1, (v) => `${v}%`)
  const ex = useTransform(x2, (v) => `${v}%`)
  const ey = useTransform(y2, (v) => `${v}%`)

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full absolute inset-0" overflow="visible">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="2" result="c" /><feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {[0, 1, 2].map((i) => (
          <circle key={i} r="2.5" fill="#3B82F6" filter="url(#glow)">
            <animate attributeName="cx" values={`${sx.get()};${ex.get()}`} dur="4s" begin={`${delay + i * 1.3}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${sy.get()};${ey.get()}`} dur="4s" begin={`${delay + i * 1.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="4s" begin={`${delay + i * 1.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </motion.div>
  )
}

export default function ValueChainCanvas({ scrollYProgress, dark }: { scrollYProgress: MotionValue<number>; dark: boolean }) {
  const anim = useValueChainAnimation(scrollYProgress)
  const p = anim.positions
  const iconSize = "w-7 h-7 md:w-9 md:h-9"

  return (
    <div className="relative w-full h-full">
      {/* ===== TITLE A: Traditional value chain ===== */}
      <motion.div
        className="absolute top-[6%] left-0 z-10 w-full max-w-3xl px-8 md:px-12"
        style={{ opacity: anim.titleAOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Traditional electricity value chain
        </h2>
        <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Historically, power has flowed from large-scale centralised generators through transmission and distribution networks to commercial, industrial and residential load customers
        </p>
      </motion.div>

      {/* ===== TITLE B: Energy transition ===== */}
      <motion.div
        className="absolute top-[6%] left-0 z-10 w-full max-w-3xl px-8 md:px-12"
        style={{ opacity: anim.titleBOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
          The energy transition
        </h2>
        <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Australia's ageing coal fleet is being replaced by distributed renewable energy sources — wind farms, solar farms and battery storage — fundamentally changing the shape of the grid
        </p>
      </motion.div>

      {/* ===== TITLE C: Connecting to grid ===== */}
      <motion.div
        className="absolute top-[6%] left-0 z-10 w-full max-w-3xl px-8 md:px-12"
        style={{ opacity: anim.titleCOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Connecting to the grid
        </h2>
        <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Every new generator needs dedicated connection infrastructure to link into the transmission network — substations, switchyards and high-voltage equipment that the network operator does not provide
        </p>
      </motion.div>

      {/* ===== TITLE D: Digital growth ===== */}
      <motion.div
        className="absolute top-[6%] left-0 z-10 w-full max-w-3xl px-8 md:px-12"
        style={{ opacity: anim.titleDOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Supporting digital growth and AI
        </h2>
        <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          The rapid expansion of data centres and AI infrastructure is creating unprecedented demand for grid connections — each facility requiring dedicated high-voltage connection infrastructure
        </p>
      </motion.div>

      {/* ===== TITLE E: Symphony's role ===== */}
      <motion.div
        className="absolute top-[6%] left-0 z-10 w-full max-w-3xl px-8 md:px-12"
        style={{ opacity: anim.titleEOpacity }}
      >
        <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
          That's where <span className="text-accent">Symphony</span> comes in
        </h2>
        <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>
          Symphony designs, builds and owns the connection infrastructure that links generators and loads to the grid — providing certainty of delivery for our partners
        </p>
      </motion.div>

      {/* Infographic area — below titles */}
      <div className="absolute top-[24%] left-0 right-0 bottom-[4%]">
        <div className="relative w-full h-full">

          {/* ===== State A arrows: Coal → Transmission → Distribution → Load ===== */}
          <ChainArrow id="a0" x1={p.coal.x} y1={p.coal.y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.stateAFade} dark={dark} />
          <ChainArrow id="a1" x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.stateAFade} dark={dark} />
          <ChainArrow id="a2" x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.stateAFade} dark={dark} />

          {/* State A electrons */}
          <ElectronPath x1={p.coal.x} y1={p.coal.y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.stateAFade} delay={0} />
          <ElectronPath x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.stateAFade} delay={0.5} />
          <ElectronPath x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.stateAFade} delay={1} />

          {/* ===== Core chain arrows: transmission → distribution → load (from State B) ===== */}
          <ChainArrow id="c0" x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.coreChainArrows} dark={dark} />
          <ChainArrow id="c1" x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.coreChainArrows} dark={dark} />

          {/* Core chain electrons */}
          <ElectronPath x1={p.transmission.x} y1={p.transmission.y} x2={p.distribution.x} y2={p.distribution.y} opacity={anim.coreChainArrows} delay={0.3} />
          <ElectronPath x1={p.distribution.x} y1={p.distribution.y} x2={p.load.x} y2={p.load.y} opacity={anim.coreChainArrows} delay={0.8} />

          {/* ===== Generator → NCI → Transmission arrows (appear in State C) ===== */}
          {(['solar', 'wind', 'battery'] as const).map((gen, i) => {
            const nci = `nci${gen.charAt(0).toUpperCase() + gen.slice(1)}` as NodeId
            return (
              <span key={gen}>
                <ChainArrow id={`g${i}`} x1={p[gen].x} y1={p[gen].y} x2={p[nci].x} y2={p[nci].y} opacity={anim.connectionArrows} dark={dark} />
                <ChainArrow id={`n${i}`} x1={p[nci].x} y1={p[nci].y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.connectionArrows} dark={dark} />
                <ElectronPath x1={p[gen].x} y1={p[gen].y} x2={p[nci].x} y2={p[nci].y} opacity={anim.connectionArrows} delay={i * 0.4} />
                <ElectronPath x1={p[nci].x} y1={p[nci].y} x2={p.transmission.x} y2={p.transmission.y} opacity={anim.connectionArrows} delay={i * 0.4 + 0.2} />
              </span>
            )
          })}

          {/* ===== DC arrows: distribution → nciDC → dataCentre (appear in State D) ===== */}
          <ChainArrow id="dc0" x1={p.distribution.x} y1={p.distribution.y} x2={p.nciDataCentre.x} y2={p.nciDataCentre.y} opacity={anim.dcArrows} dark={dark} />
          <ChainArrow id="dc1" x1={p.nciDataCentre.x} y1={p.nciDataCentre.y} x2={p.dataCentre.x} y2={p.dataCentre.y} opacity={anim.dcArrows} dark={dark} />
          <ElectronPath x1={p.distribution.x} y1={p.distribution.y} x2={p.nciDataCentre.x} y2={p.nciDataCentre.y} opacity={anim.dcArrows} delay={0.1} />
          <ElectronPath x1={p.nciDataCentre.x} y1={p.nciDataCentre.y} x2={p.dataCentre.x} y2={p.dataCentre.y} opacity={anim.dcArrows} delay={0.4} />

          {/* ===== NODES ===== */}

          {/* Coal generator — State A only */}
          <ChainNode icon={<CoalPlant className={iconSize} />} label="Coal Generation" x={p.coal.x} y={p.coal.y} opacity={anim.coalOpacity} dark={dark} />

          {/* Renewable generators — appear in State B */}
          <ChainNode icon={<SolarPanel className={iconSize} />} label="Solar" x={p.solar.x} y={p.solar.y} opacity={anim.renewablesOpacity} dark={dark} />
          <ChainNode icon={<WindTurbine className={iconSize} />} label="Wind" x={p.wind.x} y={p.wind.y} opacity={anim.renewablesOpacity} dark={dark} />
          <ChainNode icon={<Battery className={iconSize} />} label="Battery" x={p.battery.x} y={p.battery.y} opacity={anim.renewablesOpacity} dark={dark} />

          {/* Generator-side NCI boxes — appear in State C, highlight in State E */}
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciSolar.x} y={p.nciSolar.y} opacity={anim.nciOpacity} scale={anim.nciScale} highlightProgress={anim.nciHighlight} dark={dark} />
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciWind.x} y={p.nciWind.y} opacity={anim.nciOpacity} scale={anim.nciScale} highlightProgress={anim.nciHighlight} dark={dark} />
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciBattery.x} y={p.nciBattery.y} opacity={anim.nciOpacity} scale={anim.nciScale} highlightProgress={anim.nciHighlight} dark={dark} />

          {/* Core chain nodes — always visible */}
          <ChainNode icon={<PowerTower className={iconSize} />} label="Transmission" x={p.transmission.x} y={p.transmission.y} dark={dark} />
          <ChainNode icon={<Transformer className={iconSize} />} label="Distribution" x={p.distribution.x} y={p.distribution.y} dark={dark} />
          <ChainNode icon={<Buildings className={iconSize} />} label="Load / Consumers" x={p.load.x} y={p.load.y} dark={dark} />

          {/* Data Centre — appears in State D */}
          <ChainNode icon={<DataCentre className={iconSize} />} label="Data Centres" x={p.dataCentre.x} y={p.dataCentre.y} opacity={anim.dcOpacity} scale={anim.dcScale} dark={dark} />

          {/* DC-side NCI — appears in State D, highlights in State E */}
          <ChainNode icon={<Transformer className={iconSize} />} label="Connection Infra" x={p.nciDataCentre.x} y={p.nciDataCentre.y} opacity={anim.dcOpacity} scale={anim.dcScale} highlightProgress={anim.nciHighlight} dark={dark} />
        </div>
      </div>
    </div>
  )
}
