import React, { useState } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useTheme } from '../../hooks/useTheme'
import { useNotificationStore } from '../../stores/notificationStore'
import { NotificationCenter } from './NotificationCenter'
import { Sun, Moon, Bell, Shield, User } from 'lucide-react'

export const Navbar = () => {
  const { user, setRole } = useAuthStore()
  const { theme, toggleTheme } = useTheme()
  const { notifications } = useNotificationStore()
  const [notifOpen, setNotifOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length
  const roleName = user?.role?.name || user?.role || 'guest'

  return (
    <header className="sticky top-0 z-40 w-full glass-panel-light dark:glass-panel-dark border-b border-stone-200/60 dark:border-zinc-800/60 px-6 py-3 flex items-center justify-between">
      {/* Brand Label */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-serif font-black tracking-wide gold-gradient-text m-0">
          LEO
        </h2>
        <span className="hidden sm:inline-block h-4 w-px bg-stone-300 dark:bg-zinc-700"></span>
        <span className="hidden sm:inline-block text-xs font-semibold tracking-widest uppercase text-stone-400 dark:text-zinc-500">
          Invitation Enterprise
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        
        {/* RBAC Role Switcher Dropdown (Simulation) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gold-500/20 bg-gold-500/5 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-stone-500 dark:text-gold-200/70 mr-1 hidden md:inline">Role:</span>
          <select 
            value={roleName}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent focus:outline-none text-gold-600 dark:text-gold-400 font-bold uppercase cursor-pointer"
          >
            <option value="super_admin" className="bg-stone-50 dark:bg-zinc-950 text-stone-800 dark:text-stone-100">Super Admin</option>
            <option value="client" className="bg-stone-50 dark:bg-zinc-950 text-stone-800 dark:text-stone-100">Client</option>
            <option value="operator" className="bg-stone-50 dark:bg-zinc-950 text-stone-800 dark:text-stone-100">Operator</option>
            <option value="guest" className="bg-stone-50 dark:bg-zinc-950 text-stone-800 dark:text-stone-100">Guest</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-900 rounded-lg text-stone-600 dark:text-zinc-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-900 rounded-lg text-stone-600 dark:text-zinc-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-zinc-950 ring-2 ring-stone-50 dark:ring-zinc-950">
                {unreadCount}
              </span>
            )}
          </button>
          
          <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-stone-200 dark:border-zinc-800">
          <div className="h-8 w-8 rounded-full border border-gold-500/30 bg-zinc-800 flex items-center justify-center text-gold-400">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-stone-800 dark:text-stone-100">{user?.name}</div>
            <div className="text-[10px] text-stone-400 dark:text-zinc-500 font-semibold tracking-wider uppercase">{roleName.replace('_', ' ')}</div>
          </div>
        </div>

      </div>
    </header>
  )
}
