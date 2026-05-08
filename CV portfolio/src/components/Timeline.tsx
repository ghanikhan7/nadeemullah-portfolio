import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase } from 'lucide-react'

const Timeline: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const careerSteps = [
    { year: '2024', company: 'Kent Data Centers (Sudlows Consulting)', active: true },
    { year: '2023', company: 'Salfo & Associates', active: false },
    { year: '2021', company: 'Flint International', active: false },
    { year: '2018', company: 'Meinhardt, Qatar', active: false },
    { year: '2016', company: 'On Infra, India', active: false },
    { year: '2012', company: 'Dar-Al-Riyadh', active: false },
  ]

  return (
    <section id="timeline" className="py-24 bg-[#050B14] relative">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Career <span className="text-[#00A3FF]">Progression</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-[#00A3FF] mx-auto"
          ></motion.div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2"></div>
          
          <div className="flex flex-col gap-12">
            {careerSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[28px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#050B14] z-10 ${
                  step.active ? 'bg-[#00A3FF] scale-125 shadow-[0_0_15px_rgba(0,163,255,0.5)]' : 'bg-gray-600'
                }`}></div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                  idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className={`glass-panel p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 ${
                    step.active ? 'border-[#00A3FF]/30 shadow-[0_0_20px_rgba(0,163,255,0.05)]' : 'border-gray-800/50'
                  }`}>
                    <div className={`flex items-center gap-3 mb-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Briefcase size={16} className={step.active ? 'text-[#00A3FF]' : 'text-gray-500'} />
                      <span className={`text-sm font-bold tracking-wider ${step.active ? 'text-[#00A3FF]' : 'text-gray-500'}`}>
                        {step.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.company}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
