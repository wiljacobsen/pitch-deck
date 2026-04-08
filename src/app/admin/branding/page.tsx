import { brand } from '@/lib/brand'

export default function BrandingPage() {
  const colorEntries = Object.entries(brand.colors)

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Brand Guide</h1>
      <p className="text-gray-400 text-sm mb-8">Visual reference for Symphony brand identity. Read-only.</p>

      {/* Colors */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Colours</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colorEntries.map(([name, hex]) => (
            <div key={name} className="bg-navy-light rounded-xl border border-white/10 overflow-hidden">
              <div className="h-16" style={{ backgroundColor: hex }} />
              <div className="p-3">
                <div className="text-xs font-medium text-white">{name}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Typography</h2>
        <div className="bg-navy-light rounded-2xl border border-white/10 p-6 space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 block">Font Family</span>
            <p className="text-white">{brand.typography.fontFamily}</p>
          </div>
          <div className="border-t border-white/10 pt-4 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 block">Heading Scale</span>
            {Object.entries(brand.typography.heading).map(([size, classes]) => (
              <div key={size} className="flex items-baseline gap-4">
                <span className="text-xs text-gray-500 w-8 font-mono">{size}</span>
                <span className={classes}>The quick brown fox</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 block">Body Scale</span>
            {Object.entries(brand.typography.body).map(([size, classes]) => (
              <div key={size} className="flex items-baseline gap-4">
                <span className="text-xs text-gray-500 w-8 font-mono">{size}</span>
                <span className={classes + ' text-white/70'}>The quick brown fox jumps over the lazy dog.</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Patterns */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Component Patterns</h2>
        <div className="space-y-6">
          {/* Buttons */}
          <div className="bg-navy-light rounded-2xl border border-white/10 p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className={brand.buttonStyles.primary}>Primary</button>
              <button className={brand.buttonStyles.secondary}>Secondary</button>
              <button className={brand.buttonStyles.ghost}>Ghost</button>
              <button className={brand.buttonStyles.danger}>Danger</button>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-navy-light rounded-2xl border border-white/10 p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={brand.cardStyles.base + ' ' + brand.cardStyles.darkBg + ' ' + brand.cardStyles.hover + ' p-6'}>
                <div className="text-sm font-semibold text-white mb-1">Card Title</div>
                <div className="text-xs text-gray-400">Card content with subtle border and shadow on hover.</div>
              </div>
              <div className={brand.cardStyles.base + ' ' + brand.cardStyles.darkBg + ' ' + brand.cardStyles.hover + ' p-6'}>
                <div className="text-sm font-semibold text-white mb-1">Card Title</div>
                <div className="text-xs text-gray-400">rounded-2xl, border-white/10</div>
              </div>
              <div className={brand.cardStyles.base + ' ' + brand.cardStyles.darkBg + ' ' + brand.cardStyles.hover + ' p-6'}>
                <div className="text-sm font-semibold text-white mb-1">Card Title</div>
                <div className="text-xs text-gray-400">shadow-lg on hover</div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-navy-light rounded-2xl border border-white/10 p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Category Badges</h3>
            <div className="flex flex-wrap gap-2">
              {brand.categories.map((cat) => (
                <span key={cat} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/10 text-gray-300">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
