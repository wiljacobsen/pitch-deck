import { notFound } from 'next/navigation'
import { getDeck, getAllSlides, getAllViewers } from '../../actions'
import DeckBuilder from '@/components/admin/DeckBuilder'

export default async function EditDeckPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [deck, allSlides, allViewers] = await Promise.all([
    getDeck(id),
    getAllSlides(),
    getAllViewers(),
  ])

  if (!deck) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Edit Deck</h1>
      <DeckBuilder
        mode="edit"
        allSlides={allSlides}
        allViewers={allViewers}
        initialData={{
          id: deck.id,
          title: deck.title,
          clientName: deck.clientName,
          description: deck.description,
          isPublished: deck.isPublished,
          slideIds: deck.deckSlides.map((ds) => ds.slideId),
          viewerIds: deck.deckAccess.map((da) => da.userId),
        }}
      />
    </div>
  )
}
