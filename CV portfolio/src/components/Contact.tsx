import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const Contact: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        timestamp: serverTimestamp(),
        read: false
      })
      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      console.error("Error submitting form: ", error)
      setStatus('idle')
      // If firebase is unconfigured, fallback to mailto could be added here, 
      // but for now we just log the error.
    }
  }

  const contactInfo = [
    { icon: <Mail />, label: 'Email', value: 'mdnadeemullah@gmail.com', href: 'mailto:mdnadeemullah@gmail.com' },
    { icon: <Phone />, label: 'Phone', value: '+966-55859-5577', href: 'tel:+966558595577' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, label: 'LinkedIn', value: 'mdnadeemullah', href: 'https://www.linkedin.com/in/mdnadeemullah' },
    { icon: <MapPin />, label: 'Location', value: 'Riyadh, KSA', href: '#' },
  ]

  return (
    <section id="contact" className="py-24 bg-[#0A1428] relative border-t border-gray-800/50">
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#00A3FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Get In <span className="text-[#00A3FF]">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-[#00A3FF] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Available for enterprise consulting, data center design architecture, and strategic infrastructure leadership roles.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <a key={idx} href={info.href} target={info.label === 'LinkedIn' ? '_blank' : '_self'} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">{info.label}</p>
                    <p className="text-gray-200 font-medium group-hover:text-[#00A3FF] transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel p-8 md:p-10 rounded-xl border border-gray-800 relative">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full bg-[#050B14] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00A3FF] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-[#050B14] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00A3FF] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Company (Optional)</label>
                  <input 
                    type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full bg-[#050B14] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00A3FF] transition-colors"
                    placeholder="Your Organization"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    name="message" required rows={5} value={formData.message} onChange={handleChange}
                    className="w-full bg-[#050B14] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00A3FF] transition-colors resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-[#00A3FF] text-white hover:bg-[#0077CC]'
                  }`}
                >
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
