import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
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

  // Dynamic statistics content depending on simulated role
  const metrics = [
    { label: 'Total Invitations', value: user.role === 'guest' ? '1' : '1,280', change: '+14% this month', icon: <MailCheck className="w-5 h-5 text-gold-500" /> },
    { label: 'Active Guests/RSVPs', value: user.role === 'guest' ? '0' : '4,892', change: '+24% this week', icon: <Users className="w-5 h-5 text-gold-500" /> },
    { label: 'SaaS Active Clients', value: user.role === 'guest' ? '1' : '342', change: '+8% this month', icon: <Sparkles className="w-5 h-5 text-gold-500" /> },
    { label: 'Conversion Performance', value: '94.2%', change: '+1.4% change', icon: <TrendingUp className="w-5 h-5 text-gold-500" /> }
  ]

  const handleRestrictedAction = (requiredRole, actionName) => {
    if (user.role === 'guest' && requiredRole !== 'guest') {
      addToast(`Action Denied: Role "${user.role}" does not have permissions to ${actionName}.`, 'error')
    } else {
      addToast(`Action "${actionName}" initialized successfully!`, 'success')
    }
  }

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
              Welcome back, <span className="gold-gradient-text">{user.name}</span>
            </h1>
            <p className="text-stone-500 dark:text-zinc-400 text-sm max-w-xl">
              Manage luxury invitation portfolios, analyze guest responses, and customize interactive templates with enterprise-grade reliability.
            </p>
          </div>

          {/* Context Actions */}
          <div className="flex gap-3">
            {(user.role === 'super_admin' || user.role === 'client') && (
              <GoldButton 
                variant="primary" 
                onClick={() => openModal('createInvitation')}
              >
                <Plus className="w-4 h-4 mr-2 inline" /> Create Invitation
              </GoldButton>
            )}
            {user.role === 'operator' && (
              <GoldButton 
                variant="glass" 
                onClick={() => handleRestrictedAction('operator', 'View System Audits')}
              >
                View System Audits
              </GoldButton>
            )}
          </div>
        </div>
      </GsapReveal>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GsapStagger delay={0.2}>
          {metrics.map((metric, i) => (
            <GlassCard key={i} className="flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-zinc-500">{metric.label}</span>
                <div className="p-2 rounded bg-gold-500/10 dark:bg-gold-500/5 border border-gold-500/20">{metric.icon}</div>
              </div>
              <div className="mt-2 space-y-1">
                <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-gold-100 m-0">{metric.value}</h3>
                <p className="text-[10px] text-emerald-500 font-semibold">{metric.change}</p>
              </div>
            </GlassCard>
          ))}
        </GsapStagger>
      </div>

      {/* Main Contents layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Invitation Themes */}
        <div className="lg:col-span-2 space-y-6">
          <GsapReveal delay={0.3} y={40}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-gold-200">Luxury Invitations Feed</h3>
              <Badge variant="gold">Simulated View</Badge>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-zinc-800 bg-stone-100/50 dark:bg-zinc-900/50 text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-zinc-400">
                      <th className="py-3.5 px-5">Slug</th>
                      <th className="py-3.5 px-5">Couple Names</th>
                      <th className="py-3.5 px-5">Theme Styles</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-zinc-800/40 text-xs">
                    <tr className="hover:bg-gold-500/5 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-gold-600 dark:text-gold-400">/aurelius-selene</td>
                      <td className="py-3.5 px-5 font-serif font-semibold text-stone-900 dark:text-stone-100">Aurelius & Selene</td>
                      <td className="py-3.5 px-5">Royal Glassmorphic (Gold)</td>
                      <td className="py-3.5 px-5"><Badge variant="success">Active</Badge></td>
                      <td className="py-3.5 px-5 text-right">
                        <button onClick={() => addToast('Opening preview...', 'info')} className="text-[10px] font-bold text-gold-500 hover:underline">Preview</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gold-500/5 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-gold-600 dark:text-gold-400">/julien-helena</td>
                      <td className="py-3.5 px-5 font-serif font-semibold text-stone-900 dark:text-stone-100">Julien & Helena</td>
                      <td className="py-3.5 px-5">Floral Velvet (Silver)</td>
                      <td className="py-3.5 px-5"><Badge variant="info">Draft</Badge></td>
                      <td className="py-3.5 px-5 text-right">
                        <button onClick={() => addToast('Opening preview...', 'info')} className="text-[10px] font-bold text-gold-500 hover:underline">Preview</button>
                      </td>
                    </tr>
                    {user.role !== 'guest' && (
                      <tr className="hover:bg-gold-500/5 transition-colors">
                        <td className="py-3.5 px-5 font-semibold text-gold-600 dark:text-gold-400">/damien-isabella</td>
                        <td className="py-3.5 px-5 font-serif font-semibold text-stone-900 dark:text-stone-100">Damien & Isabella</td>
                        <td className="py-3.5 px-5">Minimalist Silk (Gold)</td>
                        <td className="py-3.5 px-5"><Badge variant="warning">Suspended</Badge></td>
                        <td className="py-3.5 px-5 text-right">
                          <button onClick={() => addToast('Opening preview...', 'info')} className="text-[10px] font-bold text-gold-500 hover:underline">Preview</button>
                        </td>
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
            <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-gold-200">Role Status: {user.role.replace('_', ' ').toUpperCase()}</h3>
            <GlassCard borderGold className="space-y-4">
              <div className="text-xs text-stone-500 dark:text-zinc-400 leading-relaxed">
                As a <strong className="text-gold-500 capitalize">{user.role}</strong>, you have access to the following backend schemas and actions:
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-zinc-800">
                  <span>Create/Modify Designs</span>
                  <span>{['super_admin', 'client'].includes(user.role) ? <Badge variant="success">Allowed</Badge> : <Badge variant="error">Restricted</Badge>}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-zinc-800">
                  <span>Audit Database Entries</span>
                  <span>{['super_admin', 'operator'].includes(user.role) ? <Badge variant="success">Allowed</Badge> : <Badge variant="error">Restricted</Badge>}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-200 dark:border-zinc-800">
                  <span>Full Security Configurations</span>
                  <span>{user.role === 'super_admin' ? <Badge variant="gold">Admin Only</Badge> : <Badge variant="error">Restricted</Badge>}</span>
                </div>
              </div>

              <div className="pt-2">
                <GoldButton variant="glass" className="w-full text-xs" onClick={() => addToast(`Role verification check complete: ${user.role} is valid.`, 'info')}>
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
