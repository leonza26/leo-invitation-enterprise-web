import { create } from 'zustand'

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem('theme') || 'dark', // default to elegant dark
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', nextTheme)
    set({ theme: nextTheme })
    get().applyTheme()
  },
  applyTheme: () => {
    const root = window.document.documentElement
    const theme = get().theme
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }
}))
