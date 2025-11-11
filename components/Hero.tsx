'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import NeuralNetwork from './NeuralNetwork'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetwork />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">
              Ansuman Panda
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            a Machine Learning Engineer exploring the intersection of{' '}
            <span className="text-neon-blue">AI</span>,{' '}
            <span className="text-neon-purple">systems</span>, and{' '}
            <span className="text-neon-blue">design</span>.
          </motion.p>
          
          <motion.div
            className="flex gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="https://github.com/Ansuman11055"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-full flex items-center gap-3 hover:glow-border transition-all"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/ansuman11055"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-full flex items-center gap-3 hover:glow-border transition-all"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-neon-blue rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
