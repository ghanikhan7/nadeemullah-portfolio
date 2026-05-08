import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle } from 'lucide-react'

const Expertise: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const expertiseList = [
    "Datacenter Design (Traditional, Prefab, & Hybrid)",
    "Making Quick Proposals for DC Facilities",
    "Preparing Facilities and Whitespace Layouts",
    "Containment Design (HAC & CAC)",
    "Load Calculations (Day1 to Ultimate)",
    "Technical Documentations/Agreements",
    "Developing RFPs, RFQs, SOW, SLAs etc.",
    "Preparing GAP Analysis Report",
    "Preparing Uptime TCDD & TCCF",
    "Design and Implementation of Fi/Co Cabling",
    "Tier Design as per TIA, BICSI, and Uptime",
    "Immersion and Liquid Cooling",
    "Data Center Deployments",
    "HVAC Designs (In-Row, Fanwall, & Perimeter etc.)",
    "ATS, Busway, UPS, Batteries and Generators",
    "Extra Low Voltage Services (FA, CCTV, BMS etc.)",
    "Structured Cabling (SLD, Rack Elevations, BOQs)",
    "DCiM Monitoring",
    "Construction/design Supervision",
    "Walkthroughs and Animation of Data Centers",
    "Making presentable 3D Model of Data Centers",
    "Drafting and visualization of the DC Facility",
    "Software trainings (AutoCAD and Revit)",
    "Making Wonderful Presentations"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="expertise" className="py-24 bg-[#050B14] relative">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Core <span className="text-[#00A3FF]">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive solutions across the entire lifecycle of mission-critical data center infrastructure.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {expertiseList.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-panel p-5 rounded-lg flex items-start gap-4 hover:border-[#00A3FF]/50 transition-colors duration-300 group cursor-default"
            >
              <CheckCircle className="text-[#00A3FF] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={20} />
              <span className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Expertise
