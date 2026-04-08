'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { brand } from '@/lib/brand'
import { slideRegistry } from '@/lib/slide-registry'
import type { ContentFieldSchema } from '@/types'
import SlidePreview from './SlidePreview'
import { createSlide, updateSlide } from '@/app/admin/slides/actions'

interface SlideFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    id: string
    title: string
    category: string
    componentType: string
    description: string | null
    contentData: Record<string, unknown>
  }
}

const componentTypeOptions = Object.entries(slideRegistry).map(([key, entry]) => ({
  value: key,
  label: entry.label,
}))

const categoryOptions = brand.categories.map((c) => ({ value: c, label: c }))

export default function SlideForm({ mode, initialData }: SlideFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [category, setCategory] = useState(initialData?.category || 'Custom')
  const [componentType, setComponentType] = useState(initialData?.componentType || 'text-block')
  const [description, setDescription] = useState(initialData?.description || '')
  const [contentData, setContentData] = useState<Record<string, unknown>>(
    initialData?.contentData || {}
  )
  const [saving, setSaving] = useState(false)

  const registryEntry = slideRegistry[componentType]
  const contentSchema = registryEntry?.contentSchema || {}

  const updateContentField = useCallback((key: string, value: unknown) => {
    setContentData((prev) => ({ ...prev, [key]: value }))
  }, [])

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    try {
      if (mode === 'create') {
        const slide = await createSlide({
          title,
          category,
          componentType,
          description: description || undefined,
          contentData,
        })
        router.push(`/admin/slides/${slide.id}/edit`)
      } else if (initialData) {
        await updateSlide(initialData.id, {
          title,
          category,
          description: description || undefined,
          contentData,
        })
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
      {/* Form panel */}
      <div className="overflow-y-auto pr-2 space-y-5">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Slide title" />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categoryOptions}
          />
          {mode === 'create' && (
            <Select
              label="Component Type"
              value={componentType}
              onChange={(e) => {
                setComponentType(e.target.value)
                setContentData({})
              }}
              options={componentTypeOptions}
            />
          )}
        </div>
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description..."
          className="min-h-[60px]"
        />

        <div className="border-t border-white/10 pt-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Content</h3>
          {registryEntry?.isCodeConfigured && Object.keys(contentSchema).length === 0 ? (
            <div className="rounded-xl bg-navy border border-white/10 p-4 text-sm text-gray-400">
              This slide type is configured via code — edit the component source directly or via Claude Code.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(contentSchema).map(([key, schema]) => (
                <ContentField
                  key={key}
                  fieldKey={key}
                  schema={schema}
                  value={contentData[key]}
                  onChange={(val) => updateContentField(key, val)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button onClick={handleSave} disabled={saving || !title.trim()}>
            {saving ? 'Saving...' : mode === 'create' ? 'Create Slide' : 'Save Changes'}
          </Button>
          <Button variant="ghost" onClick={() => router.push('/admin/slides')}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Preview panel */}
      <div className="bg-navy-lighter rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-3 border-b border-white/10 text-xs text-gray-500 font-medium">
          LIVE PREVIEW
        </div>
        <div className="h-[calc(100%-40px)]">
          <SlidePreview componentType={componentType} contentData={contentData} />
        </div>
      </div>
    </div>
  )
}

function ContentField({
  fieldKey,
  schema,
  value,
  onChange,
}: {
  fieldKey: string
  schema: ContentFieldSchema
  value: unknown
  onChange: (val: unknown) => void
}) {
  if (schema.type === 'text' || schema.type === 'image-url') {
    return (
      <Input
        label={schema.label}
        value={(value as string) ?? (schema.default as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={schema.type === 'image-url' ? 'https://...' : ''}
      />
    )
  }

  if (schema.type === 'textarea') {
    return (
      <Textarea
        label={schema.label}
        value={(value as string) ?? (schema.default as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  if (schema.type === 'number') {
    return (
      <Input
        label={schema.label}
        type="number"
        value={(value as string) ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    )
  }

  if (schema.type === 'select' && schema.options) {
    return (
      <Select
        label={schema.label}
        value={(value as string) ?? (schema.default as string) ?? schema.options[0]}
        onChange={(e) => onChange(e.target.value)}
        options={schema.options.map((o) => ({ value: o, label: o }))}
      />
    )
  }

  if (schema.type === 'repeater' && schema.fields) {
    const items = (value as Record<string, unknown>[]) || []
    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{schema.label}</label>
        {items.map((item, i) => (
          <div key={i} className="bg-navy rounded-xl border border-white/10 p-3 mb-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">#{i + 1}</span>
              <button
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
            {Object.entries(schema.fields!).map(([fKey, fSchema]) => (
              <ContentField
                key={fKey}
                fieldKey={fKey}
                schema={fSchema}
                value={item[fKey]}
                onChange={(val) => {
                  const updated = [...items]
                  updated[i] = { ...updated[i], [fKey]: val }
                  onChange(updated)
                }}
              />
            ))}
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange([...items, {}])}
        >
          + Add {schema.label}
        </Button>
      </div>
    )
  }

  return null
}
