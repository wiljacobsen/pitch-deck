'use client'

import { motion } from 'motion/react'
import type { SlideComponentProps } from '@/types'
import { WindTurbine, SolarPanel, Battery, DataCentre, Transformer } from '@/icons'
import GlassCard from '@/components/ui/GlassCard'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  windTurbine: WindTurbine,
  solarPanel: SolarPanel,
  battery: Battery,
  dataCentre: DataCentre,
  transformer: Transformer,
}

interface ProductItem {
  label: string
  iconId: string
}

function ProductCard({ icon, label, highlight = false, index, dark }: {
  icon: React.ReactNode
  label: string
  highlight?: boolean
  index: number
  dark: boolean
}) {
  return (
    <GlassCard
      highlight={highlight}
      dark={dark}
      className="flex flex-col items-center gap-3 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className={`w-12 h-12 ${highlight ? 'text-accent-light' : dark ? 'text-white/70' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${highlight ? 'text-accent-light' : dark ? 'text-white/80' : 'text-gray-700'}`}>
        {label}
      </span>
    </GlassCard>
  )
}

const defaultClientProducts: ProductItem[] = [
  { label: 'Wind', iconId: 'windTurbine' },
  { label: 'Solar', iconId: 'solarPanel' },
  { label: 'Storage', iconId: 'battery' },
  { label: 'Data Centres', iconId: 'dataCentre' },
]

const defaultSymphonyProducts: ProductItem[] = [
  { label: 'Wind Connection', iconId: 'transformer' },
  { label: 'Solar Connection', iconId: 'transformer' },
  { label: 'Storage Connection', iconId: 'transformer' },
  { label: 'Data Centre Connection', iconId: 'transformer' },
]

export default function ProductsGridSlide({ contentData, dark }: SlideComponentProps) {
  const title = (contentData.title as string) || 'Our Products'
  const subtitle = (contentData.subtitle as string) || 'End-to-end connection solutions for every asset class'
  const clientProducts = (contentData.clientProducts as ProductItem[]) || defaultClientProducts
  const symphonyProducts = (contentData.symphonyProducts as ProductItem[]) || defaultSymphonyProducts

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
          <p className={`text-sm md:text-base transition-colors duration-500 ${dark ? 'text-white/40' : 'text-gray-400'}`}>{subtitle}</p>
        </motion.div>

        <motion.div className="mb-3 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
          <span className={`text-xs font-semibold uppercase tracking-widest ${dark ? 'text-white/30' : 'text-gray-400'}`}>Our Clients</span>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {clientProducts.map((p, i) => {
            const Icon = iconMap[p.iconId] || DataCentre
            return <ProductCard key={p.label} icon={<Icon className="w-12 h-12" />} label={p.label} index={i} dark={dark} />
          })}
        </div>

        <motion.div className="mb-3 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent/60">Symphony Products</span>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {symphonyProducts.map((p, i) => {
            const Icon = iconMap[p.iconId] || Transformer
            return <ProductCard key={p.label} icon={<Icon className="w-12 h-12" />} label={p.label} highlight index={i + 4} dark={dark} />
          })}
        </div>
      </div>
    </section>
  )
}
