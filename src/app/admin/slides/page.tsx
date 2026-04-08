export const dynamic = 'force-dynamic'

import { getSlides } from './actions'
import SlidesGrid from '@/components/admin/SlidesGrid'

export default async function SlidesPage() {
  const slides = await getSlides()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">All Slides</h1>
        <a
          href="/admin/slides/new"
          className="rounded-full bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          + New Slide
        </a>
      </div>
      <SlidesGrid initialSlides={slides} />
    </div>
  )
}
