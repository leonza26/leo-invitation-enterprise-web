import { useEffect } from 'react'
import { useThemeStore } from '../stores/themeStore'

export const useTheme = () => {
  const { theme, toggleTheme, applyTheme } = useThemeStore()

  useEffect(() => {
    applyTheme()
  }, [theme, applyTheme])

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  }
}
