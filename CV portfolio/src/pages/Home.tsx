import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Expertise from '../components/Expertise'
import Projects from '../components/Projects'
import Timeline from '../components/Timeline'
import Certifications from '../components/Certifications'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { trackPageView } from '../hooks/useFirebase'

const Home: React.FC = () => {
  React.useEffect(() => {
    trackPageView()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Timeline />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
