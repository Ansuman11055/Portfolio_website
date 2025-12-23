'use client'

import { useScroll, useSpring, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // smooth the progress with a spring
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 })
  const [current, setCurrent] = useState<string>('')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[data-section]')) as HTMLElement[]
    if (sections.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const sec = visible[0].target as HTMLElement
          setCurrent(sec.getAttribute('data-section') || '')
        }
      },
      { threshold: [0.35, 0.6, 0.9] }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div className="fixed left-1/2 -translate-x-1/2 top-4 z-50 w-72 md:w-96 pointer-events-none">
      <div className="flex items-center gap-3">
        <div className="h-1 w-full bg-white/6 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: progress }}
            className="origin-left h-1 bg-gradient-to-r from-neon-blue to-neon-purple"
          />
        </div>
        <div className="hidden md:block w-28 text-right text-xs text-gray-300">{current}</div>
      </div>
    </motion.div>
  )
}
