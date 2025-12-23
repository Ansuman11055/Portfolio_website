'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { revealVariants, containerVariants, itemVariants, slideLeft, slideRight } from '@/lib/animations'

export default function About() {
  const ref = useRef(null)

  const highlights = [
    { emoji: '🎓', text: 'IIT Mandi, B.Tech \'28' },
    { emoji: '🤖', text: 'Machine Learning Engineer' },
    { emoji: '💻', text: 'Full-Stack Developer' },
    { emoji: '🧠', text: 'AI Enthusiast' },
  ]

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section heading with reveal */}
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealVariants}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold gradient-text leading-tight">
            About Me
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-neon-blue to-neon-purple mt-4 rounded-full" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content - left side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={slideLeft}
            className="space-y-6 order-2 md:order-1"
          >
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-300 leading-relaxed">
              I'm a B.Tech student at{' '}
              <span className="text-neon-blue font-semibold">IIT Mandi ('28)</span>{' '}
              passionate about building intelligent systems that combine algorithmic depth 
              with real-world impact.
            </p>
            
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-300 leading-relaxed">
              I explore{' '}
              <span className="text-neon-purple font-semibold">AI</span>,{' '}
              <span className="text-neon-blue font-semibold">full-stack development</span>, 
              and{' '}
              <span className="text-neon-purple font-semibold">edge computing</span>{' '}
              — crafting solutions that feel both technical and human.
            </p>
            
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-300 leading-relaxed">
              My work spans from neural networks and NLP to building responsive web 
              applications that push the boundaries of user experience.
            </p>
            
            {/* Highlights grid with stagger */}
            <motion.div
              className="glass p-6 rounded-2xl space-y-3 mt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-4"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
                  <span className="text-[clamp(1rem,1.5vw,1.125rem)]">{highlight.emoji} {highlight.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Profile image - right side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={slideRight}
            className="relative group order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Profile image container */}
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-neon-blue/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Ansuman Panda"
                  fill
                  className="object-cover object-center scale-110"
                  priority
                />
              </motion.div>
              
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-neon-blue/20 group-hover:border-neon-blue/40 transition-all duration-300" />
              <div className="absolute -inset-8 rounded-full border border-neon-purple/10 group-hover:border-neon-purple/30 transition-all duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
