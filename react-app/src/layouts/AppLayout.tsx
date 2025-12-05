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
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useColorMode } from '../context/ColorModeContext'
import { useGesture } from '../context/GestureContext'
import { GestureController } from '../components/GestureController'
import { navItems } from '../data/navigation'

const drawerWidth = 260

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const { toggleColorMode, mode } = useColorMode()
  const { gestureEnabled, setGestureEnabled } = useGesture()

  const handleNavigate = (path: string) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleSwipeLeft = () => {
    // Left swipe (hand moves left) -> Go to Next Tab (conceptually pushing content left to reveal next)
    // OR: Left swipe -> Go Back?
    // Convention: Swipe Left (finger moves right to left) -> Go to Next Page.
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    if (currentIndex === -1) return 
    const nextIndex = (currentIndex + 1) % navItems.length
    navigate(navItems[nextIndex].path)
  }

  const handleSwipeRight = () => {
    // Right swipe (hand moves right) -> Go to Previous Tab
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    if (currentIndex === -1) return
    const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length
    navigate(navItems[prevIndex].path)
  }

  const drawer = (
    <Box sx={{ textAlign: 'center', height: '100%' }}>
      <Stack spacing={0} sx={{ height: '100%' }}>
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" component="div">
            Yash Patil
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
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => handleNavigate('/')}
          >
            Yash Patil
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
