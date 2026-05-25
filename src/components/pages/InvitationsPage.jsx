import React, { useEffect } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { useEventStore } from '../../stores/eventStore'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
import { Calendar, MapPin, Sparkles, Send, Trash2, Eye, Copy, CheckCircle, Archive, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export const InvitationsPage = () => {
  const { user } = useAuthStore()
  const { openModal } = useModalStore()
  const { addToast } = useToastStore()
  const { events, loading, fetchEvents, deleteEvent, duplicateEvent, publishEvent, archiveEvent } = useEventStore()

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return
    try {
        await deleteEvent(id)
        addToast(`Event "${name}" deleted successfully`, 'success')
    } catch (e) {
        addToast('Failed to delete event', 'error')
    }
  }

  const handleDuplicate = async (id, name) => {
    try {
        await duplicateEvent(id)
        addToast(`Event "${name}" duplicated successfully`, 'success')
    } catch (e) {
        addToast('Failed to duplicate event', 'error')
    }
  }

  const handlePublish = async (id, name) => {
    try {
        await publishEvent(id)
        addToast(`Event "${name}" published successfully`, 'success')
    } catch (e) {
        addToast('Failed to publish event', 'error')
    }
  }

  const handleArchive = async (id, name) => {
    try {
        await archiveEvent(id)
        addToast(`Event "${name}" archived successfully`, 'success')
    } catch (e) {
        addToast('Failed to archive event', 'error')
    }
  }

  const handleShare = (slug) => {
    navigator.clipboard.writeText(`https://leo-invitation.com/v/${slug}`)
    addToast('Invitation URL copied to clipboard!', 'success')
  }

  const roleName = user?.role?.name || 'guest'

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <GsapReveal delay={0.1}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 m-0">
              Wedding <span className="gold-gradient-text">Events</span>
            </h1>
            <p className="text-stone-500 dark:text-zinc-400 text-sm">
              Design, customize, and manage active customer digital invitations.
            </p>
          </div>
          {['super_admin', 'client'].includes(roleName) && (
            <GoldButton onClick={() => openModal('createInvitation')}>
              Create New Event
            </GoldButton>
          )}
        </div>
      </GsapReveal>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && events.length === 0 ? (
           <div className="col-span-3 text-center py-10 text-stone-500">Loading events...</div>
        ) : (
        <GsapStagger stagger={0.15} delay={0.2}>
          {events.map((inv) => (
            <GlassCard key={inv.id} className="relative flex flex-col justify-between min-h-[280px] overflow-hidden border border-stone-200 dark:border-zinc-800/80 hover:border-gold-500/30">
              
              {/* Premium Top Bar */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">{inv.theme.replace('-', ' ')}</span>
                  <h3 className="text-xl font-serif font-bold text-stone-950 dark:text-stone-100">{inv.event_name}</h3>
                </div>
                <Badge variant={inv.status === 'published' ? 'success' : inv.status === 'draft' ? 'info' : 'warning'}>
                  {inv.status}
                </Badge>
              </div>

              {/* Invitation specs */}
              <div className="space-y-2.5 text-xs text-stone-500 dark:text-zinc-400 my-4 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold-500" />
                  <span>{inv.event_date ? new Date(inv.event_date).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'TBD'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span className="truncate">{inv.venue || 'TBD'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span className="capitalize">{inv.package} Package</span>
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
                  <Link 
                    to={`/events/${inv.id}/guests`}
                    title="Manage Guests"
                    className="p-2 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-gold-500 transition-all cursor-pointer inline-flex items-center justify-center"
                  >
                    <Users className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => handleDuplicate(inv.id, inv.event_name)}
                    title="Duplicate Event"
                    className="p-2 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-gold-500 transition-all cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {inv.status !== 'published' && (
                  <button 
                    onClick={() => handlePublish(inv.id, inv.event_name)}
                    title="Publish Event"
                    className="p-2 border border-stone-200 dark:border-zinc-800 hover:border-emerald-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-emerald-500 transition-all cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  )}
                  {inv.status !== 'archived' && (
                  <button 
                    onClick={() => handleArchive(inv.id, inv.event_name)}
                    title="Archive Event"
                    className="p-2 border border-stone-200 dark:border-zinc-800 hover:border-amber-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-amber-500 transition-all cursor-pointer"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  )}
                </div>

                <button 
                  onClick={() => handleDelete(inv.id, inv.event_name)}
                  className="p-2 rounded text-stone-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer"
                  title="Delete event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </GlassCard>
          ))}
        </GsapStagger>
        )}
      </div>
    </div>
  )
}
