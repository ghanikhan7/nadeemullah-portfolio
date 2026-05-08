import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useProfile } from '../hooks/useFirebase'

const About: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { profile, loading } = useProfile()

  const defaultClients = [
    'Center3 (STC)', 'Edgnex (Damac)', 'NEOM', 'Syntys',
    'SBM', 'KAPSARC', 'Royal Commission', 'Qatar Rail'
  ]

  const hasProfile = profile && Object.keys(profile).length > 0
  const aboutText1 = hasProfile ? (profile.aboutText1 || "I can bring more than 20 years of highly specialized experience...") : "I can bring more than 20 years of highly specialized experience..."
  const aboutText2 = hasProfile ? (profile.aboutText2 || "I hold expertise in Planning, Designing...") : "I hold expertise in Planning, Designing..."
  const clients = hasProfile ? (profile.clients || defaultClients) : defaultClients

  return (
    <section id="about" className="py-24 relative bg-[#0A1428] border-t border-gray-800/50">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              What I Can <span className="text-[#00A3FF]">Bring</span>
            </h2>
            <div className="w-20 h-1 bg-[#00A3FF] mb-8"></div>
            
            {loading ? (
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded mt-8"></div>
                <div className="h-4 w-3/4 bg-gray-800 animate-pulse rounded"></div>
              </div>
            ) : (
              <>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {aboutText1}
                </p>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  {aboutText2}
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 md:p-10 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/10 blur-[50px]"></div>
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider border-b border-gray-700/50 pb-4">
              Trusted By Elite Organizations
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                    <div className="h-4 w-24 bg-gray-800 animate-pulse rounded"></div>
                  </div>
                ))
              ) : (
                clients.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00A3FF]"></div>
                    <span className="text-gray-300 font-medium">{client}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

