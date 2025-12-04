import type { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light Mode
          primary: {
            main: '#2563eb', // Modern vibrant blue
            light: '#60a5fa',
            dark: '#1e40af',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#475569', // Slate gray
            light: '#94a3b8',
            dark: '#1e293b',
            contrastText: '#ffffff',
          },
          background: {
            default: '#f8fafc', // Very light slate gray
            paper: '#ffffff',
          },
          text: {
            primary: '#1e293b', // Dark slate
            secondary: '#64748b',
          },
        }
      : {
          // Dark Mode
          primary: {
            main: '#60a5fa', // Lighter blue for dark mode
            light: '#93c5fd',
            dark: '#2563eb',
            contrastText: '#0f172a',
          },
          secondary: {
            main: '#94a3b8', // Light slate
            light: '#cbd5e1',
            dark: '#64748b',
            contrastText: '#0f172a',
          },
          background: {
            default: '#0f172a', // Slate 900
            paper: '#1e293b',   // Slate 800
          },
          text: {
            primary: '#f1f5f9', // Slate 100
            secondary: '#cbd5e1', // Slate 300
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontWeight: 600, letterSpacing: '-0.025em' },
    h4: { fontWeight: 600, letterSpacing: '-0.025em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: mode === 'light' 
              ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              : '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: mode === 'light'
            ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
            : 'none', // Flat style for dark mode often looks better, or keep subtle shadow
        },
        elevation2: {
            boxShadow: mode === 'light'
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        },
        elevation8: {
             boxShadow: mode === 'light'
             ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
             : '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
        },
      },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: 500,
            }
        }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
        }
      }
    }
  },
})
