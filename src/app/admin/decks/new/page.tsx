export const dynamic = 'force-dynamic'

import DeckBuilder from '@/components/admin/DeckBuilder'
import { getAllSlides, getAllViewers } from './../../decks/actions'

export default async function NewDeckPage() {
  const [allSlides, allViewers] = await Promise.all([getAllSlides(), getAllViewers()])

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Create New Deck</h1>
      <DeckBuilder mode="create" allSlides={allSlides} allViewers={allViewers} />
    </div>
  )
}
