import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
import { Calendar, MapPin, Sparkles, Send, Trash2, Eye } from 'lucide-react'

export const InvitationsPage = () => {
  const { user } = useAuthStore()
  const { openModal } = useModalStore()
  const { addToast } = useToastStore()

  // Sample luxury invitations list
  const invitations = [
    {
      id: 1,
      couple: 'Aurelius & Selene',
      date: '2026-09-12',
      venue: 'The Glasshouse, Jakarta',
      theme: 'Royal Glassmorphism (Gold)',
      rsvpCount: 420,
      status: 'active',
      slug: 'aurelius-selene'
    },
    {
      id: 2,
      couple: 'Julien & Helena',
      date: '2026-10-05',
      venue: 'Amanjiwo, Yogyakarta',
      theme: 'Floral Velvet (Silver)',
      rsvpCount: 154,
      status: 'draft',
      slug: 'julien-helena'
    },
    {
      id: 3,
      couple: 'Dimitri & Vivienne',
      date: '2026-11-20',
      venue: 'The Mulia, Bali',
      theme: 'Midnight Sapphire (Blue)',
      rsvpCount: 890,
      status: 'active',
      slug: 'dimitri-vivienne'
    }
  ]

  const handleDelete = (couple) => {
    if (user.role !== 'super_admin') {
      addToast(`Access Denied: Only "super_admin" can delete invitations. Your role: "${user.role}"`, 'error')
    } else {
      addToast(`Invitation for "${couple}" deleted successfully (Simulated)`, 'success')
    }
  }

  const handleShare = (slug) => {
    navigator.clipboard.writeText(`https://leo-invitation.com/v/${slug}`)
    addToast('Invitation URL copied to clipboard!', 'success')
  }

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <GsapReveal delay={0.1}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 m-0">
              Wedding <span className="gold-gradient-text">Invitations</span>
            </h1>
            <p className="text-stone-500 dark:text-zinc-400 text-sm">
              Design, customize, and manage active customer digital invitations.
            </p>
          </div>
          {['super_admin', 'client'].includes(user.role) && (
            <GoldButton onClick={() => openModal('createInvitation')}>
              Create New Invitation
            </GoldButton>
          )}
        </div>
      </GsapReveal>

      {/* Grid of Invitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GsapStagger stagger={0.15} delay={0.2}>
          {invitations.map((inv) => (
            <GlassCard key={inv.id} className="relative flex flex-col justify-between h-[280px] overflow-hidden border border-stone-200 dark:border-zinc-800/80 hover:border-gold-500/30">
              
              {/* Premium Top Bar */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">{inv.theme}</span>
                  <h3 className="text-xl font-serif font-bold text-stone-950 dark:text-stone-100">{inv.couple}</h3>
                </div>
                <Badge variant={inv.status === 'active' ? 'success' : 'info'}>
                  {inv.status}
                </Badge>
              </div>

              {/* Invitation specs */}
              <div className="space-y-2.5 text-xs text-stone-500 dark:text-zinc-400 my-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold-500" />
                  <span>{new Date(inv.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span className="truncate">{inv.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span><strong>{inv.rsvpCount}</strong> guests registered</span>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-zinc-800/80">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(inv.slug)}
                    title="Copy Invitation Link"
                    className="p-2 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-gold-500 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => addToast(`Opening preview for /v/${inv.slug}`, 'info')}
                    title="Live Preview"
                    className="p-2 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-gold-500 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => handleDelete(inv.couple)}
                  className="p-2 rounded text-stone-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer"
                  title="Delete invitation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </GlassCard>
          ))}
        </GsapStagger>
      </div>
    </div>
  )
}
