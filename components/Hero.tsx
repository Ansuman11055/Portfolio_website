'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Github, Linkedin } from 'lucide-react'
import NeuralNetwork from './NeuralNetwork'
import { slideUp, itemVariants, containerVariants } from '@/lib/animations'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax effect: content moves slower than scroll
  // stronger parallax for more visible motion
  const y = useTransform(scrollY, [0, 800], [0, 260])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.25])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-carbon-black"
    >
      {/* Background decorative element */}
      <NeuralNetwork />
      
      {/* Main content with scroll parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Headline container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Main headline with fluid typography */}
          <motion.h1
            variants={slideUp}
            className="text-[clamp(2.5rem,7vw,5rem)] md:text-[clamp(3rem,8vw,5.5rem)] font-bold leading-tight tracking-tighter"
          >
            <span>Hi, I&apos;m</span>
            <br />
            <span className="gradient-text block">Ansuman Panda</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={slideUp}
            className="text-[clamp(1rem,2.5vw,1.5rem)] text-gray-400 leading-relaxed max-w-3xl mx-auto"
          >
            a Machine Learning Engineer exploring the intersection of{' '}
            <span className="text-neon-blue font-semibold">AI</span>,{' '}
            <span className="text-neon-purple font-semibold">systems</span>, and{' '}
            <span className="text-neon-blue font-semibold">design</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={slideUp}
            className="flex gap-4 justify-center pt-6 flex-wrap md:flex-nowrap"
          >
            <motion.a
              href="https://github.com/Ansuman11055"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="glass px-6 md:px-8 py-3 rounded-full flex items-center gap-2 text-sm md:text-base hover:glow-border transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/ansuman11055"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="glass px-6 md:px-8 py-3 rounded-full flex items-center gap-2 text-sm md:text-base hover:glow-border transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — subtle, restrained */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border border-gray-500 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
