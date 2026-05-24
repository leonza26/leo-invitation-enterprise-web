import React from 'react'

export const GlassCard = ({ children, className = '', hoverGlow = true, borderGold = false, ...props }) => {
  return (
    <div
      className={`
        rounded-xl p-6 transition-all duration-500
        glass-panel-light dark:glass-panel-dark
        ${borderGold ? 'border border-gold-500/35' : 'border border-stone-200/50 dark:border-zinc-800/60'}
        ${hoverGlow ? 'gold-glow-hover hover:border-gold-500/40' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
