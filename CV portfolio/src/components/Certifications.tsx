import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, X, ZoomIn } from 'lucide-react'
import { useCertifications } from '../hooks/useFirebase'

const Certifications: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedCert, setSelectedCert] = useState<number | null>(null)
  const { certifications, loading } = useCertifications()

  const certs = certifications || [];

  return (
    <section id="certifications" className="py-24 bg-[#050B14] relative border-t border-gray-800/50">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Professional <span className="text-[#00A3FF]">Certifications</span> & Credentials
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-20 h-1 bg-[#00A3FF] mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Globally recognized certifications and industry credentials demonstrating expertise in mission-critical infrastructure, project management, sustainability, and enterprise data center technologies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="glass-panel rounded-xl overflow-hidden h-[400px] bg-[#0A1428]/80 animate-pulse">
                <div className="h-48 bg-gray-800 w-full"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-700 w-3/4 rounded"></div>
                  <div className="h-4 bg-gray-700 w-1/2 rounded"></div>
                  <div className="h-20 bg-gray-700 w-full rounded"></div>
                </div>
              </div>
            ))
          ) : (
            certs.length > 0 ? (
              certs.map((cert, idx) => (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel group rounded-xl overflow-hidden border border-gray-800/50 hover:border-[#00A3FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,163,255,0.15)] flex flex-col h-full bg-[#0A1428]/80 cursor-pointer"
                  onClick={() => setSelectedCert(idx)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 w-full overflow-hidden border-b border-gray-800/50 bg-[#050B14]">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-transparent to-transparent opacity-80"></div>
                    
                    {/* Hover overlay with zoom icon */}
                    <div className="absolute inset-0 bg-[#00A3FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-[#050B14]/80 p-3 rounded-full text-[#00A3FF] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ZoomIn size={24} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="text-xl font-bold text-gray-100 leading-tight group-hover:text-white transition-colors">{cert.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="text-[#00A3FF]" size={16} />
                      <p className="text-[#00A3FF] text-sm font-semibold uppercase tracking-wider">{cert.issuer}</p>
                    </div>
                    <p className="text-gray-400 text-sm mt-auto leading-relaxed">{cert.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass-panel rounded-xl">
                <Award className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400 text-lg">No certifications found in the database.</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedCert !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#050B14]/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0A1428] rounded-xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-[#00A3FF] text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center p-4 min-h-[300px]">
                <img 
                  src={certs[selectedCert].image} 
                  alt={certs[selectedCert].title} 
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-800">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] text-xs font-semibold mb-6 w-max">
                  <Award size={14} />
                  Verified Credential
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {certs[selectedCert].title}
                </h3>
                
                <p className="text-[#00A3FF] text-lg font-medium mb-6">
                  {certs[selectedCert].issuer}
                </p>
                
                <div className="h-px w-full bg-gradient-to-r from-gray-800 to-transparent mb-6"></div>
                
                <p className="text-gray-300 leading-relaxed mb-8">
                  {certs[selectedCert].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certifications

