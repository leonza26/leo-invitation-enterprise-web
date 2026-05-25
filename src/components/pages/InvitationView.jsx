import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import api from '../../services/api'
import { GsapReveal, GsapStagger } from '../../animations/GsapReveal'
import { GlassCard } from '../elements/GlassCard'
import { GoldButton } from '../elements/GoldButton'
import { Badge } from '../elements/Badge'
import { Calendar, MapPin, Sparkles, Check, X, MessageSquare, Send } from 'lucide-react'

export const InvitationView = () => {
  const { slug, qrCode } = useParams()
  const [data, setData] = useState({ event: null, guest: null })
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [rsvpLoading, setRsvpLoading] = useState(false)
  
  const [wishForm, setWishForm] = useState({ guest_name: '', message: '' })
  const [wishLoading, setWishLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [slug, qrCode])

  const fetchData = async () => {
    try {
      const res = await api.public.getGuest(slug, qrCode)
      setData(res)
      setWishForm(prev => ({ ...prev, guest_name: res.guest.guest_name }))
      
      const wishesRes = await api.public.getGuestbook(slug)
      setWishes(wishesRes)
    } catch (e) {
      setError('Invitation not found or invalid access code.')
    } finally {
      setLoading(false)
    }
  }

  const handleRsvp = async (status) => {
    setRsvpLoading(true)
    try {
      await api.public.updateRsvp(slug, qrCode, status)
      setData(prev => ({ ...prev, guest: { ...prev.guest, attendance_status: status } }))
    } catch (e) {
      alert('Failed to update RSVP')
    } finally {
      setRsvpLoading(false)
    }
  }

  const submitWish = async (e) => {
    e.preventDefault()
    setWishLoading(true)
    try {
      await api.public.submitGuestbook(slug, wishForm)
      setWishForm({ ...wishForm, message: '' })
      const wishesRes = await api.public.getGuestbook(slug)
      setWishes(wishesRes)
    } catch (e) {
      alert('Failed to send wish')
    } finally {
      setWishLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gold-500">Loading Invitation...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-rose-500">{error}</div>

  const { event, guest } = data

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-950 py-12 px-4 flex flex-col items-center">
      
      {/* Event Header */}
      <div className="max-w-2xl w-full text-center space-y-6 mb-12">
        <GsapReveal delay={0.1}>
          <div className="text-gold-600 dark:text-gold-400 font-serif italic text-lg mb-2">You are cordially invited to</div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">{event.event_name}</h1>
          <p className="text-sm tracking-[0.3em] uppercase text-stone-500 dark:text-zinc-400">
            {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBD'}
          </p>
        </GsapReveal>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Col: QR Code & RSVP */}
        <div className="space-y-8">
          <GsapReveal delay={0.3} y={30}>
            <GlassCard className="text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <Badge variant="gold" className="mb-4 inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> VIP Access Pass
              </Badge>
              <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-gold-100 mb-1">
                Hello, {guest.guest_name}
              </h3>
              <p className="text-sm text-stone-500 dark:text-zinc-400 mb-6">Present this QR Code upon arrival.</p>
              
              <div className="inline-block p-4 bg-white rounded-xl shadow-lg transform transition-transform group-hover:scale-105 duration-500">
                <QRCodeSVG value={guest.qr_code} size={180} fgColor="#1c1917" />
              </div>

              <div className="mt-6 flex justify-center divide-x divide-stone-200 dark:divide-zinc-800 text-sm">
                <div className="px-4">
                  <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">Seat</div>
                  <div className="font-semibold text-stone-800 dark:text-stone-200">{guest.seat_number || 'TBD'}</div>
                </div>
                <div className="px-4">
                  <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">Category</div>
                  <div className="font-semibold text-stone-800 dark:text-stone-200">{guest.category || 'General'}</div>
                </div>
              </div>
            </GlassCard>
          </GsapReveal>

          <GsapReveal delay={0.4} y={30}>
            <GlassCard>
              <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 text-center">RSVP Confirmation</h4>
              
              <div className="flex flex-col gap-3">
                <button 
                  disabled={rsvpLoading || guest.attendance_status === 'attending'}
                  onClick={() => handleRsvp('attending')}
                  className={`py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${guest.attendance_status === 'attending' ? 'bg-emerald-500 text-white font-bold' : 'border border-stone-200 dark:border-zinc-800 text-stone-600 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-500'}`}
                >
                  <Check className="w-4 h-4" /> Yes, I will attend
                </button>
                <button 
                  disabled={rsvpLoading || guest.attendance_status === 'not attending'}
                  onClick={() => handleRsvp('not attending')}
                  className={`py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${guest.attendance_status === 'not attending' ? 'bg-rose-500 text-white font-bold' : 'border border-stone-200 dark:border-zinc-800 text-stone-600 dark:text-zinc-300 hover:border-rose-500 hover:text-rose-500'}`}
                >
                  <X className="w-4 h-4" /> Regretfully, I cannot attend
                </button>
              </div>
            </GlassCard>
          </GsapReveal>
        </div>

        {/* Right Col: Guest Book */}
        <div className="space-y-8">
          <GsapReveal delay={0.5} y={30}>
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-gold-500" />
                <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">Guest Book</h4>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4 pr-2 custom-scrollbar mb-6">
                <GsapStagger stagger={0.1}>
                  {wishes.map(wish => (
                    <div key={wish.id} className="p-4 rounded-lg bg-white/5 border border-stone-100 dark:border-zinc-800/60 shadow-sm">
                      <div className="font-semibold text-stone-800 dark:text-gold-200 text-sm mb-1">{wish.guest_name}</div>
                      <p className="text-stone-600 dark:text-zinc-400 text-sm italic">"{wish.message}"</p>
                    </div>
                  ))}
                  {wishes.length === 0 && (
                    <div className="text-center text-sm text-stone-500 italic py-10">Be the first to send your warm wishes!</div>
                  )}
                </GsapStagger>
              </div>

              <form onSubmit={submitWish} className="mt-auto border-t border-stone-200 dark:border-zinc-800 pt-4 space-y-3">
                <input 
                  type="text" 
                  disabled 
                  value={wishForm.guest_name} 
                  className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-black/5 dark:bg-black/20 text-stone-500 focus:outline-none text-sm" 
                />
                <textarea 
                  required
                  rows={3}
                  placeholder="Write your beautiful wish here..."
                  className="w-full px-3 py-2 rounded border border-stone-200 dark:border-zinc-800 bg-white/5 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                  value={wishForm.message}
                  onChange={e => setWishForm({ ...wishForm, message: e.target.value })}
                />
                <GoldButton type="submit" disabled={wishLoading} className="w-full justify-center">
                  <Send className="w-4 h-4 mr-2 inline" /> Send Wish
                </GoldButton>
              </form>
            </GlassCard>
          </GsapReveal>
        </div>

      </div>
    </div>
  )
}
