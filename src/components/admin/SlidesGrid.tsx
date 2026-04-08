'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { SearchInput } from '@/components/ui/SearchInput'
import { brand } from '@/lib/brand'

interface SlideData {
  id: string
  title: string
  category: string
  componentType: string
  thumbnailUrl: string | null
  updatedAt: Date | string
}

export default function SlidesGrid({ initialSlides }: { initialSlides: SlideData[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = initialSlides.filter((s) => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || s.category === category
    return matchSearch && matchCat
  })

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search slides..." />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl bg-navy border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent"
        >
          <option value="All">All Categories</option>
          {brand.categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((slide) => (
          <a
            key={slide.id}
            href={`/admin/slides/${slide.id}/edit`}
            className="bg-navy-light rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-lg transition-all group"
          >
            <div className="h-40 bg-navy-lighter flex items-center justify-center">
              {slide.thumbnailUrl ? (
                <img src={slide.thumbnailUrl} alt={slide.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-600 text-sm">
                  {slide.componentType}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors mb-2">
                {slide.title}
              </h3>
              <div className="flex items-center justify-between">
                <Badge label={slide.category} />
                <span className="text-xs text-gray-500">
                  {new Date(slide.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </a>
        ))}

        <a
          href="/admin/slides/new"
          className="bg-navy-light rounded-2xl border border-dashed border-white/20 flex items-center justify-center min-h-[240px] hover:border-accent/50 hover:bg-accent/5 transition-all group"
        >
          <div className="text-center">
            <div className="text-3xl text-gray-600 group-hover:text-accent transition-colors mb-2">+</div>
            <div className="text-sm text-gray-500 group-hover:text-gray-400">Create New Slide</div>
          </div>
        </a>
      </div>
    </div>
  )
}
