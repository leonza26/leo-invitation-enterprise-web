import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { 
  Plus, 
  Users, 
  MailCheck, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  Layers,
  Settings
} from 'lucide-react'

export const DashboardPage = () => {
  const { user } = useAuthStore()
  const { openModal } = useModalStore()
  const { addToast } = useToastStore()
  
  const [data, setData] = useState({
      metrics: {
          total_events: 0,
          published_events: 0,
          total_guests: 0,
          rsvps_received: 0,
          vip_guests: 0
      },
      recent_events: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await api.dashboard.get()
              setData(res)
          } catch (e) {
              addToast('Failed to load dashboard metrics', 'error')
          } finally {
              setLoading(false)
          }
      }
      fetchData()
  }, [])

  const metrics = [
    { label: 'Total Events', value: data.metrics.total_events, change: 'Lifetime', icon: <MailCheck className="w-5 h-5 text-gold-500" /> },
    { label: 'Published Events', value: data.metrics.published_events, change: 'Active', icon: <Sparkles className="w-5 h-5 text-gold-500" /> },
    { label: 'Total RSVPs', value: data.metrics.rsvps_received, change: 'Recorded', icon: <Users className="w-5 h-5 text-gold-500" /> },
    { label: 'VIP Guests', value: data.metrics.vip_guests, change: 'Special', icon: <TrendingUp className="w-5 h-5 text-gold-500" /> }
  ]

  const handleRestrictedAction = (requiredRole, actionName) => {
    const roleName = user?.role?.name || 'guest'
    if (roleName === 'guest' && requiredRole !== 'guest') {
      addToast(`Action Denied: Role "${roleName}" does not have permissions to ${actionName}.`, 'error')
    } else {
      addToast(`Action "${actionName}" initialized successfully!`, 'success')
    }
  }

  const roleName = user?.role?.name || 'guest'

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Hero Panel */}
      <GsapReveal delay={0.1}>
        <div className="relative rounded-2xl p-8 overflow-hidden glass-panel-light dark:glass-panel-dark border border-gold-500/20 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Premium Wedding SaaS Experience</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 m-0">
              Welcome back, <span className="gold-gradient-text">{user?.name}</span>
            </h1>
            <p className="text-stone-500 dark:text-zinc-400 text-sm max-w-xl">
              Manage luxury invitation portfolios, analyze guest responses, and customize interactive templates with enterprise-grade reliability.
            </p>
          </div>

          {/* Context Actions */}
          <div className="flex gap-3 relative z-10">
            {(roleName === 'super_admin' || roleName === 'client') && (
              <Link to="/invitations" className="inline-flex items-center justify-center rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold hover:from-amber-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-4 py-2 transition-all">
                <Plus className="w-4 h-4 mr-2" /> Manage Events
              </Link>
            )}
          </div>
        </div>
      </GsapReveal>

      {/* Grid of Key Metrics */}
      {!loading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GsapStagger delay={0.2}>
          {metrics.map((metric, i) => (
            <GlassCard key={i} className="flex flex-col justify-between h-36 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-zinc-500">{metric.label}</span>
                <div className="p-2 rounded bg-gold-500/10 dark:bg-gold-500/5 border border-gold-500/20 transition-transform group-hover:scale-110 duration-300">{metric.icon}</div>
              </div>
              <div className="mt-2 space-y-1 relative z-10">
                <h3 className="text-3xl font-serif font-black text-stone-900 dark:text-gold-100 m-0 transition-colors group-hover:text-gold-500">{metric.value}</h3>
                <p className="text-[10px] text-amber-500 font-semibold uppercase">{metric.change}</p>
              </div>
            </GlassCard>
          ))}
        </GsapStagger>
      </div>
      )}

      {/* Main Contents layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Invitation Themes */}
        <div className="lg:col-span-2 space-y-6">
          <GsapReveal delay={0.3} y={40}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-gold-200">Recent Events Feed</h3>
              <Badge variant="gold">Live Data</Badge>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-zinc-800 bg-stone-100/50 dark:bg-zinc-900/50 text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-zinc-400">
                      <th className="py-3.5 px-5">Slug</th>
                      <th className="py-3.5 px-5">Event Name</th>
                      <th className="py-3.5 px-5">Theme Styles</th>
                      <th className="py-3.5 px-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-zinc-800/40 text-xs">
                    {data.recent_events.map(event => (
                      <tr key={event.id} className="hover:bg-gold-500/5 transition-colors">
                        <td className="py-3.5 px-5 font-semibold text-gold-600 dark:text-gold-400">/{event.slug}</td>
                        <td className="py-3.5 px-5 font-serif font-semibold text-stone-900 dark:text-stone-100">{event.event_name}</td>
                        <td className="py-3.5 px-5 capitalize">{event.theme.replace('-', ' ')}</td>
                        <td className="py-3.5 px-5">
                            <Badge variant={event.status === 'published' ? 'success' : event.status === 'draft' ? 'info' : 'warning'}>{event.status}</Badge>
                        </td>
                      </tr>
                    ))}
                    {data.recent_events.length === 0 && !loading && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-stone-500 dark:text-zinc-400">No events found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </GsapReveal>
        </div>

        {/* Right Column: Roles Capabilities Panel */}
        <div className="space-y-6">
          <GsapReveal delay={0.4} y={40}>
            <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-gold-200">Role Status: {roleName.replace('_', ' ').toUpperCase()}</h3>
            <GlassCard borderGold className="space-y-4">
              <div className="text-xs text-stone-500 dark:text-zinc-400 leading-relaxed">
                As a <strong className="text-gold-500 capitalize">{roleName}</strong>, you have access to the following backend schemas and actions:
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-zinc-800">
                  <span>Create/Modify Designs</span>
                  <span>{['super_admin', 'client'].includes(roleName) ? <Badge variant="success">Allowed</Badge> : <Badge variant="error">Restricted</Badge>}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-zinc-800">
                  <span>Audit Database Entries</span>
                  <span>{['super_admin', 'operator'].includes(roleName) ? <Badge variant="success">Allowed</Badge> : <Badge variant="error">Restricted</Badge>}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-zinc-800">
                  <span>Full Security Configurations</span>
                  <span>{roleName === 'super_admin' ? <Badge variant="gold">Admin Only</Badge> : <Badge variant="error">Restricted</Badge>}</span>
                </div>
              </div>

              <div className="pt-2">
                <GoldButton variant="glass" className="w-full text-xs" onClick={() => addToast(`Role verification check complete: ${roleName} is valid.`, 'info')}>
                  Verify Credentials
                </GoldButton>
              </div>
            </GlassCard>
          </GsapReveal>
        </div>

      </div>
    </div>
  )
}
