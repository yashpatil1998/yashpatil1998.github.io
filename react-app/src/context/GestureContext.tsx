import { createContext, useContext, useRef, useState, type ReactNode } from 'react'

type GestureContextType = {
  gestureEnabled: boolean
  setGestureEnabled: (enabled: boolean) => void
  isGrabbing: boolean
  setIsGrabbing: (grabbing: boolean) => void
  handRotation: number
  setHandRotation: (rotation: number) => void
  handOpenness: number
  setHandOpenness: (openness: number) => void
  triggerSwipe: () => boolean
}

const GestureContext = createContext<GestureContextType | undefined>(undefined)

export const GestureProvider = ({ children }: { children: ReactNode }) => {
  const [gestureEnabled, setGestureEnabled] = useState(false)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [handRotation, setHandRotation] = useState(0)
  const [handOpenness, setHandOpenness] = useState(1) // 0 = Closed (Fist), 1 = Open (Palm)
  const lastSwipeTimeRef = useRef(0)

  const triggerSwipe = () => {
    const now = Date.now()
    if (now - lastSwipeTimeRef.current < 1000) { // 1 second cooldown
        return false
    }
    lastSwipeTimeRef.current = now
    return true
  }

  return (
    <GestureContext.Provider value={{ 
      gestureEnabled, 
      setGestureEnabled, 
      isGrabbing, 
      setIsGrabbing, 
      handRotation,
      setHandRotation,
      handOpenness,
      setHandOpenness,
      triggerSwipe 
    }}>
      {children}
    </GestureContext.Provider>
  )
}

export const useGesture = () => {
  const context = useContext(GestureContext)
  if (context === undefined) {
    throw new Error('useGesture must be used within a GestureProvider')
  }
  return context
}
