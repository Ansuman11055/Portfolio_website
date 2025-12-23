"use client"

import { motion } from 'framer-motion'
import { GraduationCap, Calendar } from 'lucide-react'
import { revealVariants, itemVariants } from '@/lib/animations'

const educationData = [
  {
    degree: 'Indian Institute of Technology Mandi',
    institution: 'B.Tech in Civil Engineering',
    year: 'Class of 2028',
    description:
      "Pursuing a B.Tech in Civil Engineering with a strong focus on computational methods, data-driven modeling, and applied machine learning in civil and infrastructure systems. Experienced in integrating programming, numerical methods, and system-level thinking to solve engineering problems, with active involvement in AI-assisted analysis and full-stack engineering workflows.",
    achievements: [],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section heading with reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealVariants}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold gradient-text leading-tight">
            Education
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-neon-blue to-neon-purple mt-4 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-neon-blue to-neon-purple opacity-20 transform -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {educationData.map((edu, idx) => {
              const isLeft = idx % 2 === 0

              return (
                <motion.div
                  key={edu.institution + idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="md:grid md:grid-cols-3 items-center"
                >
                  {/* Left column (card on left for even items) */}
                  <div className={`md:col-span-1 flex justify-${isLeft ? 'end' : 'start'} md:px-6`}> 
                    {isLeft && (
                      <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 max-w-md">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple">
                            <GraduationCap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold gradient-text">{edu.degree}</h3>
                            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)]">{edu.institution}</p>
                          </div>
                        </div>

                        <div className="mt-3 text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">{edu.description}</div>

                        {edu.achievements && (
                          <ul className="mt-4 space-y-2">
                            {edu.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-300">
                                <span className="mt-1 w-2 h-2 rounded-full bg-neon-blue/80 flex-shrink-0" />
                                <span className="text-[clamp(0.75rem,1.5vw,0.9rem)] leading-tight">{a}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Center column with dot / year */}
                  <div className="md:col-span-1 flex flex-col items-center">
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white border-2 border-white/10">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="mt-3 text-gray-400 text-[clamp(0.75rem,1.5vw,0.875rem)]">
                      <Calendar className="w-4 h-4 inline-block mr-2 text-gray-300" />
                      <span className="align-middle">{edu.year}</span>
                    </div>
                  </div>

                  {/* Right column (card on right for odd items) */}
                  <div className={`md:col-span-1 flex justify-${isLeft ? 'start' : 'end'} md:px-6`}> 
                    {!isLeft && (
                      <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 max-w-md">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple">
                            <GraduationCap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold gradient-text">{edu.degree}</h3>
                            <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)]">{edu.institution}</p>
                          </div>
                        </div>

                        <div className="mt-3 text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">{edu.description}</div>

                        {edu.achievements && (
                          <ul className="mt-4 space-y-2">
                            {edu.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-300">
                                <span className="mt-1 w-2 h-2 rounded-full bg-neon-blue/80 flex-shrink-0" />
                                <span className="text-[clamp(0.75rem,1.5vw,0.9rem)] leading-tight">{a}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
