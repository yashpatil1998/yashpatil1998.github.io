import { ThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material'
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { getTheme } from '../theme'

type ColorModeContextType = {
  toggleColorMode: () => void
  mode: PaletteMode
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
})

export const useColorMode = () => useContext(ColorModeContext)

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('themeMode') as PaletteMode
    if (savedMode) return savedMode
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
      mode,
    }),
    [mode]
  )

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

