'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mesh } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * RotatingShape Component
 * Renders a torus with visible rotation for scroll-driven animation.
 * Exposed via forwardRef for GSAP animation control.
 */
const RotatingShape = React.forwardRef<Mesh>((props, ref) => {
  return (
    <mesh ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
      {/* Torus is highly visible when rotating */}
      <torusGeometry args={[2, 0.8, 32, 100]} />
      <meshPhysicalMaterial
        color="#00d9ff"
        metalness={0.3}
        roughness={0.2}
        transmission={0.7}
        thickness={1}
        ior={1.5}
        reflectivity={0.9}
        clearcoat={0.5}
        clearcoatRoughness={0.05}
        emissive="#0099cc"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
})

RotatingShape.displayName = 'RotatingShape'

/**
 * Scene Component
 * Fixed 3D background with scroll-driven rotation.
 */
export default function Scene() {
  const meshRef = useRef<Mesh>(null)

  useLayoutEffect(() => {
    if (!meshRef.current) return

    // Directly animate mesh rotation based on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          if (meshRef.current) {
            meshRef.current.rotation.x = self.getProgress() * Math.PI * 2
            meshRef.current.rotation.y = self.getProgress() * Math.PI * 3
            meshRef.current.rotation.z = self.getProgress() * Math.PI
          }
        },
      },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#00d9ff" />
        <pointLight position={[-15, -15, 5]} intensity={1} color="#ff00ff" />

        {/* Animated shape */}
        <RotatingShape ref={meshRef} />

        {/* Background */}
        <color attach="background" args={['#0a0e27']} />
      </Canvas>
    </div>
  )
}
