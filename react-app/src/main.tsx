import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ColorModeProvider } from './context/ColorModeContext.tsx'
import { GestureProvider } from './context/GestureContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeProvider>
      <GestureProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GestureProvider>
    </ColorModeProvider>
  </StrictMode>,
)
