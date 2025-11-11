'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400">
              Designed with{' '}
              <span className="text-neon-blue">logic</span> and{' '}
              <span className="text-neon-purple">creativity</span>
            </p>
            <p className="text-gray-500 mt-2">
              © {new Date().getFullYear()} Ansuman Panda. All rights reserved.
            </p>
          </motion.div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass p-4 rounded-full hover:glow-border transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 text-neon-blue" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
