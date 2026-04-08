import { notFound } from 'next/navigation'
import { getSlide } from '../../actions'
import SlideForm from '@/components/admin/SlideForm'

export default async function EditSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const slide = await getSlide(id)
  if (!slide) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Edit Slide</h1>
      <SlideForm
        mode="edit"
        initialData={{
          id: slide.id,
          title: slide.title,
          category: slide.category,
          componentType: slide.componentType,
          description: slide.description,
          contentData: slide.contentData as Record<string, unknown>,
        }}
      />
    </div>
  )
}
