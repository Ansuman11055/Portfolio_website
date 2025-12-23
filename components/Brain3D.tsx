// Preload the brain model as soon as possible

// (removed duplicate import)
useGLTF.preload('/models/human-brain.glb');

'use client';
import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function WireframeBrain() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/human-brain.glb');

  // Smooth scroll-driven rotation
  const targetRotation = useRef({ x: 0, y: 0 });
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Map scroll position to rotation (tweak multipliers for effect)
      targetRotation.current.y = scrollY * 0.005;
      targetRotation.current.x = Math.sin(scrollY * 0.002) * 0.18;
      lastScroll.current = scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate rotation smoothly toward target
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += (targetRotation.current.y - ref.current.rotation.y) * 0.08;
      ref.current.rotation.x += (targetRotation.current.x - ref.current.rotation.x) * 0.08;
    }
  });

  // Find the mesh in the loaded scene

  let mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | null = null;
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry && !mesh) {
      mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
    }
  });
  if (!mesh) return null;

  return (
    <group ref={ref}>
      {/* Main wireframe layer (cyan) */}
      <mesh geometry={(mesh as THREE.Mesh).geometry}>
        <meshBasicMaterial wireframe color="#00FFFF" transparent opacity={0.3} />
      </mesh>
      {/* Optional: Second layer for glow/interference (purple, slightly larger) */}
      <mesh geometry={(mesh as THREE.Mesh).geometry} scale={1.03}>
        <meshBasicMaterial wireframe color="#bd00ff" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function Brain3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00fff7" />
        <Suspense fallback={null}>
          <WireframeBrain />
        </Suspense>
      </Canvas>
    </div>
  );
}
