import { DndContext, type DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import { Box, Button, Chip, Divider, IconButton, List, ListItem, Stack, Typography, alpha, useTheme } from '@mui/material'
import { useState } from 'react'
import { DraggableCard } from '../components/DraggableCard'
import { GestureController } from '../components/GestureController'
import { education } from '../data/education'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

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
  const [positions, setPositions] = useState<Record<string, Position>>({
    about: { x: 50, y: 20 },
    skills: { x: 400, y: 20 },
    experience: { x: 50, y: 350 },
    projects: { x: 400, y: 350 },
    education: { x: 750, y: 20 },
    contact: { x: 750, y: 350 },
  })

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [gestureEnabled, setGestureEnabled] = useState(false)

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
                    backdropFilter: 'blur(4px)'
                }}
            >
                {gestureEnabled ? 'Gestures On' : 'Enable Camera'}
            </Button>
      </Box>

      <GestureController enabled={gestureEnabled} />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
        {/* About Card */}
        <DraggableCard id="about" left={positions.about.x} top={positions.about.y} expanded={expandedId === 'about'}>
            <CardHeader title="About" isExpanded={expandedId === 'about'} onToggle={() => toggleExpand('about')} />
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2" paragraph>
                Hi, I'm Yash Patil. I currently work as a Technology Analyst at Deutsche Bank.
            </Typography>
            <Typography variant="body2" paragraph>
                I build scalable backend architectures and experiment with deep learning.
            </Typography>
            {expandedId === 'about' && (
               <Typography variant="body2" color="text.secondary">
                 My work bridges platform modernization, distributed systems, and data-intensive applications. 
                 Outside of work, I enjoy mentoring and tinkering with new tech.
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
             {education.map((edu, i) => (
                 <Box key={i} sx={{ mb: 1 }}>
                     <Typography variant="subtitle2">{edu.program}</Typography>
                     <Typography variant="caption" color="text.secondary">{edu.institution}</Typography>
                 </Box>
             ))}
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
