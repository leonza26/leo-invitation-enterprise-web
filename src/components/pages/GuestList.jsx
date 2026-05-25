import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { useGuestStore } from '../../stores/guestStore'
import api from '../../services/api'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
import { 
  Users, Search, Filter, Plus, Upload, Link2, Trash2, Edit3, MessageCircle, ChevronLeft, ChevronRight, MessageSquare
} from 'lucide-react'

export const GuestList = () => {
  const { eventId } = useParams()
  const { user } = useAuthStore()
  const { openModal } = useModalStore()
  const { addToast } = useToastStore()
  const { guests, pagination, loading, fetchGuests, deleteGuest } = useGuestStore()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({ category: '', attendance_status: '', vip_status: '' })
  
  // Debounce search
  const searchTimeout = useRef(null)

  useEffect(() => {
    fetchGuests(eventId, search, filter)
  }, [eventId, filter])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      fetchGuests(eventId, e.target.value, filter)
    }, 500)
  }

  const handlePageChange = (newPage) => {
    fetchGuests(eventId, search, { ...filter, page: newPage })
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete guest ${name}?`)) return
    try {
      await deleteGuest(eventId, id)
      addToast(`Guest ${name} deleted`, 'success')
    } catch (e) {
      addToast('Failed to delete guest', 'error')
    }
  }

  const generateWA = async (guestId) => {
    try {
      const res = await api.guests.getWhatsappLink(eventId, guestId)
      window.open(res.link, '_blank')
    } catch (e) {
      addToast('Failed to generate WA link', 'error')
    }
  }

  return (
    <div className="space-y-8 text-left">
      <GsapReveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 m-0">
              Event <span className="gold-gradient-text">Guests</span>
            </h1>
            <p className="text-stone-500 dark:text-zinc-400 text-sm mt-1">
              Manage attendees, RSVPs, and generate digital access passes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/invitations" className="px-4 py-2 border border-stone-300 dark:border-zinc-700 rounded text-sm hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors text-stone-700 dark:text-zinc-300">
               Back to Events
            </Link>
            <GoldButton variant="glass" onClick={() => openModal('importGuests', { eventId })}>
              <Upload className="w-4 h-4 mr-2 inline" /> Import
            </GoldButton>
            <GoldButton onClick={() => openModal('guestForm', { eventId })}>
              <Plus className="w-4 h-4 mr-2 inline" /> Add Guest
            </GoldButton>
          </div>
        </div>
      </GsapReveal>

      {/* Filters & Search */}
      <GsapReveal delay={0.2} y={20}>
        <GlassCard className="flex flex-col md:flex-row gap-4 justify-between items-center p-4">
          <div className="relative w-full md:w-1/3">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search guests by name or email..."
              className="w-full pl-9 pr-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors text-sm"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-3 flex-wrap">
            <select 
              className="px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 text-sm"
              value={filter.attendance_status}
              onChange={(e) => setFilter({ ...filter, attendance_status: e.target.value })}
            >
              <option value="">All RSVP</option>
              <option value="attending">Attending</option>
              <option value="not attending">Not Attending</option>
              <option value="pending">Pending</option>
            </select>
            <select 
              className="px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 text-sm"
              value={filter.vip_status}
              onChange={(e) => setFilter({ ...filter, vip_status: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="1">VIP Only</option>
              <option value="0">Regular</option>
            </select>
          </div>
        </GlassCard>
      </GsapReveal>

      {/* Guest Table */}
      <GsapReveal delay={0.3} y={30}>
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-zinc-800 bg-stone-100/50 dark:bg-zinc-900/50 text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-zinc-400">
                  <th className="py-3.5 px-5">Guest Name</th>
                  <th className="py-3.5 px-5">Contact</th>
                  <th className="py-3.5 px-5">Category / Seat</th>
                  <th className="py-3.5 px-5">RSVP Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-zinc-800/40 text-xs">
                {loading ? (
                   <tr><td colSpan={5} className="py-10 text-center text-stone-500">Loading guests...</td></tr>
                ) : guests.length === 0 ? (
                   <tr><td colSpan={5} className="py-10 text-center text-stone-500">No guests found.</td></tr>
                ) : (
                  <GsapStagger stagger={0.05}>
                    {guests.map(guest => (
                      <tr key={guest.id} className="hover:bg-gold-500/5 transition-colors group">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-900 dark:text-stone-100">{guest.guest_name}</span>
                            {guest.vip_status && <Badge variant="gold">VIP</Badge>}
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-stone-500 dark:text-zinc-400">
                          <div>{guest.phone || '-'}</div>
                          <div className="text-[10px]">{guest.email || ''}</div>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="text-stone-800 dark:text-stone-300">{guest.category || '-'}</div>
                          <div className="text-[10px] text-stone-400">Seat: {guest.seat_number || '-'}</div>
                        </td>
                        <td className="py-3.5 px-5">
                          <Badge variant={guest.attendance_status === 'attending' ? 'success' : guest.attendance_status === 'not attending' ? 'error' : 'warning'}>
                            {guest.attendance_status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => generateWA(guest.id)}
                              title="Send WhatsApp Invitation"
                              className="p-1.5 border border-emerald-500/30 hover:border-emerald-500/80 rounded text-emerald-500 transition-all cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => openModal('guestForm', { eventId, guest })}
                              title="Edit Guest"
                              className="p-1.5 border border-stone-200 dark:border-zinc-700 hover:border-gold-500/40 rounded text-stone-600 dark:text-zinc-400 hover:text-gold-500 transition-all cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(guest.id, guest.guest_name)}
                              title="Delete Guest"
                              className="p-1.5 rounded text-stone-400 hover:text-rose-500 dark:text-zinc-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </GsapStagger>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {!loading && pagination.last_page > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-stone-200 dark:border-zinc-800/80 text-xs">
              <div className="text-stone-500 dark:text-zinc-400">
                Showing page {pagination.current_page} of {pagination.last_page} ({pagination.total} total guests)
              </div>
              <div className="flex gap-2">
                <button 
                  disabled={pagination.current_page === 1}
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  className="p-1.5 rounded border border-stone-200 dark:border-zinc-700 disabled:opacity-50 text-stone-600 dark:text-zinc-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  disabled={pagination.current_page === pagination.last_page}
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  className="p-1.5 rounded border border-stone-200 dark:border-zinc-700 disabled:opacity-50 text-stone-600 dark:text-zinc-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      </GsapReveal>
    </div>
  )
}
