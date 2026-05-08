import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronRight, Download, Mail } from 'lucide-react'
import { useProfile } from '../hooks/useFirebase'

const Hero: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { profile, loading } = useProfile()

  // Fallback data if Firebase is empty or loading
  const fallbackData = {
    name: 'Mohammed Nadeemullah',
    title: 'Mission-Critical Infrastructure Consultant',
    headline: 'Designing Mission-Critical Data Center Infrastructure for the Next Gen',
    description: '20+ Years of Specialized Experience in ICT & AEC Industry covering Hyperscale Data Centers, ELV Systems, Cooling, Power Infrastructure, Structured Cabling, and Facility Design.',
    heroImage: '/assets/profile/nadeemullah-profile.png',
    resumeUrl: '/assets/CV/nadeemullah-cv.pdf',
    yearsExperience: 20,
    majorProjects: 50,
    studentsMentored: 500,
    rackSolutions: 100
  }

  const data = {
    ...fallbackData,
    ...(profile || {})
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050B14] opacity-90"></div>
        {/* Abstract Data Center Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#8B9BB4 1px, transparent 1px), linear-gradient(90deg, #8B9BB4 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
          }}
        ></div>
        <div className="glow-effect glow-blue w-[600px] h-[600px] top-1/4 -left-32 opacity-30"></div>
        <div className="glow-effect glow-blue w-[500px] h-[500px] bottom-0 right-0 opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-4xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse"></span>
              {loading ? <div className="h-4 w-48 bg-gray-700 animate-pulse rounded"></div> : (data.title || fallbackData.title)}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
                {loading ? (
                <div className="space-y-3">
                  <div className="h-12 w-3/4 bg-gray-700 animate-pulse rounded"></div>
                  <div className="h-12 w-1/2 bg-gray-700 animate-pulse rounded"></div>
                </div>
              ) : (
                <>
                  {(data.headline || fallbackData.headline).split(' ').map((word: string, i: number) => (
                    word.toLowerCase() === 'data' || word.toLowerCase() === 'center' || word.toLowerCase() === 'infrastructure' ? 
                    <span key={i} className="text-gradient-blue">{word} </span> : <span key={i}>{word} </span>
                  ))}
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
            >
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-700 animate-pulse rounded"></div>
                  <div className="h-4 w-full bg-gray-700 animate-pulse rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-700 animate-pulse rounded"></div>
                </div>
              ) : (data.description || fallbackData.description)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <a href="#projects" className="flex items-center gap-2 bg-[#00A3FF] text-white px-6 py-3 rounded font-medium hover:bg-[#0077CC] transition-colors">
                View Projects <ChevronRight size={18} />
              </a>
              <a 
                href="/assets/CV/nadeemullah-cv.pdf" 
                download="Mohammed-Nadeemullah-CV.pdf"
                className="flex items-center gap-2 bg-transparent border border-gray-600 text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
              >
                Download CV <Download size={18} />
              </a>
              <a href="#contact" className="flex items-center gap-2 bg-transparent border border-gray-600 text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors">
                Contact Now <Mail size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-center relative mt-12 lg:mt-0"
          >
            {/* Elegant glowing background rings */}
            <div className="absolute inset-0 bg-[#00A3FF]/20 blur-[100px] rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px] m-auto"></div>
            
            {/* Profile Image Container */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full p-1 bg-gradient-to-tr from-[#00A3FF]/40 via-transparent to-[#00A3FF]/10 shadow-[0_0_50px_rgba(0,163,255,0.15)]"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#050B14] bg-[#0A1428] relative group">
                {/* Image */}
                {loading ? (
                  <div className="w-full h-full bg-gray-800 animate-pulse"></div>
                ) : (
                  <img 
                    src={data.heroImage || fallbackData.heroImage} 
                    alt={data.name || "Nadeemullah - Enterprise Consultant"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                
                {/* Inner Glow/Overlay */}
                <div className="absolute inset-0 rounded-full ring-inset ring-2 ring-[#00A3FF]/40 pointer-events-none group-hover:ring-[#00A3FF]/80 transition-all duration-500"></div>
              </div>
              
              {/* Outer Animated Ring */}
              <div className="absolute -inset-2 rounded-full border border-[#00A3FF]/30 border-dashed animate-[spin_20s_linear_infinite] pointer-events-none"></div>
              <div className="absolute -inset-4 rounded-full border border-[#00A3FF]/10 animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-800/50"
        >
          {[
            { label: 'Years Experience', value: data.yearsExperience, suffix: '+' },
            { label: 'Major DC Projects', value: data.majorProjects, suffix: '+' },
            { label: 'Students Mentored', value: data.studentsMentored, suffix: '+' },
            { label: 'Rack Solutions', value: data.rackSolutions, suffix: '+' },
          ].map((metric, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-[#00A3FF] mb-2">
                {loading ? '...' : metric.value}
                {metric.suffix}
              </div>
              <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

