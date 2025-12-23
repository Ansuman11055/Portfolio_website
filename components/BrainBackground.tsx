'use client';

import React, { useMemo, useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MeshSurfaceSampler } from 'three-stdlib';
import * as THREE from 'three';

// 1. Particle System Component
type BrainParticlesProps = {
  count?: number;
  scrollProgressRef: React.MutableRefObject<number>;
};
function BrainParticles({ count = 800, scrollProgressRef }: BrainParticlesProps) { // Increased count for better shape definition
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  // Load a standard brain model (GLTF) to sample points from
  const { scene } = useGLTF('/models/brain/scene.gltf');
  // State to hold our generated points
  const [brainData, setBrainData] = useState<{
    positions: Float32Array;
    colors: Float32Array;
    linePositions: Float32Array;
  } | null>(null);

  useEffect(() => {
    if (!scene) return;
    // 1. Find the mesh inside the loaded model
    let brainMesh: THREE.Mesh | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        brainMesh = child as THREE.Mesh;
      }
    });
    if (!brainMesh) return;
    // 2. Create a sampler to pick random points on the mesh surface
    const sampler = new MeshSurfaceSampler(brainMesh).build();
    const tempPosition = new THREE.Vector3();
    const samples = [];
    const sampleColors = [];
    const linePoints = [];
    // 3. Sample points
    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition);
      samples.push(tempPosition.x, tempPosition.y, tempPosition.z);
      // Color logic: Cyan & Purple
      const color = new THREE.Color();
      if (Math.random() > 0.5) {
        color.set('#00FFFF'); // Cyan
      } else {
        color.set('#bd00ff'); // Purple
      }
      sampleColors.push(color.r, color.g, color.b);
    }
    // 4. Generate lines between close points
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const x1 = samples[i * 3];
        const y1 = samples[i * 3 + 1];
        const z1 = samples[i * 3 + 2];
        const x2 = samples[j * 3];
        const y2 = samples[j * 3 + 1];
        const z2 = samples[j * 3 + 2];
        const dist = Math.sqrt(
          Math.pow(x1 - x2, 2) + 
          Math.pow(y1 - y2, 2) + 
          Math.pow(z1 - z2, 2)
        );
        if (dist < 0.4) { 
          linePoints.push(x1, y1, z1);
          linePoints.push(x2, y2, z2);
        }
      }
    }
    setBrainData({
      positions: new Float32Array(samples),
      colors: new Float32Array(sampleColors),
      linePositions: new Float32Array(linePoints)
    });
  }, [scene, count]);

  // Animation: Rotate the group
  // Smooth scroll-driven rotation using lerp
  const targetRotation = useRef({ y: 0, x: 0 });
  useFrame(() => {
    if (groupRef.current && scrollProgressRef.current !== undefined) {
      const prog = scrollProgressRef.current;
      // Target rotation
      targetRotation.current.y = prog * Math.PI * 2;
      targetRotation.current.x = Math.sin(prog * Math.PI) * 0.25;
      // Lerp current rotation towards target
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.08;
    }
  });

  if (!brainData) return null;

  return (
    <group ref={groupRef}>
      {/* The Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={brainData.positions.length / 3}
            array={brainData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={brainData.colors.length / 3}
            array={brainData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          toneMapped={false}
          sizeAttenuation={true}
        />
      </points>
      {/* The Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={brainData.linePositions.length / 3}
            array={brainData.linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4B0082"
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

// 2. Main Scene Component
export default function BrainBackground() {
  const scrollProgress = React.useRef(0);

  useLayoutEffect(() => {
    const trig = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6, // Lower scrub for smoother, more responsive feel
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trig.kill();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="w-[110vw] h-[110vh] flex items-center justify-center">
        <Canvas dpr={[1, 2]} gl={{ antialias: false }} camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <BrainParticles count={1500} scrollProgressRef={scrollProgress} />
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9} 
              height={300} 
              intensity={1.2} 
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
