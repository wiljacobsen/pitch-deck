import { useRef } from 'react'
import { useScroll } from 'motion/react'
import ValueChainCanvas from './ValueChainCanvas'

export default function ValueChainSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-navy">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ValueChainCanvas scrollYProgress={scrollYProgress} />
      </div>
    </section>
  )
}
