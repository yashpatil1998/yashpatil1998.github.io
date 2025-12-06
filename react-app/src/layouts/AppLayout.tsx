import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useColorMode } from '../context/ColorModeContext'
import { useGesture } from '../context/GestureContext'
import { GestureController } from '../components/GestureController'
import { navItems } from '../data/navigation'

const drawerWidth = 260

const useTypewriter = (text: string, speed = 100, pauseBetween = 2000) => {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  useEffect(() => {
    let timer: number

    const handleType = () => {
      const currentText = text
      
      if (isDeleting) {
        setDisplayText(prev => prev.substring(0, prev.length - 1))
      } else {
        setDisplayText(prev => currentText.substring(0, prev.length + 1))
      }

      if (!isDeleting && displayText === currentText) {
        timer = setTimeout(() => setIsDeleting(true), pauseBetween)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        timer = setTimeout(handleType, 500)
      } else {
        const typeSpeed = isDeleting ? speed / 2 : speed
        timer = setTimeout(handleType, typeSpeed)
      }
    }

    timer = setTimeout(handleType, speed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, text, speed, pauseBetween])

  return displayText
}

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const { toggleColorMode, mode } = useColorMode()
  const { gestureEnabled, setGestureEnabled } = useGesture()
  
  const typedName = useTypewriter('Yash Patil')

  const handleNavigate = (path: string) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleSwipeLeft = () => {
    // Disable global navigation on the Interact page
    if (location.pathname === '/interact') return

    // Left swipe (hand moves left) -> Go to Next Tab (conceptually pushing content left to reveal next)
    // OR: Left swipe -> Go Back?
    // Convention: Swipe Left (finger moves right to left) -> Go to Next Page.
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    if (currentIndex === -1) return 
    
    // Skip Interact page in gesture cycle
    let nextIndex = (currentIndex + 1) % navItems.length
    if (navItems[nextIndex].path === '/interact') {
        nextIndex = (nextIndex + 1) % navItems.length
    }
    
    navigate(navItems[nextIndex].path)
  }

  const handleSwipeRight = () => {
    // Disable global navigation on the Interact page
    if (location.pathname === '/interact') return

    // Right swipe (hand moves right) -> Go to Previous Tab
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    if (currentIndex === -1) return
    
    // Skip Interact page in gesture cycle
    let prevIndex = (currentIndex - 1 + navItems.length) % navItems.length
    if (navItems[prevIndex].path === '/interact') {
        prevIndex = (prevIndex - 1 + navItems.length) % navItems.length
    }

    navigate(navItems[prevIndex].path)
  }

  const drawer = (
    <Box sx={{ textAlign: 'center', height: '100%' }}>
      <Stack spacing={0} sx={{ height: '100%' }}>
        <Box sx={{ py: 3 }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontFamily: 'monospace', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <span style={{ color: theme.palette.secondary.main, marginRight: '4px' }}>&gt;</span>
            {typedName}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '10px',
                height: '1.2em',
                backgroundColor: theme.palette.text.primary,
                ml: 0.5,
                animation: 'blink 1s step-end infinite',
                '@keyframes blink': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0 },
                },
              }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Technology Enthusiast
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ flexGrow: 1 }}>
          <List>
            {navItems.map((item) => (
              <ListItem disablePadding key={item.path}>
                <ListItemButton 
                  onClick={() => handleNavigate(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <GestureController 
        enabled={gestureEnabled} 
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
      
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
            aria-label="open navigation"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontFamily: 'monospace', // Code-like font
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => handleNavigate('/')}
          >
            <span style={{ color: theme.palette.secondary.main, marginRight: '4px' }}>&gt;</span>
            {typedName}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '10px',
                height: '1.2em',
                backgroundColor: theme.palette.text.primary,
                ml: 0.5,
                animation: 'blink 1s step-end infinite',
                '@keyframes blink': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0 },
                },
              }}
            />
          </Typography>
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&:hover': {
                      bgcolor: isActive 
                        ? alpha(theme.palette.primary.main, 0.2) 
                        : alpha(theme.palette.text.secondary, 0.05)
                    }
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Stack>
          
          {location.pathname !== '/interact' && (
            <Tooltip title={gestureEnabled ? "Disable Gestures" : "Enable Gestures"}>
              <IconButton 
                  onClick={() => setGestureEnabled(!gestureEnabled)} 
                  color={gestureEnabled ? "primary" : "inherit"}
                  aria-label="toggle gestures"
                  sx={{ mr: 1 }}
              >
                  {gestureEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </Tooltip>
          )}

          <IconButton onClick={toggleColorMode} color="inherit" aria-label="toggle dark mode">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="site navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default AppLayout
