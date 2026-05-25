import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { 
  LayoutDashboard, 
  Mail, 
  ShieldAlert, 
  Menu, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Users,
  Settings
} from 'lucide-react'

export const Sidebar = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  // Side items configuration with RBAC rules
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />,
      allowedRoles: ['super_admin', 'client', 'operator', 'guest']
    },
    {
      title: 'Invitations',
      path: '/invitations',
      icon: <Mail className="w-5 h-5" />,
      allowedRoles: ['super_admin', 'client', 'operator']
    },
    {
      title: 'RBAC Simulation',
      path: '/rbac',
      icon: <ShieldAlert className="w-5 h-5" />,
      allowedRoles: ['super_admin', 'client', 'operator', 'guest']
    },
    {
      title: 'Users & Staff',
      path: '/users',
      icon: <Users className="w-5 h-5" />,
      allowedRoles: ['super_admin']
    },
    {
      title: 'System Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />,
      allowedRoles: ['super_admin']
    }
  ]

  // Filter items based on current simulation role
  const filteredItems = menuItems.filter(item => item.allowedRoles.includes(user?.role?.name || user?.role))

  return (
    <aside 
      className={`
        relative flex flex-col h-screen border-r border-stone-200/60 dark:border-zinc-800/60 
        glass-panel-light dark:glass-panel-dark transition-all duration-500
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Brand area */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-stone-200/40 dark:border-zinc-800/40">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gold-gradient-bg shadow-md">
          <Sparkles className="w-5 h-5 text-zinc-950" />
        </div>
        {!collapsed && (
          <div className="flex flex-col text-left">
            <span className="font-serif font-black tracking-wide text-stone-900 dark:text-gold-200">LEO SAAS</span>
            <span className="text-[9px] font-bold tracking-widest text-stone-400 dark:text-zinc-500 uppercase">Enterprise</span>
          </div>
        )}
      </div>

      {/* Nav list */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-4 px-3 py-3 rounded-lg font-sans text-sm font-semibold tracking-wide transition-all duration-300
                ${isActive 
                  ? 'gold-gradient-bg text-zinc-950 font-bold shadow-lg shadow-gold-500/10' 
                  : 'text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800/50 hover:text-gold-500 dark:hover:text-gold-400'}
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? item.title : ''}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle Button */}
      <div className="p-4 border-t border-stone-200/40 dark:border-zinc-800/40 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800/50 border border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400 cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  )
}
