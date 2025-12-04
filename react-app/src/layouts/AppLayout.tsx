import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
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
} from '@mui/material'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useColorMode } from '../context/ColorModeContext'
import { navItems } from '../data/navigation'

const drawerWidth = 260

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleColorMode, mode } = useColorMode()

  const handleNavigate = (path: string) => {
    navigate(path)
    setMobileOpen(false)
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
                <ListItemButton onClick={() => handleNavigate(item.path)}>
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
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                color="primary"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500 + Number(location.pathname === item.path) * 100,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
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
