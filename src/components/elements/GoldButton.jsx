import React from 'react'

export const GoldButton = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'relative inline-flex items-center justify-center px-6 py-2.5 rounded font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'
  
  const variants = {
    primary: 'gold-gradient-bg text-zinc-950 hover:brightness-110 shadow-lg hover:shadow-gold-500/20 border border-gold-400',
    secondary: 'border border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500/10 hover:text-white',
    glass: 'glass-panel-light dark:glass-panel-dark text-stone-800 dark:text-gold-200 border border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/5'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
