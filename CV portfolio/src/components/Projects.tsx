import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, ArrowRight } from 'lucide-react'

const Projects: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const projects = [
    { title: '10 MW Hyperscale DC', location: 'Dammam', client: 'Microsoft (Center3)', spec: 'Hyperscale' },
    { title: '5 MW Colocation DC', location: 'Riyadh', client: 'Edgnex (Damac)', spec: 'Colocation' },
    { title: '3.6 MW Data Center', location: 'Riyadh', client: 'Center3', spec: 'Enterprise' },
    { title: '3.6 MW Data Center', location: 'Bahrain', client: 'Center3', spec: 'Enterprise' },
    { title: 'Hyper-scale Cloud', location: 'KSA', client: 'NEOM', spec: 'Cloud' },
    { title: 'T&D Hub (Tier-3)', location: 'Global', client: 'Various', spec: 'Tier-3' },
  ]

  const highlights = [
    "Designed ELV systems for Center3 Riyadh Data Center - 3.6 Megawatt",
    "Involved in the design of 10 MW Microsoft Data Center in Dammam",
    "Supervised construction activities of 5 MW Edgnex Riyadh Data Center",
    "Designed proposal for 400+ racks with immersion cooling for SaharaNET DC",
    "Designed Structured Cabling System for 60-Rack Data Center for Ctrl+V USA",
    "Designed 40-feet and 20-feet Crypto-mining containerized Data Centers",
    "Designed 30-Rack containerized Data Center solution for Zain Telecom",
    "Prepared proposal for 150-seater Mission Critical Control Center for National Grid (SEC)"
  ]

  return (
    <section id="projects" className="py-24 bg-[#0A1428] relative border-t border-gray-800/50">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Featured <span className="text-[#00A3FF]">Projects</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-20 h-1 bg-[#00A3FF]"
            ></motion.div>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#contact"
            className="flex items-center gap-2 text-[#00A3FF] hover:text-white transition-colors uppercase tracking-wider text-sm font-semibold"
          >
            Request Full Portfolio <ArrowRight size={16} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-800 hover:border-[#00A3FF]/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/5 blur-[60px] group-hover:bg-[#00A3FF]/20 transition-all"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#050B14] rounded-lg border border-gray-800">
                  <Server className="text-[#00A3FF]" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                  {project.spec}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              {project.location && (
                <div className="text-sm text-gray-400 mb-4">{project.location}</div>
              )}
              
              <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-sm text-gray-500">Client</span>
                <span className="text-sm font-semibold text-gray-300">{project.client}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-panel p-8 md:p-12 rounded-xl border border-[#00A3FF]/20 relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#00A3FF]/10 rounded-full blur-[80px]"></div>
          <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Key Achievements & Highlights</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-8">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-300">
                <span className="text-[#00A3FF] mt-1 shrink-0">▹</span>
                <span className="text-sm leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
