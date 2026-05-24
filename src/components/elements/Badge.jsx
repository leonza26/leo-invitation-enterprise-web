import React from 'react'

export const Badge = ({ children, variant = 'info', className = '' }) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border'
  
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/15',
    error: 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:bg-rose-500/15',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/15',
    info: 'bg-sky-500/10 text-sky-500 border-sky-500/20 dark:bg-sky-500/15',
    gold: 'bg-gold-500/10 text-gold-500 border-gold-500/30 dark:bg-gold-500/15'
  }

  return (
    <span className={`${base} ${variants[variant] || variants.info} ${className}`}>
      {children}
    </span>
  )
}
