'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    name: 'NeuroAdaptive',
    description: 'Advanced ML-based system leveraging neural networks for adaptive learning and intelligent decision-making.',
    tech: ['TypeScript', 'Machine Learning', 'Neural Networks'],
    github: 'https://github.com/Ansuman11055/NeuroAdaptive',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Portfolio Website',
    description: 'Modern, futuristic portfolio showcasing projects with immersive animations and glassmorphism design.',
    tech: ['TypeScript', 'Next.js', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/Ansuman11055/Portfolio_web',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Mental Wellness PWA',
    description: 'Progressive Web App providing mental health insights, mood tracking, and wellness resources.',
    tech: ['JavaScript', 'PWA', 'React', 'Service Workers'],
    github: 'https://github.com/Ansuman11055/Mental-Wellness-PWA',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    name: 'Aethera Voice Assistant',
    description: 'Intelligent speech-based assistant using NLP and voice recognition for seamless human-computer interaction.',
    tech: ['Python', 'NLP', 'Speech Recognition', 'AI'],
    github: 'https://github.com/Ansuman11055/Aethera-Voice-Assistant',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    name: 'Attendance Tracker',
    description: 'Productivity automation tool for tracking attendance with smart notifications and analytics.',
    tech: ['JavaScript', 'Automation', 'Analytics'],
    github: 'https://github.com/Ansuman11055/Attendance-Tracker',
    gradient: 'from-cyan-500 to-blue-600',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 gradient-text">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 hover:glow-border transition-all duration-300 group"
              >
                <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${project.gradient} mb-6`} />
                
                <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                  {project.name}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-white/5 rounded-full border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </motion.a>
                  
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-neon-purple hover:text-neon-blue transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
