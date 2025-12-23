"use client"

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Html } from '@react-three/drei'
import { Mesh, BufferGeometry, Vector3, PointLight } from 'three'
import * as THREE from 'three'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type ShardProps = {
  pointer: React.MutableRefObject<{ x: number; y: number }>
  lightRef: React.MutableRefObject<PointLight | null>
  containerRef: React.RefObject<HTMLDivElement>
}

function Shard({ pointer, lightRef, containerRef }: ShardProps) {
  const meshRef = useRef<Mesh | null>(null)
  const { camera } = useThree()
  const [initialRotation] = useState(() => ({
    x: (Math.random() - 0.5) * 0.2,
    y: (Math.random() - 0.5) * 0.6,
    z: (Math.random() - 0.5) * 0.2,
  }))

  const geometry = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.2, 0) as BufferGeometry
    const pos = g.attributes.position
    const normal = g.attributes.normal
    for (let i = 0; i < pos.count; i++) {
      const nx = normal.getX(i)
      const ny = normal.getY(i)
      const nz = normal.getZ(i)
      const disp = (Math.random() * 0.55 + 0.05) * (Math.random() > 0.5 ? 1 : -1)
      pos.setXYZ(i, pos.getX(i) + nx * disp, pos.getY(i) + ny * disp, pos.getZ(i) + nz * disp)
    }
    g.computeVertexNormals()
    return g
  }, [])

  const materialProps = {
    transmission: 1.0,
    roughness: 0.08,
    thickness: 1.5,
    ior: 1.5,
    metalness: 0.0,
    reflectivity: 0.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.0,
  } as any

  useFrame((state) => {
    const mesh = meshRef.current
    const light = lightRef.current
    if (!mesh) return

    const targetRotY = initialRotation.y + pointer.current.x * 0.6
    const targetRotX = initialRotation.x + pointer.current.y * 0.25

    mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.08
    mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.08
    mesh.rotation.z += ((initialRotation.z + pointer.current.x * 0.05) - mesh.rotation.z) * 0.06

    const t = state.clock.elapsedTime
    mesh.position.y = Math.sin(t * 0.8) * 0.06
    mesh.position.x += (pointer.current.x * 0.15 - mesh.position.x) * 0.06

    if (light) {
      const vec = new Vector3(pointer.current.x * 1.5, -pointer.current.y * 1.5, 0)
      vec.unproject(camera)
      light.position.x += (vec.x - light.position.x) * 0.12
      light.position.y += (vec.y - light.position.y) * 0.12
      light.position.z += ((camera.position.z - 1.5) - light.position.z) * 0.12
    }
  })

  useEffect(() => {
    const mesh = meshRef.current
    const container = containerRef.current
    if (!mesh || !container) return

    const st = gsap.to(mesh.rotation, {
      y: '+=6.28318530718',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((s) => s.kill())
    }
  }, [containerRef])

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial {...materialProps} color={'#dff9ff'} opacity={1} />
    </mesh>
  )
}

export default function Hero3D() {
  const pointer = useRef({ x: 0, y: 0 })
  const lightRef = useRef<PointLight | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      pointer.current.x = x
      pointer.current.y = -y
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return
      const t = e.touches[0]
      const rect = el.getBoundingClientRect()
      const x = ((t.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((t.clientY - rect.top) / rect.height) * 2 - 1
      pointer.current.x = x
      pointer.current.y = -y
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('touchmove', onTouchMove as any)
    }
  }, [])

  return (
    <div id="hero3d" ref={containerRef} className="w-full h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      <div className="absolute z-20 top-24 left-8 md:left-16 text-white max-w-xl pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">Iridescent Shard</h1>
        <p className="mt-3 text-gray-300 max-w-md">Interactive 3D hero inspired by igloo.inc — iridescent glass shard with parallax and scroll-driven rotation.</p>
      </div>

      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: '100%', height: '100%' }} shadows>
          {/* Ambient fill to keep glass visible in dark void; removed HDR preset to avoid external fetch errors */}
          <ambientLight intensity={0.35} />

          {/* Extra ambient to emulate some environment lighting without HDRI */}
          <ambientLight intensity={0.12} />
        <pointLight ref={lightRef} intensity={2.2} distance={10} decay={2} color={'#bdefff'} position={[0, 0, 2]} />
        <pointLight intensity={0.6} position={[-3, 2, 1]} color={'#a78bfa'} />

        <Shard pointer={pointer} lightRef={lightRef} containerRef={containerRef} />

        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={1} intensity={0.9} radius={0.7} blendFunction={BlendFunction.ADD} />
          {/* ChromaticAberration removed to avoid typing/runtime mismatches in build */}
          <Noise opacity={0.05} />
        </EffectComposer>

        <Html fullscreen center>
          <div style={{ display: 'none' }} />
        </Html>
      </Canvas>
    </div>
  )
}
