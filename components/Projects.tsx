'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { revealVariants, containerVariants, itemVariants, hoverDepth } from '@/lib/animations'

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

  return (
    <section id="projects" className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto rounded-2xl bg-black/20 backdrop-blur-md shadow-2xl p-8">
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
            Featured Projects
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-neon-blue to-neon-purple mt-4 rounded-full" />
        </motion.div>

        {/* Project grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              whileHover={hoverDepth.hover}
              initial={hoverDepth.initial}
              className="glass rounded-2xl p-6 md:p-8 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Gradient accent bar */}
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${project.gradient} mb-6`}
              />

              {/* Project name */}
              <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                {project.name}
              </h3>

              {/* Project description */}
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs md:text-sm bg-white/5 rounded-full border border-white/10 text-gray-300 hover:border-neon-blue/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 text-sm md:text-base"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Code</span>
                </motion.a>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-neon-purple hover:text-neon-blue transition-colors duration-300 text-sm md:text-base"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  <span>View</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
