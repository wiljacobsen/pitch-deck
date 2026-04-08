'use client'

import { slideRegistry } from '@/lib/slide-registry'

interface SlidePreviewProps {
  componentType: string
  contentData: Record<string, unknown>
  dark?: boolean
}

export default function SlidePreview({ componentType, contentData, dark = true }: SlidePreviewProps) {
  const entry = slideRegistry[componentType]
  if (!entry) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
        Unknown component type: {componentType}
      </div>
    )
  }

  const Component = entry.component

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        className="origin-top-left"
        style={{
          transform: 'scale(0.45)',
          width: '222%',
          height: '222%',
        }}
      >
        <Component contentData={contentData} dark={dark} />
      </div>
    </div>
  )
}
