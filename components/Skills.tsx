'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { revealVariants, containerVariants, itemVariants } from '@/lib/animations'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiTensorflow,
  SiPytorch,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiFlask,
  SiFastapi,
} from 'react-icons/si'
import { Brain, Network, Eye } from 'lucide-react'

// Map skill names to icon components
const skillIconMap: Record<string, React.ReactNode> = {
  'Python': <SiPython className="w-7 h-7 sm:w-9 sm:h-9" />,
  'JavaScript': <SiJavascript className="w-7 h-7 sm:w-9 sm:h-9" />,
  'TypeScript': <SiTypescript className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Machine Learning': <Brain className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Deep Learning': <Network className="w-7 h-7 sm:w-9 sm:h-9" />,
  'NLP': <Brain className="w-7 h-7 sm:w-9 sm:h-9" />,
  'TensorFlow': <SiTensorflow className="w-7 h-7 sm:w-9 sm:h-9" />,
  'PyTorch': <SiPytorch className="w-7 h-7 sm:w-9 sm:h-9" />,
  'FastAPI': <SiFastapi className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Flask': <SiFlask className="w-7 h-7 sm:w-9 sm:h-9" />,
  'React': <SiReact className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Next.js': <SiNextdotjs className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Node.js': <SiNodedotjs className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Git': <SiGit className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Docker': <SiDocker className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Neural Networks': <Network className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Computer Vision': <Eye className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Data Science': <Brain className="w-7 h-7 sm:w-9 sm:h-9" />,
}

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

  return (
    <section id="skills" className="min-h-screen py-20 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section heading with reveal */}
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold gradient-text leading-tight">
            Skills & Technologies
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-neon-blue to-neon-purple mt-4 rounded-full mx-auto" />
        </motion.div>
        
        {/* Skills grid with circular neon icons */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              className="group flex flex-col items-center"
            >
              {/* Circular neon icon container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-full border-1.5 border-neon-blue/70 bg-gray-900/60 flex items-center justify-center cursor-pointer shadow-lg group-hover:shadow-neon-blue/40 transition-shadow duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full border border-neon-blue/0 group-hover:border-neon-blue/50 transition-all duration-300" />
                
                {/* Icon inside circle */}
                <div
                  className="text-neon-blue/85 group-hover:text-neon-blue transition-colors duration-300"
                  aria-hidden="true"
                >
                  {skillIconMap[skill] || <Brain className="w-7 h-7 sm:w-9 sm:h-9" />}
                </div>
              </motion.div>
              
              {/* Skill name label below (visible on hover on mobile, always on desktop) */}
              <span className="hidden sm:block text-xs text-gray-400 text-center leading-tight">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Closing statement with reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
          className="text-center"
        >
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-400 max-w-3xl mx-auto">
            Constantly learning and exploring new technologies to build innovative solutions 
            that bridge the gap between artificial intelligence and human experience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
