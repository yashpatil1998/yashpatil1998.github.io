import { DndContext, type DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import ExploreIcon from '@mui/icons-material/Explore'
import ExploreOffIcon from '@mui/icons-material/ExploreOff'
import { Box, Button, Chip, Divider, IconButton, List, ListItem, Stack, Typography, alpha, useTheme, useMediaQuery } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { DraggableCard } from '../components/DraggableCard'
import { GestureController } from '../components/GestureController'
import { education } from '../data/education'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { publications } from '../data/publications'

type Position = {
  x: number
  y: number
}

const CardHeader = ({ title, isExpanded, onToggle }: { title: string, isExpanded: boolean, onToggle: () => void }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
    <Typography variant="h6" sx={{ m: 0 }}>{title}</Typography>
    <IconButton 
      size="small" 
      onClick={(e) => { 
        e.stopPropagation()
        onToggle()
      }} 
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={isExpanded ? "Collapse" : "Expand"}
    >
      {isExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </IconButton>
  </Box>
)

const InteractPage = () => {
  const theme = useTheme()
  const [positions, setPositions] = useState<Record<string, Position>>(() => {
    const isMobile = window.innerWidth < 900
    if (isMobile) {
        return {
            about: { x: 20, y: 20 },
            skills: { x: 20, y: 400 },
            experience: { x: 20, y: 800 },
            projects: { x: 20, y: 1200 },
            education: { x: 20, y: 1600 },
            publications: { x: 20, y: 2000 },
            contact: { x: 20, y: 2400 },
        }
    }
    return {
        about: { x: 50, y: 20 },
        skills: { x: 400, y: 20 },
        experience: { x: 50, y: 350 },
        projects: { x: 400, y: 350 },
        education: { x: 750, y: 20 },
        publications: { x: 750, y: 350 },
        contact: { x: 50, y: 680 },
    }
  })

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [gestureEnabled, setGestureEnabled] = useState(false)
  const [gravityEnabled, setGravityEnabled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(null)
  const velocitiesRef = useRef<Record<string, { vx: number; vy: number }>>({})
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Initialize velocities
  useEffect(() => {
    const initialVelocities: Record<string, { vx: number; vy: number }> = {}
    Object.keys(positions).forEach(key => {
        initialVelocities[key] = { vx: 0, vy: 0 }
    })
    velocitiesRef.current = initialVelocities
  }, [])

  // Gravity Physics Loop
  useEffect(() => {
    if (!gravityEnabled || !containerRef.current) {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current)
        }
        return
    }

    let lastTime = performance.now()
    const gravity = { x: 0, y: 0 }
    const friction = 0.98
    const bounce = 0.7

    const handleOrientation = (event: DeviceOrientationEvent) => {
        const { beta, gamma } = event // beta: front-back, gamma: left-right
        if (beta !== null && gamma !== null) {
            // Normalize tilt to gravity vector
            // Gamma (left/right) affects X gravity. 
            // Holding phone upright (portrait): Gamma is tilt L/R
            gravity.x = Math.min(Math.max(gamma / 45, -1), 1) * 0.5
            
            // Beta (front/back) affects Y gravity.
            // Holding phone upright (portrait): Beta is ~90 degrees. 
            // Tiling forward (away) decreases beta towards 0. Tilting back (towards) increases > 90.
            // We want "neutral" to be roughly 45-60 degrees (comfortable viewing angle).
            const neutralBeta = 45
            gravity.y = Math.min(Math.max((beta - neutralBeta) / 45, -1), 1) * 0.5
        }
    }

    // For desktop testing: Mouse movement influences gravity slightly
    const handleMouseMove = (event: MouseEvent) => {
        if (!isMobile) {
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            gravity.x = (event.clientX - centerX) / centerX * 0.2
            gravity.y = (event.clientY - centerY) / centerY * 0.2
        }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove)

    // Debug overlay for mobile testing (remove in production)
    /*
    const debugDiv = document.createElement('div')
    debugDiv.style.position = 'fixed'
    debugDiv.style.top = '10px'
    debugDiv.style.left = '10px'
    debugDiv.style.zIndex = '9999'
    debugDiv.style.background = 'rgba(0,0,0,0.7)'
    debugDiv.style.color = 'white'
    debugDiv.style.padding = '5px'
    debugDiv.id = 'gravity-debug'
    if (gravityEnabled && isMobile && !document.getElementById('gravity-debug')) {
        document.body.appendChild(debugDiv)
    }
    */

    const animate = (time: number) => {
        const deltaTime = time - lastTime
        lastTime = time

        // Only update if we have significant time step (cap at 60fps approx)
        if (deltaTime > 16) {
            // const debugEl = document.getElementById('gravity-debug')
            // if (debugEl) debugEl.innerText = `X: ${gravity.x.toFixed(3)} Y: ${gravity.y.toFixed(3)}`

            setPositions(prevPositions => {
                const nextPositions = { ...prevPositions }
                const containerWidth = containerRef.current?.clientWidth || window.innerWidth
                const containerHeight = containerRef.current?.clientHeight || window.innerHeight
                
                let hasMovement = false

                Object.keys(nextPositions).forEach(key => {
                    if (!velocitiesRef.current[key]) velocitiesRef.current[key] = { vx: 0, vy: 0 }
                    
                    const pos = nextPositions[key]
                    const vel = velocitiesRef.current[key]

                    // Apply gravity to velocity
                    vel.vx += gravity.x
                    vel.vy += gravity.y

                    // Apply friction
                    vel.vx *= friction
                    vel.vy *= friction

                    // Update position
                    let nextX = pos.x + vel.vx
                    let nextY = pos.y + vel.vy

                    // Boundary checks (Bounce)
                    const cardWidth = expandedId === key ? 600 : 300 // Approx width
                    const cardHeight = expandedId === key ? 400 : 200 // Approx height

                    if (nextX < 0) {
                        nextX = 0
                        vel.vx = -vel.vx * bounce
                    } else if (nextX + cardWidth > containerWidth) {
                        nextX = containerWidth - cardWidth
                        vel.vx = -vel.vx * bounce
                    }

                    if (nextY < 0) {
                        nextY = 0
                        vel.vy = -vel.vy * bounce
                    } else if (nextY + cardHeight > containerHeight) {
                        nextY = containerHeight - cardHeight
                        vel.vy = -vel.vy * bounce
                    }

                    // Update if moved significantly
                    if (Math.abs(nextX - pos.x) > 0.1 || Math.abs(nextY - pos.y) > 0.1) {
                        nextPositions[key] = { x: nextX, y: nextY }
                        hasMovement = true
                    }
                })

                return hasMovement ? nextPositions : prevPositions
            })
        }

        requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
        window.removeEventListener('mousemove', handleMouseMove)
        if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [gravityEnabled, expandedId, isMobile])

  const toggleGravity = async () => {
    if (!gravityEnabled) {
        // Check for iOS 13+ DeviceOrientation permission
        if (
            typeof DeviceOrientationEvent !== 'undefined' && 
            typeof (DeviceOrientationEvent as any).requestPermission === 'function'
        ) {
            try {
                const permissionState = await (DeviceOrientationEvent as any).requestPermission()
                if (permissionState === 'granted') {
                    setGravityEnabled(true)
                } else {
                    alert('Permission to access device orientation was denied.')
                }
            } catch (error) {
                console.error(error)
                // Fallback or error handling
            }
        } else {
            // Non-iOS 13+ devices
            setGravityEnabled(true)
        }
    } else {
        setGravityEnabled(false)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event
    setPositions((prev) => ({
      ...prev,
      [active.id]: {
        x: prev[active.id as string].x + delta.x,
        y: prev[active.id as string].y + delta.y,
      },
    }))
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        width: '100%', 
        height: 'calc(100vh - 150px)', 
        position: 'relative', 
        overflow: 'hidden', 
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2, 
        bgcolor: 'background.default',
        backgroundImage: `radial-gradient(${alpha(theme.palette.text.secondary, 0.2)} 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
        <Box 
            sx={{ 
                position: 'absolute', 
                top: 10, 
                left: 10, 
                zIndex: 10, 
                display: 'flex', 
                gap: 2, 
                alignItems: 'center' 
            }}
        >
            <Typography 
                variant="caption" 
                sx={{ 
                    color: 'text.secondary',
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    display: { xs: 'none', sm: 'block' }
                }}
            >
                Canvas Mode: Drag cards to rearrange • Click arrows to expand
            </Typography>

            <Button
                variant={gestureEnabled ? 'contained' : 'outlined'}
                color={gestureEnabled ? 'primary' : 'inherit'}
                size="small"
                startIcon={gestureEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
                onClick={() => setGestureEnabled(!gestureEnabled)}
                sx={{ 
                    bgcolor: gestureEnabled ? undefined : alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(4px)',
                    display: { xs: 'none', md: 'flex' }
                }}
            >
                {gestureEnabled ? 'Gestures On' : 'Enable Camera'}
            </Button>

            <Button
                variant={gravityEnabled ? 'contained' : 'outlined'}
                color={gravityEnabled ? 'secondary' : 'inherit'}
                size="small"
                startIcon={gravityEnabled ? <ExploreIcon /> : <ExploreOffIcon />}
                onClick={toggleGravity}
                sx={{ 
                    bgcolor: gravityEnabled ? undefined : alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(4px)'
                }}
            >
                {gravityEnabled ? 'Gravity On' : 'Gravity Mode'}
            </Button>
      </Box>

      <GestureController enabled={gestureEnabled} />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
        {/* About Card */}
        <DraggableCard id="about" left={positions.about.x} top={positions.about.y} expanded={expandedId === 'about'}>
            <CardHeader title="About" isExpanded={expandedId === 'about'} onToggle={() => toggleExpand('about')} />
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2" paragraph>
                Implementing technology solutions for a FinTech, I'm seasoned in Microservices, UI, CI/CD, Test Automation and Infrastructure.
            </Typography>
            <Typography variant="body2" paragraph>
                At MSCI, I am a part of Wealth Management Team, where I am building features as a part of the MSCI Wealth Manager application, majorly focusing on reallocation of assets.
            </Typography>
            {expandedId === 'about' && (
               <Typography variant="body2" color="text.secondary">
                 In Deutsche Bank, I was a part of Contextual Banking (Banking as a Service), where I built Synthix, a marketplace for financial institutions.
                 Previously, I have researched and shipped projects that span computer vision, natural language processing, deep learning, and big data systems.
               </Typography>
            )}
        </DraggableCard>

        {/* Skills Card */}
        <DraggableCard id="skills" left={positions.skills.x} top={positions.skills.y} expanded={expandedId === 'skills'}>
            <CardHeader title="Skills" isExpanded={expandedId === 'skills'} onToggle={() => toggleExpand('skills')} />
            <Divider sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(expandedId === 'skills' ? skills : skills.slice(0, 6)).map((skill) => (
                    <Chip 
                        key={skill.name} 
                        label={skill.name} 
                        size="small" 
                        variant={skill.level === 'Advanced' ? 'filled' : 'outlined'} 
                        color={skill.level === 'Advanced' ? 'primary' : 'default'} 
                    />
                ))}
            </Box>
        </DraggableCard>

        {/* Experience Card */}
        <DraggableCard id="experience" left={positions.experience.x} top={positions.experience.y} expanded={expandedId === 'experience'}>
            <CardHeader title="Experience" isExpanded={expandedId === 'experience'} onToggle={() => toggleExpand('experience')} />
            <Divider sx={{ mb: 1 }} />
            <List dense disablePadding>
                {(expandedId === 'experience' ? experiences : experiences.slice(0, 2)).map((exp, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 1, display: 'block' }}>
                         <Typography variant="subtitle2">{exp.role}</Typography>
                         <Typography variant="caption" color="text.secondary">{exp.company} • {exp.start} - {exp.end}</Typography>
                         {expandedId === 'experience' && (
                             <Box sx={{ mt: 0.5, pl: 1, borderLeft: `2px solid ${theme.palette.divider}` }}>
                                <Typography variant="caption" display="block">{exp.summary}</Typography>
                             </Box>
                         )}
                    </ListItem>
                ))}
            </List>
        </DraggableCard>

        {/* Projects Card */}
        <DraggableCard id="projects" left={positions.projects.x} top={positions.projects.y} expanded={expandedId === 'projects'}>
            <CardHeader title="Projects" isExpanded={expandedId === 'projects'} onToggle={() => toggleExpand('projects')} />
            <Divider sx={{ mb: 1 }} />
             <List dense disablePadding>
                {(expandedId === 'projects' ? projects : projects.slice(0, 2)).map((proj, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 1, display: 'block' }}>
                         <Typography variant="subtitle2">{proj.name}</Typography>
                         <Typography variant="caption" color="text.secondary" noWrap={expandedId !== 'projects'} sx={{ display: 'block' }}>{proj.description}</Typography>
                    </ListItem>
                ))}
            </List>
        </DraggableCard>

        {/* Education Card */}
        <DraggableCard id="education" left={positions.education.x} top={positions.education.y} expanded={expandedId === 'education'}>
             <CardHeader title="Education" isExpanded={expandedId === 'education'} onToggle={() => toggleExpand('education')} />
             <Divider sx={{ mb: 1 }} />
             {(expandedId === 'education' ? education : education.slice(0, 1)).map((edu, i) => (
                 <Box key={i} sx={{ mb: 1 }}>
                     <Typography variant="subtitle2">{edu.program}</Typography>
                     <Typography variant="caption" color="text.secondary">{edu.institution}</Typography>
                     {expandedId === 'education' && edu.details.length > 0 && (
                         <Box sx={{ mt: 0.5, pl: 1, borderLeft: `2px solid ${theme.palette.divider}` }}>
                             <Typography variant="caption" display="block" color="text.secondary">
                                 {edu.details.join(' • ')}
                             </Typography>
                         </Box>
                     )}
                 </Box>
             ))}
        </DraggableCard>

        {/* Publications Card */}
        <DraggableCard id="publications" left={positions.publications.x} top={positions.publications.y} expanded={expandedId === 'publications'}>
            <CardHeader title="Publications" isExpanded={expandedId === 'publications'} onToggle={() => toggleExpand('publications')} />
            <Divider sx={{ mb: 1 }} />
            <List dense disablePadding>
                {(expandedId === 'publications' ? publications : publications.slice(0, 2)).map((pub, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 1, display: 'block' }}>
                         <Typography variant="subtitle2" component="a" href={pub.url} target="_blank" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}>
                            {pub.title}
                         </Typography>
                         <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{pub.venue} • {pub.year}</Typography>
                    </ListItem>
                ))}
            </List>
        </DraggableCard>

        {/* Contact Card */}
        <DraggableCard id="contact" left={positions.contact.x} top={positions.contact.y} expanded={expandedId === 'contact'}>
            <CardHeader title="Contact" isExpanded={expandedId === 'contact'} onToggle={() => toggleExpand('contact')} />
            <Divider sx={{ mb: 1 }} />
            <Stack spacing={0.5}>
                <Typography variant="body2">Pune, India</Typography>
                <Typography variant="body2" component="a" href="mailto:yashpatil1998@gmail.com" sx={{ textDecoration: 'none', color: 'primary.main' }}>
                    Email Me
                </Typography>
                <Typography variant="body2" component="a" href="https://linkedin.com/in/yashpatil1998" target="_blank" sx={{ textDecoration: 'none', color: 'primary.main' }}>
                    LinkedIn
                </Typography>
            </Stack>
        </DraggableCard>

      </DndContext>
    </Box>
  )
}

export default InteractPage
