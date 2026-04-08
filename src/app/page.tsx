export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }
  if (session.user?.role === 'ADMIN') {
    redirect('/admin')
  }

  // Viewer home: show published decks and decks assigned to this user
  const decks = await prisma.deck.findMany({
    where: {
      OR: [
        { isPublished: true },
        { deckAccess: { some: { userId: session.user.id } } },
      ],
    },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <img src="/Symphony_Logo_White.png" alt="Symphony" className="h-10 mb-3" />
            <h1 className="text-2xl font-bold tracking-tight">Your Decks</h1>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign out
            </button>
          </form>
        </div>

        {decks.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>No decks available yet.</p>
            <p className="text-sm mt-1">Ask an admin to assign you to a deck.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decks.map((deck) => (
              <a
                key={deck.id}
                href={`/deck/${deck.slug}`}
                className="bg-navy-light rounded-2xl border border-white/10 p-6 hover:border-accent/30 hover:bg-accent/5 transition-all group"
              >
                <h2 className="text-lg font-semibold group-hover:text-accent-light transition-colors">
                  {deck.title}
                </h2>
                {deck.clientName && (
                  <p className="text-sm text-gray-400 mt-1">{deck.clientName}</p>
                )}
                {deck.description && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{deck.description}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
