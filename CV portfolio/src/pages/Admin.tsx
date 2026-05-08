import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { useAnalytics, useProjectsCount } from '../hooks/useFirebase'
import { LayoutDashboard, Users, FolderKanban, Settings, LogOut, MessageSquare } from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  company: string
  message: string
  timestamp: any
  read: boolean
}

const Admin: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Overview')
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const { analytics } = useAnalytics()
  const { count: projectsCount } = useProjectsCount()
  const navigate = useNavigate()

  useEffect(() => {
    // Auth state is handled by ProtectedRoute, but we keep this for cleanup
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      }
    })

    // Fetch Inquiries
    const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'))
    const unsubscribeDb = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry))
      setInquiries(data)
    }, (error) => {
      console.error("Error fetching inquiries:", error)
    })

    return () => {
      unsubscribeAuth()
      unsubscribeDb()
    }
  }, [navigate])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (loading) {
    return <div className="min-h-screen bg-[#02050A] flex items-center justify-center text-white">Authenticating...</div>
  }

  const stats = [
    { label: 'Total Views', value: analytics ? analytics.views.toLocaleString() : '...', change: '+1' },
    { label: 'Inquiries', value: inquiries.length.toString(), change: 'Real-time' },
    { label: 'Projects', value: projectsCount.toString(), change: 'Real-time' },
  ]

  const tabs = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { icon: <MessageSquare size={20} />, label: 'Inquiries' },
    { icon: <FolderKanban size={20} />, label: 'Projects' },
    { icon: <Users size={20} />, label: 'Clients' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-[#02050A] flex flex-col md:flex-row text-gray-200">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#050B14] border-r border-gray-800 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-gray-800">
          <span className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF]"></span>
            Executive Panel
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.label ? 'bg-[#00A3FF]/10 text-[#00A3FF] font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}>
              {item.icon} {item.label}
              {item.label === 'Inquiries' && inquiries.length > 0 && (
                <span className="ml-auto bg-[#00A3FF] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {inquiries.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">{activeTab}</h1>
          <p className="text-gray-500 mt-1">Welcome back, Mohammed Nadeemullah</p>
        </header>

        {activeTab === 'Overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-xl border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.label}</h3>
                  <div className="flex items-end gap-4">
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                    <span className={`text-sm font-medium mb-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Messages Area */}
            <div className="glass-panel rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
                <button onClick={() => setActiveTab('Inquiries')} className="text-sm text-[#00A3FF] hover:text-white transition-colors">View All</button>
              </div>
              <div className="p-0">
                {inquiries.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <MessageSquare size={32} className="mx-auto mb-4 opacity-50" />
                    <p>No new messages found.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800">
                    {inquiries.slice(0, 5).map(inq => (
                      <div key={inq.id} className="p-6 hover:bg-gray-800/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-200">{inq.name}</h4>
                            <p className="text-sm text-[#00A3FF]">{inq.email} {inq.company && `• ${inq.company}`}</p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {inq.timestamp ? new Date(inq.timestamp.seconds * 1000).toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'Inquiries' && (
          <div className="glass-panel rounded-xl border border-gray-800 overflow-hidden">
            {inquiries.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <MessageSquare size={32} className="mx-auto mb-4 opacity-50" />
                <p>No inquiries received yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {inquiries.map(inq => (
                  <div key={inq.id} className="p-6 hover:bg-gray-800/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-200">{inq.name}</h4>
                        <p className="text-sm text-[#00A3FF]">{inq.email} {inq.company && `• ${inq.company}`}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {inq.timestamp ? new Date(inq.timestamp.seconds * 1000).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <div className="mt-4 p-4 bg-[#050B14] rounded-lg border border-gray-800">
                      <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{inq.message}</p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <a href={`mailto:${inq.email}`} className="px-4 py-2 bg-[#00A3FF]/10 text-[#00A3FF] rounded text-sm font-medium hover:bg-[#00A3FF] hover:text-white transition-colors">
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {['Projects', 'Clients', 'Settings'].includes(activeTab) && (
          <div className="glass-panel rounded-xl border border-gray-800 p-12 text-center">
            <h2 className="text-xl font-bold text-white mb-2">{activeTab} Management</h2>
            <p className="text-gray-500">This module is currently under development.</p>
          </div>
        )}

      </main>
    </div>
  )
}

export default Admin
