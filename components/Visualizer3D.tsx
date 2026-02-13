"use client"

/**
 * Visualizer3D Component
 * Three.js-based 3D music visualizer with real-time audio analysis
 */

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { AudioData } from '@/lib/audio/analyzer'

interface Visualizer3DProps {
  audioData: AudioData | null
  colorPalette?: string[]
  particleCount?: number
  intensity?: number
}

interface ParticleSystemProps {
  audioData: AudioData | null
  colorPalette: string[]
  count: number
  intensity: number
}

function ParticleSystem({ audioData, colorPalette, count, intensity }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(count * 3))
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3))
  const colorsRef = useRef<Float32Array>(new Float32Array(count * 3))

  useEffect(() => {
    // Initialize particle positions
    const positions = positionsRef.current
    const velocities = velocitiesRef.current
    const colors = colorsRef.current

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Random positions in a sphere
      const radius = Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02

      // Initial colors
      const color = new THREE.Color(colorPalette[i % colorPalette.length])
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
  }, [count, colorPalette])

  useFrame((state, delta) => {
    if (!meshRef.current || !audioData) return

    const positions = positionsRef.current
    const velocities = velocitiesRef.current
    const colors = colorsRef.current
    const geometry = meshRef.current.geometry
    const material = materialRef.current

    const { bass, mid, treble, volume } = audioData

    // Update particle positions and colors
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Apply audio influence
      const audioInfluence = (bass + mid * 0.5 + treble * 0.3) * intensity
      
      // Update positions
      positions[i3] += velocities[i3] * (1 + audioInfluence)
      positions[i3 + 1] += velocities[i3 + 1] * (1 + audioInfluence)
      positions[i3 + 2] += velocities[i3 + 2] * (1 + audioInfluence)

      // Boundary checking (keep particles in sphere)
      const distance = Math.sqrt(
        positions[i3] ** 2 + 
        positions[i3 + 1] ** 2 + 
        positions[i3 + 2] ** 2
      )
      
      if (distance > 15) {
        velocities[i3] *= -0.5
        velocities[i3 + 1] *= -0.5
        velocities[i3 + 2] *= -0.5
      }

      // Update colors based on frequency
      const colorIndex = Math.floor((i / count) * colorPalette.length)
      const baseColor = new THREE.Color(colorPalette[colorIndex])
      
      // Modulate color with audio
      const bassInfluence = bass * 0.5
      const trebleInfluence = treble * 0.3
      
      colors[i3] = Math.min(1, baseColor.r * (1 + bassInfluence))
      colors[i3 + 1] = Math.min(1, baseColor.g * (1 + mid * 0.3))
      colors[i3 + 2] = Math.min(1, baseColor.b * (1 + trebleInfluence))
    }

    // Update geometry
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true

    // Update material size based on volume
    if (material) {
      material.size = 0.1 + volume * intensity * 0.3
    }

    // Rotate the entire system slowly
    meshRef.current.rotation.y += delta * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positionsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colorsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function Visualizer3D({
  audioData,
  colorPalette = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
  particleCount = 1000,
  intensity = 0.8,
}: Visualizer3DProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/90 rounded-lg">
        <p className="text-white">Loading visualizer...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #000000, #1a1a2e)' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <ParticleSystem
          audioData={audioData}
          colorPalette={colorPalette}
          count={particleCount}
          intensity={intensity}
        />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
