import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getDeckBySlug } from '@/app/admin/decks/actions'
import DeckViewer from '@/components/deck-viewer/DeckViewer'

export default async function DeckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const session = await auth()
  if (!session) redirect('/login')

  const deck = await getDeckBySlug(slug)
  if (!deck) notFound()

  // Check access: admin can view all, viewers need DeckAccess
  if (session.user.role !== 'ADMIN') {
    const hasAccess = deck.deckAccess.some((da) => da.userId === session.user.id)
    if (!hasAccess && !deck.isPublished) {
      notFound()
    }
  }

  const slides = deck.deckSlides.map((ds) => ({
    id: ds.slide.id,
    componentType: ds.slide.componentType,
    contentData: ds.slide.contentData as Record<string, unknown>,
    title: ds.slide.title,
  }))

  return <DeckViewer title={deck.title} clientName={deck.clientName} slides={slides} />
}
