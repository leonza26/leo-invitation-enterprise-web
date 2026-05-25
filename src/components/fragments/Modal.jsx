import React, { useState } from 'react'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { X, Calendar, MapPin, Link2 } from 'lucide-react'
import { GoldButton } from '../elements/GoldButton'
import { useEventStore } from '../../stores/eventStore'
import { useGuestStore } from '../../stores/guestStore'
export const ModalContainer = () => {
  const { isOpen, modalType, metadata, closeModal } = useModalStore()
  const { addToast } = useToastStore()
  const { createEvent } = useEventStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    event_name: '',
    slug: '',
    event_type: 'wedding',
    theme: 'luxury-gold',
    venue: '',
    event_date: '',
    description: '',
    package: 'basic'
  })

  if (!isOpen) return null

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        await createEvent(formData)
        addToast(`Event "${formData.event_name}" created successfully!`, 'success')
        closeModal()
        setFormData({ event_name: '', slug: '', event_type: 'wedding', theme: 'luxury-gold', venue: '', event_date: '', description: '', package: 'basic' })
    } catch (err) {
        addToast(err.message || 'Failed to create event', 'error')
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-light dark:glass-panel-dark border border-gold-500/30 shadow-2xl p-6 overflow-hidden animate-zoom-in max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-zinc-800">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-gold-100">
            {modalType === 'createInvitation' ? 'Create Luxury Event' : 
             modalType === 'guestForm' ? (metadata?.guest ? 'Edit Guest' : 'Add New Guest') :
             modalType === 'importGuests' ? 'Import Guests' : 'Modal Dialog'}
          </h3>
          <button 
            onClick={closeModal}
            className="text-stone-400 hover:text-stone-600 dark:text-zinc-500 dark:hover:text-gold-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {modalType === 'createInvitation' ? (
          <form onSubmit={handleCreateEvent} className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Event Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. The Wedding of Aurelius & Selene"
                className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                value={formData.event_name}
                onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Event Type</label>
                <select 
                  className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="birthday">Birthday</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Package</label>
                <select 
                  className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Event Date</label>
                <div className="relative">
                  <input 
                    type="datetime-local" 
                    required
                    className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">URL Slug</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="aurelius-selene"
                    className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Venue Location</label>
              <input 
                type="text" 
                required
                placeholder="The Glasshouse, Jakarta"
                className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-zinc-800">
              <button 
                type="button" 
                onClick={closeModal}
                disabled={loading}
                className="px-4 py-2 border border-stone-300 dark:border-zinc-700 text-stone-600 dark:text-zinc-300 rounded text-sm hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <GoldButton type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create & Publish'}
              </GoldButton>
            </div>
          </form>
        ) : modalType === 'guestForm' ? (
          <GuestFormHandler metadata={metadata} closeModal={closeModal} />
        ) : modalType === 'importGuests' ? (
          <ImportGuestsHandler metadata={metadata} closeModal={closeModal} />
        ) : (
          <div className="mt-4 text-stone-600 dark:text-zinc-300 text-sm">
            {metadata?.content || 'No details available.'}
          </div>
        )}
      </div>
    </div>
  )
}

const GuestFormHandler = ({ metadata, closeModal }) => {
  const { createGuest, updateGuest } = useGuestStore()
  const { addToast } = useToastStore()
  const [loading, setLoading] = useState(false)
  const isEditing = !!metadata?.guest

  const [formData, setFormData] = useState(metadata?.guest || {
    guest_name: '',
    email: '',
    phone: '',
    category: '',
    seat_number: '',
    vip_status: false,
    attendance_status: 'pending'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEditing) {
        await updateGuest(metadata.eventId, metadata.guest.id, formData)
        addToast('Guest updated successfully', 'success')
      } else {
        await createGuest(metadata.eventId, formData)
        addToast('Guest added successfully', 'success')
      }
      closeModal()
    } catch (e) {
      addToast(e.message || 'Error saving guest', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Guest Name</label>
        <input type="text" required className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500" value={formData.guest_name} onChange={e => setFormData({...formData, guest_name: e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Email (optional)</label>
          <input type="email" className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Phone</label>
          <input type="text" className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Category</label>
          <input type="text" placeholder="e.g. Family" className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Seat</label>
          <input type="text" className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500" value={formData.seat_number} onChange={e => setFormData({...formData, seat_number: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">VIP Status</label>
          <select className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500" value={formData.vip_status} onChange={e => setFormData({...formData, vip_status: e.target.value === 'true'})}>
            <option value="false">Regular</option>
            <option value="true">VIP</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-zinc-800">
        <button type="button" onClick={closeModal} className="px-4 py-2 border border-stone-300 dark:border-zinc-700 text-stone-600 dark:text-zinc-300 rounded text-sm hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
        <GoldButton type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Guest'}</GoldButton>
      </div>
    </form>
  )
}

const ImportGuestsHandler = ({ metadata, closeModal }) => {
  const { importGuests } = useGuestStore()
  const { addToast } = useToastStore()
  const [loading, setLoading] = useState(false)
  const [textData, setTextData] = useState('')

  const handleImport = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const rows = textData.split('\n').map(row => row.trim()).filter(row => row)
      const guests = rows.map(row => {
        const parts = row.split(',')
        return {
          guest_name: parts[0]?.trim(),
          phone: parts[1]?.trim() || null,
          email: parts[2]?.trim() || null,
          category: parts[3]?.trim() || null,
          vip_status: parts[4]?.trim() === 'true' || parts[4]?.trim() === '1'
        }
      }).filter(g => g.guest_name)

      if (guests.length === 0) {
        addToast('No valid guests found to import.', 'error')
        setLoading(false)
        return
      }

      await importGuests(metadata.eventId, guests)
      addToast(`Successfully imported ${guests.length} guests`, 'success')
      closeModal()
    } catch (e) {
      addToast('Error importing guests', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleImport} className="space-y-4 mt-4">
      <div>
        <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-2">Paste CSV Data (Name, Phone, Email, Category, VIP)</label>
        <textarea 
          required 
          rows={6}
          placeholder="John Doe, 628123456, john@example.com, Family, true&#10;Jane Smith, 628987654, jane@example.com, Friend, false"
          className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 font-mono text-xs whitespace-pre" 
          value={textData} 
          onChange={e => setTextData(e.target.value)} 
        />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-zinc-800">
        <button type="button" onClick={closeModal} className="px-4 py-2 border border-stone-300 dark:border-zinc-700 text-stone-600 dark:text-zinc-300 rounded text-sm hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
        <GoldButton type="submit" disabled={loading}>{loading ? 'Importing...' : 'Run Import'}</GoldButton>
      </div>
    </form>
  )
}
