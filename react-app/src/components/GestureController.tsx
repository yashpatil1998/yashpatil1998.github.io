import {
  FilesetResolver,
  HandLandmarker,
  DrawingUtils,
} from '@mediapipe/tasks-vision'
import { Box, CircularProgress, Typography, useTheme, alpha } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useGesture } from '../context/GestureContext'

type GestureControllerProps = {
  enabled: boolean
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export const GestureController = ({ enabled, onSwipeLeft, onSwipeRight }: GestureControllerProps) => {
  const { triggerSwipe } = useGesture()
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const handLandmarkerRef = useRef<HandLandmarker | null>(null)
  const requestRef = useRef<number>(null)
  const isPinchingRef = useRef(false)
  const theme = useTheme()
  const [cursorPos, setCursorPos] = useState<{x: number, y: number} | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const smoothPosRef = useRef<{x: number, y: number} | null>(null)

  // Callbacks refs to avoid stale closures in animation loop
  const onSwipeLeftRef = useRef(onSwipeLeft)
  const onSwipeRightRef = useRef(onSwipeRight)

  useEffect(() => {
    onSwipeLeftRef.current = onSwipeLeft
    onSwipeRightRef.current = onSwipeRight
  }, [onSwipeLeft, onSwipeRight])

  // Swipe detection refs
  const positionHistoryRef = useRef<{x: number, time: number}[]>([])
  const SWIPE_THRESHOLD = 300 // pixels
  const SWIPE_TIMEOUT = 300 // ms

  // Initialize MediaPipe HandLandmarker
  useEffect(() => {
    const loadModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
        )
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        })
        handLandmarkerRef.current = handLandmarker
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading hand landmarker:', error)
      }
    }

    if (enabled) {
      loadModel()
    } else {
      setIsLoaded(false)
      handLandmarkerRef.current = null
      setCursorPos(null)
      setIsHovering(false)
      smoothPosRef.current = null
      positionHistoryRef.current = []
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [enabled])

  const detectSwipe = (currentX: number) => {
    const now = Date.now()

    // Add current position to history
    positionHistoryRef.current.push({ x: currentX, time: now })

    // Remove old positions
    positionHistoryRef.current = positionHistoryRef.current.filter(
      p => now - p.time < SWIPE_TIMEOUT
    )

    if (positionHistoryRef.current.length < 5) return

    const oldest = positionHistoryRef.current[0]
    const newest = positionHistoryRef.current[positionHistoryRef.current.length - 1]
    const diffX = newest.x - oldest.x

    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      // Check global cooldown
      if (!triggerSwipe()) return

      if (diffX > 0) {
        // Moved Right
        if (onSwipeRightRef.current) {
          onSwipeRightRef.current()
          positionHistoryRef.current = []
        }
      } else {
        // Moved Left
        if (onSwipeLeftRef.current) {
          onSwipeLeftRef.current()
          positionHistoryRef.current = []
        }
      }
    }
  }

  const processVideo = () => {
    if (
      !enabled ||
      !webcamRef.current?.video ||
      webcamRef.current.video.readyState !== 4 ||
      !handLandmarkerRef.current ||
      !canvasRef.current
    ) {
      requestRef.current = requestAnimationFrame(processVideo)
      return
    }

    const video = webcamRef.current.video
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Match canvas size to video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Detect hands
    const startTimeMs = performance.now()
    const results = handLandmarkerRef.current.detectForVideo(video, startTimeMs)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0]
      
      // Draw landmarks
      const drawingUtils = new DrawingUtils(ctx)
      drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 3
      })
      drawingUtils.drawLandmarks(landmarks, { color: '#FF0000', lineWidth: 1, radius: 3 })

      // Logic: Use Index Finger Tip (8) as cursor
      const indexTip = landmarks[8]
      const thumbTip = landmarks[4]

      // Map to screen coordinates
      // Note: Camera is mirrored by default, so we flip X
      const rawX = (1 - indexTip.x) * window.innerWidth
      const rawY = indexTip.y * window.innerHeight
      
      // Smoothing
      let cursorX = rawX
      let cursorY = rawY
      
      if (smoothPosRef.current) {
        const smoothingFactor = 0.2 // Adjust for balance between smoothness and responsiveness
        cursorX = smoothPosRef.current.x + (rawX - smoothPosRef.current.x) * smoothingFactor
        cursorY = smoothPosRef.current.y + (rawY - smoothPosRef.current.y) * smoothingFactor
      }
      
      smoothPosRef.current = { x: cursorX, y: cursorY }
      
      // Update visual cursor state
      setCursorPos({ x: cursorX, y: cursorY })

      // Detect Swipe
      detectSwipe(cursorX)

      // Draw virtual cursor on canvas for feedback
      // We need to map this back to canvas coordinates for drawing
      const canvasCursorX = (1 - indexTip.x) * canvas.width
      const canvasCursorY = indexTip.y * canvas.height
      
      ctx.beginPath()
      ctx.arc(canvasCursorX, canvasCursorY, 10, 0, 2 * Math.PI)
      ctx.fillStyle = isPinchingRef.current ? 'blue' : 'yellow'
      ctx.fill()

      // Calculate distance between thumb and index for "Pinch" gesture
      const distance = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y)
      const isPinching = distance < 0.05 // Threshold may need tuning

      // Simulate Pointer Events
      simulatePointerEvent(cursorX, cursorY, isPinching)
    }

    requestRef.current = requestAnimationFrame(processVideo)
  }

  const simulatePointerEvent = (x: number, y: number, isPinching: boolean) => {
    const target = document.elementFromPoint(x, y);

    // Check for interactive elements to update hover state
    const clickable = target?.closest('button, a, [role="button"], .MuiChip-root, .MuiListItem-root') !== null
    if (clickable !== isHovering) {
        setIsHovering(clickable)
    }

    // 1. Move the cursor
    const moveEvent = new PointerEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y,
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
      pressure: isPinching ? 0.5 : 0
    })
    target?.dispatchEvent(moveEvent)

    // 2. Handle Drag Start (Pinch Down)
    if (isPinching && !isPinchingRef.current) {
        const downEvent = new PointerEvent('pointerdown', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            screenX: x,
            screenY: y,
            pointerId: 1,
            pointerType: 'mouse',
            isPrimary: true,
            buttons: 1,
            pressure: 0.5
        })
        target?.dispatchEvent(downEvent)
    }

    // 3. Handle Drag End (Pinch Release)
    if (!isPinching && isPinchingRef.current) {
        const upEvent = new PointerEvent('pointerup', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            screenX: x,
            screenY: y,
            pointerId: 1,
            pointerType: 'mouse',
            isPrimary: true,
            buttons: 0,
            pressure: 0
        })
        target?.dispatchEvent(upEvent)
    }

    isPinchingRef.current = isPinching
  }

  // Start processing loop when loaded
  useEffect(() => {
    if (isLoaded && enabled) {
        requestRef.current = requestAnimationFrame(processVideo)
    }
  }, [isLoaded, enabled])

  if (!enabled) return null

  return (
    <>
        {/* On-screen Cursor */}
        {cursorPos && (
            <Box
                sx={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: isHovering || isPinchingRef.current ? 32 : 20,
                    height: isHovering || isPinchingRef.current ? 32 : 20,
                    borderRadius: '50%',
                    bgcolor: isPinchingRef.current 
                        ? 'primary.main' 
                        : isHovering 
                            ? alpha(theme.palette.primary.main, 0.4) 
                            : 'warning.main',
                    border: isHovering || isPinchingRef.current 
                        ? `2px solid ${theme.palette.primary.main}`
                        : '2px solid white',
                    boxShadow: isHovering || isPinchingRef.current 
                        ? `0 0 15px 2px ${alpha(theme.palette.primary.main, 0.6)}`
                        : 3,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: `translate3d(${cursorPos.x - (isHovering || isPinchingRef.current ? 16 : 10)}px, ${cursorPos.y - (isHovering || isPinchingRef.current ? 16 : 10)}px, 0)`,
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s, box-shadow 0.2s, transform 0.05s linear'
                }}
            />
        )}

        <Box 
        sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20, 
            zIndex: 2000,
            pointerEvents: 'none', // Allow clicks to pass through container
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 1
        }}
        >
            {!isLoaded && (
                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <CircularProgress size={20} />
                    <Typography variant="caption">Loading AI Model...</Typography>
                </Box>
            )}
            
            <Box 
                sx={{ 
                    width: 240, 
                    height: 180, 
                    bgcolor: 'black', 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    position: 'relative',
                    boxShadow: 4,
                    border: `2px solid ${isPinchingRef.current ? theme.palette.primary.main : 'transparent'}`,
                    transition: 'border-color 0.2s'
                }}
            >
                <Webcam
                    ref={webcamRef}
                    mirrored
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onUserMedia={() => setCameraPermission(true)}
                    onUserMediaError={() => setCameraPermission(false)}
                />
                <canvas
                    ref={canvasRef}
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover' 
                    }}
                />
                <Typography 
                    variant="caption" 
                    sx={{ 
                        position: 'absolute', 
                        bottom: 4, 
                        left: 4, 
                        color: 'white', 
                        bgcolor: cameraPermission === false ? 'error.main' : 'rgba(0,0,0,0.5)', 
                        px: 0.5, 
                        borderRadius: 0.5 
                    }}
                >
                    {cameraPermission === false ? 'Camera Denied' : isLoaded ? 'Wave to Navigate • Pinch to Click' : 'Initializing...'}
                </Typography>
            </Box>
        </Box>
    </>
  )
}
