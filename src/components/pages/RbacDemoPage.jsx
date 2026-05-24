import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useToastStore } from '../../stores/toastStore'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
import { ShieldCheck, Info, Sparkles, Check, AlertCircle } from 'lucide-react'

export const RbacDemoPage = () => {
  const { user, setRole } = useAuthStore()
  const { addToast } = useToastStore()

  // Permissions Matrix Definition
  const permissionsList = [
    { name: 'View Invitations / RSVP Dashboard', allowed: ['super_admin', 'client', 'operator', 'guest'] },
    { name: 'RSVP Submission (Guest Wishes)', allowed: ['super_admin', 'client', 'operator', 'guest'] },
    { name: 'Create & Publish Invitations', allowed: ['super_admin', 'client'] },
    { name: 'Edit Theme Configurations & Templates', allowed: ['super_admin', 'client'] },
    { name: 'Audit Logs & DB System Check', allowed: ['super_admin', 'operator'] },
    { name: 'Manage Staff and Client Billing', allowed: ['super_admin'] },
    { name: 'Full RBAC Policy Modification', allowed: ['super_admin'] }
  ]

  const handleTestPermission = (actionName, requiredRoles) => {
    const isAllowed = requiredRoles.includes(user.role)
    if (isAllowed) {
      addToast(`Access Granted: "${user.role}" is authorized to perform "${actionName}".`, 'success')
    } else {
      addToast(`Access Denied: "${user.role}" is NOT authorized to perform "${actionName}". Requires: ${requiredRoles.join(', ')}`, 'error')
    }
  }

  return (
    <div className="space-y-8 text-left">
      {/* Header Info */}
      <GsapReveal delay={0.1}>
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 m-0">
            Role-Based <span className="gold-gradient-text">Access Control (RBAC)</span>
          </h1>
          <p className="text-stone-500 dark:text-zinc-400 text-sm">
            Simulate user authorization policies in real time. Switch active roles and execute security checkpoints.
          </p>
        </div>
      </GsapReveal>

      {/* Selector and Active Role details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Switcher & Status */}
        <div className="space-y-6">
          <GsapReveal delay={0.2} y={30}>
            <GlassCard borderGold className="space-y-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-500" />
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-gold-200">Simulation Hub</h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400 leading-relaxed">
                Click any role below to instantly switch the interface configuration and test component visibility.
              </p>
              
              <div className="flex flex-col gap-2.5">
                {['super_admin', 'client', 'operator', 'guest'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r)
                      addToast(`Switched active role to "${r}"`, 'info')
                    }}
                    className={`
                      w-full px-4 py-2.5 rounded text-left text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-between cursor-pointer
                      ${user.role === r 
                        ? 'gold-gradient-bg text-zinc-950 font-bold shadow-md' 
                        : 'border border-stone-200 dark:border-zinc-800 text-stone-600 dark:text-zinc-400 hover:border-gold-500/30'}
                    `}
                  >
                    <span>{r.replace('_', ' ')}</span>
                    {user.role === r && <Check className="w-4 h-4 text-zinc-950" />}
                  </button>
                ))}
              </div>
            </GlassCard>
          </GsapReveal>
        </div>

        {/* Permissions Matrix Grid */}
        <div className="lg:col-span-2 space-y-6">
          <GsapReveal delay={0.3} y={30}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-gold-200">Authorization Matrix</h3>
              <Badge variant="gold">Laravel Policy Synced</Badge>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-zinc-800 bg-stone-100/50 dark:bg-zinc-900/50 text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-zinc-400">
                      <th className="py-3 px-4">Operation / Capability</th>
                      <th className="py-3 px-4 text-center">Super Admin</th>
                      <th className="py-3 px-4 text-center">Client</th>
                      <th className="py-3 px-4 text-center">Operator</th>
                      <th className="py-3 px-4 text-center">Guest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-zinc-800/40 font-medium">
                    {permissionsList.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-gold-500/3 transition-colors">
                        <td className="py-3.5 px-4 text-stone-800 dark:text-zinc-200">{perm.name}</td>
                        {['super_admin', 'client', 'operator', 'guest'].map((r) => {
                          const hasAccess = perm.allowed.includes(r)
                          return (
                            <td key={r} className="py-3.5 px-4 text-center">
                              {hasAccess ? (
                                <Check className="w-4 h-4 mx-auto text-emerald-500" />
                              ) : (
                                <AlertCircle className="w-4 h-4 mx-auto text-rose-500/40 dark:text-rose-500/20" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </GsapReveal>
        </div>

      </div>

      {/* Interactive Action Verification Checks */}
      <GsapReveal delay={0.4} y={30}>
        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-gold-200 mb-4">Security Test Checkpoints</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest">Submit Guest RSVP</h4>
            <p className="text-xs text-stone-500 dark:text-zinc-400">Allowed for all roles. Simulate submitting guest attendance wishes.</p>
            <GoldButton variant="glass" className="w-full text-xs" onClick={() => handleTestPermission('Submit RSVP', ['super_admin', 'client', 'operator', 'guest'])}>
              Submit RSVP
            </GoldButton>
          </GlassCard>
          <GlassCard className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest">Publish New Theme</h4>
            <p className="text-xs text-stone-500 dark:text-zinc-400">Requires client or admin. Simulates publishing designs.</p>
            <GoldButton variant="glass" className="w-full text-xs" onClick={() => handleTestPermission('Publish Theme', ['super_admin', 'client'])}>
              Publish Theme
            </GoldButton>
          </GlassCard>
          <GlassCard className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest">Review Audit Database Logs</h4>
            <p className="text-xs text-stone-500 dark:text-zinc-400">Requires operator or admin. Simulates DB analysis.</p>
            <GoldButton variant="glass" className="w-full text-xs" onClick={() => handleTestPermission('View Audits', ['super_admin', 'operator'])}>
              View Audits
            </GoldButton>
          </GlassCard>
          <GlassCard className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest">Modify Client Billing</h4>
            <p className="text-xs text-stone-500 dark:text-zinc-400">Requires Super Admin role. Simulates billing configuration.</p>
            <GoldButton variant="glass" className="w-full text-xs" onClick={() => handleTestPermission('Manage Billing', ['super_admin'])}>
              Manage Billing
            </GoldButton>
          </GlassCard>
        </div>
      </GsapReveal>
    </div>
  )
}
