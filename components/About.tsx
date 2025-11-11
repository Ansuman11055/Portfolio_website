'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 order-2 md:order-1"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a B.Tech student at{' '}
                <span className="text-neon-blue font-semibold">IIT Mandi ('28)</span>{' '}
                passionate about building intelligent systems that combine algorithmic depth 
                with real-world impact.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                I explore{' '}
                <span className="text-neon-purple font-semibold">AI</span>,{' '}
                <span className="text-neon-blue font-semibold">full-stack development</span>, 
                and{' '}
                <span className="text-neon-purple font-semibold">edge computing</span>{' '}
                — crafting solutions that feel both technical and human.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                My work spans from neural networks and NLP to building responsive web 
                applications that push the boundaries of user experience.
              </p>
              
              <div className="glass p-6 rounded-2xl space-y-3 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse" />
                  <span className="text-lg">🎓 IIT Mandi, B.Tech '28</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
                  <span className="text-lg">🤖 Machine Learning Engineer</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse" />
                  <span className="text-lg">💻 Full-Stack Developer</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
                  <span className="text-lg">🧠 AI Enthusiast</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group order-1 md:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Profile image container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-neon-blue/50 transition-all duration-300">
                  <Image
                    src="/profile.jpg"
                    alt="Ansuman Panda"
                    fill
                    className="object-cover object-center scale-110"
                    priority
                  />
                </div>
                
                {/* Decorative rings */}
                <div className="absolute -inset-4 rounded-full border border-neon-blue/20 group-hover:border-neon-blue/40 transition-all duration-300" />
                <div className="absolute -inset-8 rounded-full border border-neon-purple/10 group-hover:border-neon-purple/30 transition-all duration-300" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
