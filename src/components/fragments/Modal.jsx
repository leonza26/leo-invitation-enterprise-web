import React, { useState } from 'react'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { X, Calendar, MapPin, Link2 } from 'lucide-react'
import { GoldButton } from '../elements/GoldButton'
import { useEventStore } from '../../stores/eventStore'
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
            {modalType === 'createInvitation' ? 'Create Luxury Event' : 'Modal Dialog'}
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
        ) : (
          <div className="mt-4 text-stone-600 dark:text-zinc-300 text-sm">
            {metadata.content || 'No details available.'}
          </div>
        )}
      </div>
    </div>
  )
}
