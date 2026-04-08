'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function getDecks(search?: string) {
  const where: Record<string, unknown> = {}
  if (search) {
    where.title = { contains: search, mode: 'insensitive' }
  }
  return prisma.deck.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: { select: { deckSlides: true } },
      creator: { select: { name: true, email: true } },
    },
  })
}

export async function getDeck(id: string) {
  return prisma.deck.findUnique({
    where: { id },
    include: {
      deckSlides: {
        orderBy: { position: 'asc' },
        include: { slide: true },
      },
      deckAccess: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      creator: { select: { name: true, email: true } },
    },
  })
}

export async function getDeckBySlug(slug: string) {
  return prisma.deck.findUnique({
    where: { slug },
    include: {
      deckSlides: {
        orderBy: { position: 'asc' },
        include: { slide: true },
      },
      deckAccess: true,
    },
  })
}

export async function createDeck(data: {
  title: string
  clientName?: string
  description?: string
  slideIds: string[]
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  let slug = slugify(data.title)
  const existing = await prisma.deck.findUnique({ where: { slug } })
  if (existing) slug = `${slug}-${Date.now()}`

  const deck = await prisma.deck.create({
    data: {
      title: data.title,
      slug,
      clientName: data.clientName || null,
      description: data.description || null,
      createdBy: session.user.id,
      deckSlides: {
        create: data.slideIds.map((slideId, i) => ({
          slideId,
          position: i,
        })),
      },
    },
  })

  revalidatePath('/admin/decks')
  return deck
}

export async function updateDeck(
  id: string,
  data: {
    title?: string
    clientName?: string
    description?: string
    slideIds?: string[]
    isPublished?: boolean
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  const updateData: Record<string, unknown> = {}
  if (data.title !== undefined) {
    updateData.title = data.title
    let slug = slugify(data.title)
    const existing = await prisma.deck.findFirst({
      where: { slug, NOT: { id } },
    })
    if (existing) slug = `${slug}-${Date.now()}`
    updateData.slug = slug
  }
  if (data.clientName !== undefined) updateData.clientName = data.clientName || null
  if (data.description !== undefined) updateData.description = data.description || null
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished

  await prisma.deck.update({ where: { id }, data: updateData })

  if (data.slideIds !== undefined) {
    await prisma.deckSlide.deleteMany({ where: { deckId: id } })
    if (data.slideIds.length > 0) {
      await prisma.deckSlide.createMany({
        data: data.slideIds.map((slideId, i) => ({
          deckId: id,
          slideId,
          position: i,
        })),
      })
    }
  }

  revalidatePath('/admin/decks')
  revalidatePath(`/admin/decks/${id}/edit`)
}

export async function deleteDeck(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  await prisma.deck.delete({ where: { id } })
  revalidatePath('/admin/decks')
}

export async function assignViewers(deckId: string, userIds: string[]) {
  await prisma.deckAccess.deleteMany({ where: { deckId } })
  if (userIds.length > 0) {
    await prisma.deckAccess.createMany({
      data: userIds.map((userId) => ({ deckId, userId })),
    })
  }
  revalidatePath(`/admin/decks/${deckId}/edit`)
}

export async function getAllSlides() {
  return prisma.slide.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      componentType: true,
      thumbnailUrl: true,
    },
  })
}

export async function getAllViewers() {
  return prisma.user.findMany({
    where: { role: 'VIEWER' },
    select: { id: true, name: true, email: true },
  })
}
