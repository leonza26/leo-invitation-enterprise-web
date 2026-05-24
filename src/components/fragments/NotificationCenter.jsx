import React from 'react'
import { useNotificationStore } from '../../stores/notificationStore'
import { Bell, Check, Trash2, MailOpen } from 'lucide-react'

export const NotificationCenter = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore()

  if (!isOpen) return null

  return (
    <div className="absolute right-0 mt-3 w-80 rounded-xl glass-panel-light dark:glass-panel-dark border border-gold-500/20 shadow-2xl overflow-hidden z-50 animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gold-500" />
          <span className="font-serif font-bold text-stone-800 dark:text-gold-200">Notifications</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={markAllAsRead} 
            title="Mark all as read"
            className="p-1 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded text-stone-500 dark:text-zinc-400 hover:text-gold-500 transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
          <button 
            onClick={clearNotifications}
            title="Clear all"
            className="p-1 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded text-stone-500 dark:text-zinc-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 dark:text-zinc-500">
            No notifications at this time.
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-zinc-800/50">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-3.5 transition-colors flex gap-2.5 items-start ${n.read ? 'opacity-60 bg-transparent' : 'bg-gold-500/5 dark:bg-gold-500/3'}`}
              >
                <div className="mt-1">
                  {!n.read ? (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                    </span>
                  ) : (
                    <MailOpen className="w-3 h-3 text-stone-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-700 dark:text-zinc-200 font-medium leading-relaxed break-words">{n.message}</p>
                  <span className="text-[10px] text-stone-400 dark:text-zinc-500 block mt-1">{n.time}</span>
                </div>
                {!n.read && (
                  <button 
                    onClick={() => markAsRead(n.id)}
                    className="p-1 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded text-stone-400 hover:text-gold-500 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
