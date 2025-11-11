'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'TensorFlow',
  'PyTorch',
  'FastAPI',
  'Flask',
  'React',
  'Next.js',
  'Node.js',
  'Git',
  'Docker',
  'Neural Networks',
  'Computer Vision',
  'Data Science',
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="min-h-screen py-20 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent text-center">
            Skills & Technologies
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: Math.random() * 10 - 5,
                  transition: { duration: 0.2 }
                }}
                className="glass px-6 py-3 rounded-full hover:glow-border transition-all cursor-pointer"
              >
                <span className="text-lg font-medium text-gray-200 hover:gradient-text transition-all">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Constantly learning and exploring new technologies to build innovative solutions 
              that bridge the gap between artificial intelligence and human experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
