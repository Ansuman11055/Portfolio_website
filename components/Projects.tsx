'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { revealVariants, containerVariants, itemVariants, hoverDepth } from '@/lib/animations'


export const projects = [
  {
    title: "NeuroAdaptive",
    description: "Advanced ML-based system leveraging neural networks for adaptive learning and intelligent decision-making.",
    tags: ["TypeScript", "Machine Learning", "Neural Networks"],
    githubUrl: "https://github.com/Ansuman11055/NeuroAdaptive",
    liveUrl: ""
  },
  {
    title: "Portfolio Website",
    description: "Modern, futuristic portfolio showcasing projects with immersive animations and glassmorphism design.",
    tags: ["TypeScript", "Next.js", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/Ansuman11055/Portfolio-Website",
    liveUrl: ""
  },
  {
    title: "Mental Wellness PWA",
    description: "Progressive Web App providing mental health insights, mood tracking, and wellness resources.",
    tags: ["JavaScript", "PWA", "React", "Service Workers"],
    githubUrl: "https://github.com/Ansuman11055/Mental-Wellness-PWA",
    liveUrl: ""
  },
  {
    title: "Aethera Voice Assistant",
    description: "Intelligent speech-based assistant using NLP and voice recognition for seamless human-computer interaction.",
    tags: ["Python", "NLP", "Speech Recognition", "AI"],
    githubUrl: "https://github.com/Ansuman11055/Aethera-Voice-Assistant",
    liveUrl: ""
  }
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
              key={project.title}
              variants={itemVariants}
              whileHover={hoverDepth.hover}
              initial={hoverDepth.initial}
              className="rounded-xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="text-gray-200 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs md:text-sm bg-white/5 rounded-full border border-white/10 text-gray-300 hover:border-neon-blue/50 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 text-sm md:text-base"
                    >
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neon-purple hover:text-neon-blue transition-colors duration-300 text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      <span>View</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
