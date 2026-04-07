import { motion } from 'motion/react'
import PartnershipConfigurator from './PartnershipConfigurator'

export default function PartnershipConfiguratorSection({ dark }: { dark: boolean }) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center py-24 px-6 transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl md:text-4xl font-bold mb-3 transition-colors duration-500 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Our partnership product
          </h2>
          <p className={`text-sm md:text-base transition-colors duration-500 ${dark ? 'text-white/40' : 'text-gray-400'}`}>
            Configure your connection infrastructure engagement
          </p>
        </motion.div>

        <PartnershipConfigurator
          defaultTechnology="wind"
          defaultModel="development"
          theme={dark ? 'dark' : 'light'}
        />
      </div>
    </section>
  )
}
