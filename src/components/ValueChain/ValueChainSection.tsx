import { useRef } from 'react'
import { useScroll } from 'motion/react'
import ValueChainCanvas from './ValueChainCanvas'

export default function ValueChainSection({ dark }: { dark: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className={`relative h-[600vh] transition-colors duration-500 ${dark ? 'bg-navy' : 'bg-gray-50'}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ValueChainCanvas scrollYProgress={scrollYProgress} dark={dark} />
      </div>
    </section>
  )
}
