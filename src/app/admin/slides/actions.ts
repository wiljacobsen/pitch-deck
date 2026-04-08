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

export async function getSlides(category?: string, search?: string) {
  const where: Record<string, unknown> = {}
  if (category && category !== 'All') {
    where.category = category
  }
  if (search) {
    where.title = { contains: search, mode: 'insensitive' }
  }
  return prisma.slide.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: { creator: { select: { name: true, email: true } } },
  })
}

export async function getSlide(id: string) {
  return prisma.slide.findUnique({
    where: { id },
    include: { creator: { select: { name: true, email: true } } },
  })
}

export async function createSlide(data: {
  title: string
  category: string
  componentType: string
  description?: string
  contentData: Record<string, unknown>
  thumbnailUrl?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  let slug = slugify(data.title)
  const existing = await prisma.slide.findUnique({ where: { slug } })
  if (existing) {
    slug = `${slug}-${Date.now()}`
  }

  const slide = await prisma.slide.create({
    data: {
      title: data.title,
      slug,
      category: data.category,
      componentType: data.componentType,
      description: data.description || null,
      contentData: data.contentData as unknown as import('@prisma/client').Prisma.InputJsonValue,
      thumbnailUrl: data.thumbnailUrl || null,
      createdBy: session.user.id,
    },
  })

  revalidatePath('/admin/slides')
  return slide
}

export async function updateSlide(
  id: string,
  data: {
    title?: string
    category?: string
    description?: string
    contentData?: Record<string, unknown>
    thumbnailUrl?: string
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  const updateData: Record<string, unknown> = { ...data }
  if (data.title) {
    updateData.slug = slugify(data.title)
    const existing = await prisma.slide.findFirst({
      where: { slug: updateData.slug as string, NOT: { id } },
    })
    if (existing) {
      updateData.slug = `${updateData.slug}-${Date.now()}`
    }
  }

  const slide = await prisma.slide.update({
    where: { id },
    data: updateData,
  })

  revalidatePath('/admin/slides')
  revalidatePath(`/admin/slides/${id}/edit`)
  return slide
}

export async function deleteSlide(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Not authenticated')

  await prisma.slide.delete({ where: { id } })
  revalidatePath('/admin/slides')
}
