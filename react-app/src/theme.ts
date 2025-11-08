import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005b96',
    },
    secondary: {
      main: '#ff7043',
    },
    background: {
      default: '#f3f6fb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightMedium: 600,
  },
  shape: {
    borderRadius: 10,
  },
})

export default theme

