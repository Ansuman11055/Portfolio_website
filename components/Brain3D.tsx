'use client'

import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGLTF } from '@react-three/drei'

gsap.registerPlugin(ScrollTrigger)

// Utility: Generate random points on a sphere
function generatePoints(count = 220, radius = 3.2) {
  const points = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * Math.random())
    const theta = 2 * Math.PI * Math.random()
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    points.push(new THREE.Vector3(x, y, z))
  }
  return points
}

function NeuralNetwork({
  groupRef,
  scrollProgressRef,
}: {
  groupRef: React.RefObject<THREE.Group>
  scrollProgressRef: React.MutableRefObject<number>
}) {
  const points = useMemo(() => generatePoints(220, 3.2), [])
  const lines = useMemo(() => {
    const threshold = 1.45
    const pairs = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < threshold) {
          pairs.push([points[i], points[j]])
        }
      }
    }
    return pairs
  }, [points])

  // Animate rotation in sync with scroll progress
  useFrame(() => {
    if (groupRef.current) {
      const prog = scrollProgressRef.current
      groupRef.current.rotation.y = prog * Math.PI * 2
      groupRef.current.rotation.x = Math.sin(prog * Math.PI) * 0.25
    }
  })

  // Load the GLTF model
  const { scene } = useGLTF('/models/brain/scene.gltf')

  return (
    <group ref={groupRef}>
      {/* Points */}
      {points.map((p, i) => (
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00fff7' : '#a78bfa'} />
        </mesh>
      ))}
      {/* Lines */}
      {lines.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={i % 2 === 0 ? '#a78bfa' : '#00fff7'}
            transparent
            opacity={0.28}
          />
        </line>
      ))}
      {/* GLTF Model */}
      <primitive object={scene} />
    </group>
  )
}

export default function Brain3D() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollProgress = useRef(0)

  useLayoutEffect(() => {
    const trig = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })
    return () => trig.kill()
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00fff7" />
        <NeuralNetwork groupRef={groupRef} scrollProgressRef={scrollProgress} />
      </Canvas>
    </div>
  )
}
