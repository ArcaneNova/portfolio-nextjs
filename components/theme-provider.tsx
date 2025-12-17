'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Ensure the theme is properly applied on mount
    const theme = localStorage.getItem('theme') || 'dark'
    const html = document.documentElement
    
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [])

  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="theme"
      enableColorScheme={false}
      themes={['dark']}
      forcedTheme="dark"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
