import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BrainBackground from '@/components/BrainBackground'

export default function Home() {
  return (
    <main className="relative">
      <BrainBackground />
      {/* Translucent overlay for readability */}
      <div className="fixed inset-0 z-5 pointer-events-none bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AboutSection />
        <Education />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
