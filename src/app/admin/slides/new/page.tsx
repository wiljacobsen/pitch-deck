import SlideForm from '@/components/admin/SlideForm'

export default function NewSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Create New Slide</h1>
      <SlideForm mode="create" />
    </div>
  )
}
