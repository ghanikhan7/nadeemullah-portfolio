import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Settings, BookOpen, UserCheck, Zap } from 'lucide-react'

const Skills: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const standards = ['TIA-942', 'Uptime', 'BICSI-002', 'ASHRAE', 'NFPA Guidelines']
  const software = ['MS Visio', 'MS Office', 'Revit', 'Navisworks', 'AutoCAD', 'Lumion']
  const softSkills = ['Critical Thinking', 'Organization', 'Negotiation', 'Teamwork', 'Planning', 'Communication', 'Resilience', 'Flexibility']
  const achievements = [
    'Prepared proposals which won projects against major competitors',
    'Mentored more than 100 students',
    'Conducted 10+ training batches for Modeling and Drafting',
    'Successfully made 100+ sales within two years of establishment'
  ]

  return (
    <section id="skills" className="py-24 bg-[#050B14] relative border-t border-gray-800/50">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <Settings className="text-[#00A3FF]" /> Tools & Standards
              </h3>
              <div className="mb-8">
                <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Standards</h4>
                <div className="flex flex-wrap gap-3">
                  {standards.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-gray-200 text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Software</h4>
                <div className="flex flex-wrap gap-3">
                  {software.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-md text-[#00A3FF] text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <UserCheck className="text-[#00A3FF]" /> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((item, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-gray-200 text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel p-8 rounded-xl border border-gray-800"
            >
              <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <Zap className="text-[#00A3FF]" /> Key Achievements
              </h3>
              <ul className="space-y-4">
                {achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#00A3FF] mt-1 shrink-0">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel p-8 rounded-xl border border-[#00A3FF]/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00A3FF]/10 blur-[40px]"></div>
              <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <BookOpen className="text-[#00A3FF]" /> Education
              </h3>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">Bachelor of Science</h4>
                <p className="text-gray-400 mb-2">(Computer Science & Electronics)</p>
                <p className="text-[#00A3FF] font-medium">Osmania University, India</p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Skills
