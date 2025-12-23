'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { revealVariants } from '@/lib/animations'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={revealVariants}
            className="text-center md:text-left"
          >
            <p className="text-gray-400 text-[clamp(0.875rem,1.5vw,1rem)]">
              Designed with{' '}
              <span className="text-neon-blue">logic</span> and{' '}
              <span className="text-neon-purple">creativity</span>
            </p>
            <p className="text-gray-500 mt-2 text-[clamp(0.75rem,1.5vw,0.875rem)]">
              © {new Date().getFullYear()} Ansuman Panda. All rights reserved.
            </p>
          </motion.div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass p-4 rounded-full hover:glow-border transition-all"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowUp className="w-6 h-6 text-neon-blue" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
