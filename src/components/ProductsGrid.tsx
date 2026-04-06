import { motion } from 'motion/react'
import GlassCard from '../ui/GlassCard'
import { WindTurbine, SolarPanel, Battery, DataCentre, Transformer } from '../icons'

interface ProductCardProps {
  icon: React.ReactNode
  label: string
  highlight?: boolean
  index: number
}

function ProductCard({ icon, label, highlight = false, index }: ProductCardProps) {
  return (
    <GlassCard
      highlight={highlight}
      className="flex flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className={`w-12 h-12 ${highlight ? 'text-accent-light' : 'text-white/70'}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${highlight ? 'text-accent-light' : 'text-white/80'}`}>
        {label}
      </span>
    </GlassCard>
  )
}

const clientProducts = [
  { icon: <WindTurbine className="w-12 h-12" />, label: 'Wind' },
  { icon: <SolarPanel className="w-12 h-12" />, label: 'Solar' },
  { icon: <Battery className="w-12 h-12" />, label: 'Storage' },
  { icon: <DataCentre className="w-12 h-12" />, label: 'Data Centres' },
]

const symphonyProducts = [
  { icon: <Transformer className="w-12 h-12" />, label: 'Wind Connection' },
  { icon: <Transformer className="w-12 h-12" />, label: 'Solar Connection' },
  { icon: <Transformer className="w-12 h-12" />, label: 'Storage Connection' },
  { icon: <Transformer className="w-12 h-12" />, label: 'Data Centre Connection' },
]

export default function ProductsGrid() {
  return (
    <section className="relative min-h-screen bg-navy flex items-center justify-center py-24 px-6">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Our Products</h2>
          <p className="text-white/40 text-sm md:text-base">End-to-end connection solutions for every asset class</p>
        </motion.div>

        {/* Row 1: Client assets */}
        <motion.div
          className="mb-3 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Our Clients</span>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {clientProducts.map((p, i) => (
            <ProductCard key={p.label} icon={p.icon} label={p.label} index={i} />
          ))}
        </div>

        {/* Row 2: Symphony products */}
        <motion.div
          className="mb-3 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent/60">Symphony Products</span>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {symphonyProducts.map((p, i) => (
            <ProductCard key={p.label} icon={p.icon} label={p.label} highlight index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  )
}
