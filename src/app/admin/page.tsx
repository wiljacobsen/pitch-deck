export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [slideCount, deckCount, userCount] = await Promise.all([
    prisma.slide.count(),
    prisma.deck.count(),
    prisma.user.count(),
  ])

  const stats = [
    { label: 'Total Slides', value: slideCount, color: 'text-accent' },
    { label: 'Total Decks', value: deckCount, color: 'text-cat-load' },
    { label: 'Total Users', value: userCount, color: 'text-cat-gen' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-navy-light rounded-2xl border border-white/10 p-6"
          >
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-navy-light rounded-2xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="flex gap-3">
          <a
            href="/admin/slides/new"
            className="rounded-full bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            New Slide
          </a>
          <a
            href="/admin/decks/new"
            className="rounded-full border border-accent text-accent px-5 py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            New Deck
          </a>
        </div>
      </div>
    </div>
  )
}
