import type { Role } from '@prisma/client'

export interface SlideContentData {
  [key: string]: unknown
}

export interface ContentFieldSchema {
  type: 'text' | 'textarea' | 'number' | 'select' | 'repeater' | 'image-url'
  label: string
  default?: unknown
  options?: string[]
  fields?: Record<string, ContentFieldSchema>
}

export interface SlideRegistryEntry {
  component: React.ComponentType<SlideComponentProps>
  label: string
  category: string
  contentSchema: Record<string, ContentFieldSchema>
  isCodeConfigured?: boolean
}

export interface SlideComponentProps {
  contentData: SlideContentData
  dark: boolean
}

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: Role
}

declare module 'next-auth' {
  interface Session {
    user: SessionUser
  }
  interface User {
    role: Role
  }
}

