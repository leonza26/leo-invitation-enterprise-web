import React, { useState } from 'react'
import { useModalStore } from '../../stores/modalStore'
import { useToastStore } from '../../stores/toastStore'
import { X, Calendar, MapPin, Link2 } from 'lucide-react'
import { GoldButton } from '../elements/GoldButton'

export const ModalContainer = () => {
  const { isOpen, modalType, metadata, closeModal } = useModalStore()
  const { addToast } = useToastStore()
  const [formData, setFormData] = useState({
    title: '',
    groom: '',
    bride: '',
    date: '',
    location: '',
    slug: ''
  })

  if (!isOpen) return null

  const handleCreateInvitation = (e) => {
    e.preventDefault()
    addToast(`Invitation "${formData.title}" created successfully!`, 'success')
    closeModal()
    // Reset
    setFormData({ title: '', groom: '', bride: '', date: '', location: '', slug: '' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-light dark:glass-panel-dark border border-gold-500/30 shadow-2xl p-6 overflow-hidden animate-zoom-in">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-zinc-800">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-gold-100">
            {modalType === 'createInvitation' ? 'Create Luxury Invitation' : 'Modal Dialog'}
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
          <form onSubmit={handleCreateInvitation} className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Invitation Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. The Wedding of Aurelius & Selene"
                className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Groom Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Aurelius"
                  className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                  value={formData.groom}
                  onChange={(e) => setFormData({ ...formData, groom: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Bride Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Selene"
                  className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                  value={formData.bride}
                  onChange={(e) => setFormData({ ...formData, bride: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Wedding Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    required
                    className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">URL Slug</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="aurelius-selene"
                    className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-gold-300 uppercase tracking-wider mb-1">Wedding Venue Location</label>
              <input 
                type="text" 
                required
                placeholder="The Glasshouse, Jakarta"
                className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-zinc-800">
              <button 
                type="button" 
                onClick={closeModal}
                className="px-4 py-2 border border-stone-300 dark:border-zinc-700 text-stone-600 dark:text-zinc-300 rounded text-sm hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <GoldButton type="submit">
                Create & Publish
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
