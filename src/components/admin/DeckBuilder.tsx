'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { SearchInput } from '@/components/ui/SearchInput'
import { createDeck, updateDeck, assignViewers } from '@/app/admin/decks/actions'

interface SlideItem {
  id: string
  title: string
  category: string
  componentType: string
  thumbnailUrl: string | null
}

interface ViewerItem {
  id: string
  name: string | null
  email: string
}

interface DeckBuilderProps {
  mode: 'create' | 'edit'
  allSlides: SlideItem[]
  allViewers: ViewerItem[]
  initialData?: {
    id: string
    title: string
    clientName: string | null
    description: string | null
    isPublished: boolean
    slideIds: string[]
    viewerIds: string[]
  }
}

function SortableSlideItem({
  slide,
  position,
  onRemove,
}: {
  slide: SlideItem
  position: number
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: slide.id + '-' + position,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-navy rounded-xl border border-white/10 p-3 group"
    >
      <div
        {...attributes}
        {...listeners}
        className="text-gray-600 hover:text-gray-400 cursor-grab active:cursor-grabbing"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
      </div>
      <span className="text-xs text-gray-500 font-mono w-6">{position + 1}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-white truncate">{slide.title}</div>
        <div className="text-xs text-gray-500">{slide.componentType}</div>
      </div>
      <button onClick={onRemove} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default function DeckBuilder({ mode, allSlides, allViewers, initialData }: DeckBuilderProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [clientName, setClientName] = useState(initialData?.clientName || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false)
  const [selectedSlideIds, setSelectedSlideIds] = useState<string[]>(initialData?.slideIds || [])
  const [selectedViewerIds, setSelectedViewerIds] = useState<string[]>(initialData?.viewerIds || [])
  const [librarySearch, setLibrarySearch] = useState('')
  const [libraryCategory, setLibraryCategory] = useState('All')
  const [showViewerModal, setShowViewerModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const filteredLibrary = allSlides.filter((s) => {
    const matchSearch = !librarySearch || s.title.toLowerCase().includes(librarySearch.toLowerCase())
    const matchCat = libraryCategory === 'All' || s.category === libraryCategory
    return matchSearch && matchCat
  })

  const selectedSlides = selectedSlideIds
    .map((id) => allSlides.find((s) => s.id === id))
    .filter(Boolean) as SlideItem[]

  const sortableIds = selectedSlideIds.map((id, i) => id + '-' + i)

  function addSlide(slideId: string) {
    setSelectedSlideIds((prev) => [...prev, slideId])
  }

  function removeSlide(index: number) {
    setSelectedSlideIds((prev) => prev.filter((_, i) => i !== index))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sortableIds.indexOf(active.id as string)
    const newIndex = sortableIds.indexOf(over.id as string)
    if (oldIndex === -1 || newIndex === -1) return

    const updated = [...selectedSlideIds]
    const [moved] = updated.splice(oldIndex, 1)
    updated.splice(newIndex, 0, moved)
    setSelectedSlideIds(updated)
  }

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    try {
      if (mode === 'create') {
        const deck = await createDeck({
          title,
          clientName: clientName || undefined,
          description: description || undefined,
          slideIds: selectedSlideIds,
        })
        if (isPublished) {
          await updateDeck(deck.id, { isPublished: true })
        }
        router.push(`/admin/decks/${deck.id}/edit`)
      } else if (initialData) {
        await updateDeck(initialData.id, {
          title,
          clientName,
          description,
          slideIds: selectedSlideIds,
          isPublished,
        })
        if (selectedViewerIds.length > 0 || (initialData.viewerIds.length > 0 && selectedViewerIds.length === 0)) {
          await assignViewers(initialData.id, selectedViewerIds)
        }
      }
    } finally {
      setSaving(false)
    }
  }

  const deckSlug = initialData
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : ''

  return (
    <div className="space-y-6">
      {/* Header fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Deck Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Symphony Business Overview" />
        <Input label="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Client A" />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional..." className="min-h-[42px]" />
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: '500px' }}>
        {/* Left: Slide Library */}
        <div className="bg-navy-light rounded-2xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Slide Library</h3>
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <SearchInput value={librarySearch} onChange={setLibrarySearch} placeholder="Search slides..." />
            </div>
            <select
              value={libraryCategory}
              onChange={(e) => setLibraryCategory(e.target.value)}
              className="rounded-xl bg-navy border border-white/10 px-3 py-2 text-white text-xs focus:outline-none"
            >
              <option value="All">All</option>
              {['Introduction', 'Value Chain', 'Products', 'Partnerships', 'Team', 'Company', 'Custom'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
            {filteredLibrary.map((slide) => (
              <button
                key={slide.id}
                onClick={() => addSlide(slide.id)}
                className="bg-navy rounded-xl border border-white/10 p-3 text-left hover:border-accent/30 hover:bg-accent/5 transition-all"
              >
                <div className="h-16 bg-navy-lighter rounded-lg mb-2 flex items-center justify-center text-gray-600 text-[10px]">
                  {slide.componentType}
                </div>
                <div className="text-xs text-white truncate">{slide.title}</div>
                <Badge label={slide.category} className="mt-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Deck Composition */}
        <div className="bg-navy-light rounded-2xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Deck Composition ({selectedSlides.length} slides)
          </h3>
          {selectedSlides.length === 0 ? (
            <div className="text-center py-16 text-gray-600 text-sm">
              Click slides from the library to add them
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {selectedSlides.map((slide, i) => (
                    <SortableSlideItem
                      key={sortableIds[i]}
                      slide={slide}
                      position={i}
                      onRemove={() => removeSlide(i)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <Button onClick={handleSave} disabled={saving || !title.trim()}>
          {saving ? 'Saving...' : mode === 'create' ? 'Create Deck' : 'Save Changes'}
        </Button>
        {mode === 'edit' && initialData && (
          <a
            href={`/deck/${deckSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent text-accent px-5 py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            Preview Deck
          </a>
        )}
        <label className="flex items-center gap-2 ml-4 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="accent-accent"
          />
          <span className="text-sm text-gray-400">Published</span>
        </label>
        {mode === 'edit' && (
          <Button variant="secondary" size="sm" onClick={() => setShowViewerModal(true)} className="ml-auto">
            Assign Viewers
          </Button>
        )}
      </div>

      {/* Viewer Modal */}
      <Modal open={showViewerModal} onClose={() => setShowViewerModal(false)} title="Assign Viewers">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allViewers.length === 0 ? (
            <p className="text-sm text-gray-500">No viewer accounts yet. Create viewers in Settings &gt; Users.</p>
          ) : (
            allViewers.map((viewer) => (
              <label key={viewer.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedViewerIds.includes(viewer.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedViewerIds((prev) => [...prev, viewer.id])
                    } else {
                      setSelectedViewerIds((prev) => prev.filter((id) => id !== viewer.id))
                    }
                  }}
                  className="accent-accent"
                />
                <div>
                  <div className="text-sm text-white">{viewer.name || viewer.email}</div>
                  <div className="text-xs text-gray-500">{viewer.email}</div>
                </div>
              </label>
            ))
          )}
        </div>
        <div className="mt-4">
          <Button onClick={() => setShowViewerModal(false)}>Done</Button>
        </div>
      </Modal>
    </div>
  )
}
