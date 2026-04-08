'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import type { Role } from '@prisma/client'

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
}

export async function createUser(data: {
  email: string
  name: string
  password: string
  role: Role
}) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') throw new Error('Not authorized')

  const passwordHash = await hash(data.password, 12)
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash,
      role: data.role,
    },
  })

  revalidatePath('/admin/users')
  return user
}

export async function updateUser(
  id: string,
  data: { name?: string; email?: string; role?: Role; password?: string }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') throw new Error('Not authorized')

  const updateData: Record<string, unknown> = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.email !== undefined) updateData.email = data.email
  if (data.role !== undefined) updateData.role = data.role
  if (data.password) updateData.passwordHash = await hash(data.password, 12)

  await prisma.user.update({ where: { id }, data: updateData })
  revalidatePath('/admin/users')
}

export async function deleteUser(id: string) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') throw new Error('Not authorized')

  // Prevent deleting yourself
  if (id === session.user.id) throw new Error('Cannot delete your own account')

  await prisma.user.delete({ where: { id } })
  revalidatePath('/admin/users')
}
