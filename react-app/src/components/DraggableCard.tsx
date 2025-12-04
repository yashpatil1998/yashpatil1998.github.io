import { useDraggable } from '@dnd-kit/core'
import { Box, Paper, useTheme, alpha } from '@mui/material'
import type { ReactNode } from 'react'

type DraggableCardProps = {
  id: string
  left: number
  top: number
  children: ReactNode
  expanded?: boolean
}

export const DraggableCard = ({ id, left, top, children, expanded = false }: DraggableCardProps) => {
  const theme = useTheme()
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  })

  const style = {
    position: 'absolute' as const,
    left: left,
    top: top,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 1000 : (expanded ? 100 : 1),
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
  }

  return (
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Paper 
        elevation={isDragging || expanded ? 8 : 2} 
        sx={{ 
          p: 2, 
          minWidth: 200, 
          maxWidth: expanded ? 600 : 300,
          maxHeight: expanded ? '80vh' : 'auto',
          overflow: expanded ? 'auto' : 'hidden',
          transition: 'all 0.2s ease-in-out',
          border: isDragging || expanded ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
          boxShadow: isDragging || expanded 
            ? `0 0 15px 2px ${alpha(theme.palette.primary.main, 0.4)}` 
            : 3,
          '&:hover': {
            boxShadow: `0 0 10px 1px ${alpha(theme.palette.primary.main, 0.3)}`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`
          }
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}
