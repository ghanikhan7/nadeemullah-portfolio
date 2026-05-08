import React from 'react'
import { Server } from 'lucide-react'
import { useProfile } from '../hooks/useFirebase'

const Footer: React.FC = () => {
  const { profile } = useProfile()
  
  const displayName = profile?.name || "Mohammed Nadeemullah"
  const shortName = profile?.name ? (profile.name.includes('.') ? profile.name : profile.name) : "M.Nadeemullah"
  const firstNameInitial = shortName.split('.')[0] || "M"
  const restOfName = shortName.includes('.') ? shortName.split('.')[1] : shortName

  return (
    <footer className="bg-[#02050A] py-12 border-t border-gray-800/50">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Server className="text-[#00A3FF]" size={24} />
          <span className="text-xl font-bold tracking-tighter text-white">
            <span className="text-gradient-blue">{firstNameInitial}.</span>{restOfName}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} {displayName}. All rights reserved. <br className="md:hidden" />
          Data Center Facilities Consultant.
        </p>

        <div className="flex gap-4">
          <a href="#" className="text-gray-500 hover:text-[#00A3FF] transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-[#00A3FF] transition-colors text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

