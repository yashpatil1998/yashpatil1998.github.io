import { useDraggable } from '@dnd-kit/core'
import { Box, Paper } from '@mui/material'
import type { ReactNode } from 'react'

type DraggableCardProps = {
  id: string
  left: number
  top: number
  children: ReactNode
  expanded?: boolean
}

export const DraggableCard = ({ id, left, top, children, expanded = false }: DraggableCardProps) => {
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
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}
