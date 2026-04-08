export const dynamic = 'force-dynamic'

import { getDecks } from './actions'
import { Badge } from '@/components/ui/Badge'

export default async function DecksPage() {
  const decks = await getDecks()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">All Decks</h1>
        <a
          href="/admin/decks/new"
          className="rounded-full bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          + New Deck
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <a
            key={deck.id}
            href={`/admin/decks/${deck.id}/edit`}
            className="bg-navy-light rounded-2xl border border-white/10 p-5 hover:border-white/20 hover:shadow-lg transition-all group"
          >
            <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors mb-1">
              {deck.title}
            </h3>
            {deck.clientName && (
              <p className="text-sm text-gray-400 mb-3">{deck.clientName}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{deck._count.deckSlides} slides</span>
              <span className="text-gray-700">|</span>
              <Badge label={deck.isPublished ? 'Published' : 'Draft'} />
              <span className="ml-auto">{new Date(deck.updatedAt).toLocaleDateString()}</span>
            </div>
          </a>
        ))}

        <a
          href="/admin/decks/new"
          className="bg-navy-light rounded-2xl border border-dashed border-white/20 flex items-center justify-center min-h-[140px] hover:border-accent/50 hover:bg-accent/5 transition-all group"
        >
          <div className="text-center">
            <div className="text-3xl text-gray-600 group-hover:text-accent transition-colors mb-2">+</div>
            <div className="text-sm text-gray-500 group-hover:text-gray-400">Create New Deck</div>
          </div>
        </a>
      </div>
    </div>
  )
}
