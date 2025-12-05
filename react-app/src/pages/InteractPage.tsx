import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Box, Button, Typography, useTheme } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import { useGesture } from '../context/GestureContext'

const SaturnParticles = () => {
  const ref = useRef<THREE.Points>(null)
  const theme = useTheme()
  const { handRotation, handOpenness } = useGesture()
  
  // Generate base data (Base Positions + Expansion Vectors + Colors)
  const { basePositions, colors, expansionVectors } = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const expVectors = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    
    const baseColor = new THREE.Color(theme.palette.primary.main)
    const ringColor = new THREE.Color(theme.palette.secondary.main)

    for (let i = 0; i < count; i++) {
      const isRing = Math.random() > 0.4 
      let x, y, z

      if (isRing) {
        const innerRadius = 3
        const outerRadius = 6
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
        const theta = Math.random() * Math.PI * 2
        x = radius * Math.cos(theta)
        y = (Math.random() - 0.5) * 0.2
        z = radius * Math.sin(theta)
        
        cols[i * 3] = ringColor.r
        cols[i * 3 + 1] = ringColor.g
        cols[i * 3 + 2] = ringColor.b
      } else {
        const radius = 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        x = radius * Math.sin(phi) * Math.cos(theta)
        y = radius * Math.sin(phi) * Math.sin(theta)
        z = radius * Math.cos(phi)
        
        cols[i * 3] = baseColor.r
        cols[i * 3 + 1] = baseColor.g
        cols[i * 3 + 2] = baseColor.b
      }

      // Base position
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Expansion Vector (Random Direction * Speed)
      // Use normalized position as direction + noise
      const length = Math.sqrt(x*x + y*y + z*z) || 1
      const nx = x / length
      const ny = y / length
      const nz = z / length
      
      const speed = 5 + Math.random() * 5 // Expand out to 5-10 units away
      expVectors[i * 3] = nx * speed
      expVectors[i * 3 + 1] = ny * speed + (Math.random() - 0.5) * 2 // Add vertical chaos
      expVectors[i * 3 + 2] = nz * speed
    }

    return { basePositions: positions, colors: cols, expansionVectors: expVectors }
  }, [theme.palette.mode, theme.palette.primary.main, theme.palette.secondary.main])

  // Current positions (mutable)
  const currentPositions = useMemo(() => new Float32Array(basePositions), [basePositions])
  
  // Store the current expansion factor to smooth the transition
  const expansionRef = useRef(1) // Start expanded

  useFrame((state) => {
    if (!ref.current) return

    const { pointer } = state
    const time = state.clock.getElapsedTime()
    
    // Interaction Logic
    // handOpenness: 0 (Closed/Fist) -> Collapse (Target 0)
    // handOpenness: 1 (Open Hand) -> Expand (Target 1)
    // Use handOpenness directly as the target expansion factor
    
    // Smoothly move current expansion factor towards target
    expansionRef.current = THREE.MathUtils.lerp(expansionRef.current, handOpenness, 0.1)
    const expansionFactor = expansionRef.current

    // Access geometry attribute
    const geometry = ref.current.geometry
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute
    const posArray = positionAttribute.array as Float32Array

    // Update positions
    for (let i = 0; i < basePositions.length; i += 3) {
      const bx = basePositions[i]
      const by = basePositions[i + 1]
      const bz = basePositions[i + 2]

      const ex = expansionVectors[i]
      const ey = expansionVectors[i + 1]
      const ez = expansionVectors[i + 2]

      // Target = Base + Expansion * Factor
      // Add some rotation noise to expansion
      const noise = Math.sin(time + i) * 0.1 * expansionFactor

      const tx = bx + ex * expansionFactor + noise
      const ty = by + ey * expansionFactor + noise
      const tz = bz + ez * expansionFactor + noise

      // Lerp current to target for smooth transition
      posArray[i] += (tx - posArray[i]) * 0.1
      posArray[i + 1] += (ty - posArray[i + 1]) * 0.1
      posArray[i + 2] += (tz - posArray[i + 2]) * 0.1
    }

    positionAttribute.needsUpdate = true

    // Rotate entire system based on hand rotation (Roll)
    // Default automatic rotation is added to hand rotation
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -handRotation, 0.1)
    
    // Subtle auto-rotation on Y axis for depth effect
    ref.current.rotation.y += 0.002
    
    // Tilt X based on pointer vertical position for 3D feel
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y * 0.2, 0.05)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors={true}
        sizeAttenuation={true}
        depthWrite={false}
        transparent
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

const InteractPage = () => {
  const { gestureEnabled, setGestureEnabled } = useGesture()
  const theme = useTheme()

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: 'calc(100vh - 150px)', 
        position: 'relative', 
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Typography variant="h5" gutterBottom>
          Interactive Saturn
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enable gestures: 
          <br/>• <strong>Close Fist</strong>: Collapse Saturn
          <br/>• <strong>Open Hand</strong>: Expand Particles
          <br/>• <strong>Rotate Hand</strong>: Rotate Planet
        </Typography>
        <Button
            variant={gestureEnabled ? 'contained' : 'outlined'}
            color={gestureEnabled ? 'primary' : 'inherit'}
            startIcon={gestureEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
            onClick={() => setGestureEnabled(!gestureEnabled)}
            sx={{ mt: 2 }}
        >
            {gestureEnabled ? 'Gestures Enabled' : 'Enable Gestures'}
        </Button>
      </Box>

      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={[theme.palette.background.paper]} />
        <ambientLight intensity={0.5} />
        <SaturnParticles />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </Box>
  )
}

export default InteractPage
