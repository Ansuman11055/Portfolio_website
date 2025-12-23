'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function generatePoints(count = 220, radius = 3.2) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * Math.random());
    const theta = 2 * Math.PI * Math.random();
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

function BrainNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const points = React.useMemo(() => generatePoints(220, 3.2), []);
  const lines = React.useMemo(() => {
    const threshold = 1.45;
    const pairs = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < threshold) {
          pairs.push([points[i], points[j]]);
        }
      }
    }
    return pairs;
  }, [points]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00fff7' : '#a78bfa'} />
        </mesh>
      ))}
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
          <lineBasicMaterial color={i % 2 === 0 ? '#a78bfa' : '#00fff7'} transparent opacity={0.28} />
        </line>
      ))}
    </group>
  );
}

export default function AboutSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-black/20 backdrop-blur-md shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center text-[#00fff7] mb-2">About Me</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#00fff7] to-[#a78bfa] mb-8 rounded-full mx-auto" />
        {/* 3D Brain + Profile Image */}
        <div className="relative w-full max-w-xl flex flex-col items-center justify-center mb-10" style={{ height: 420 }}>
          {/* 3D Brain (z-0) */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} className="w-full h-full">
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#00fff7" />
              <BrainNetwork />
            </Canvas>
          </div>
          {/* Profile Image (z-10) */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-[#00fff7] shadow-[0_0_60px_20px_rgba(0,255,255,0.4)] object-cover bg-[#10131a]"
            />
            {/* Optional: Glowing ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-[#00fff7]/30" />
          </div>
        </div>
        {/* Content */}
        <div className="max-w-2xl mx-auto text-center text-gray-200 space-y-6">
          <p>
            I&apos;m a B.Tech student at{' '}
            <span className="text-[#00fff7] font-semibold">IIT Mandi (&apos;28)</span> passionate about building intelligent systems that combine algorithmic depth with real-world impact.
          </p>
          <p>
            I explore{' '}
            <span className="text-[#a78bfa] font-semibold">AI</span>,{' '}
            <span className="text-[#00fff7] font-semibold">full-stack development</span>, and{' '}
            <span className="text-[#a78bfa] font-semibold">edge computing</span> — crafting solutions that feel both technical and human.
          </p>
          <p>
            My work spans from neural networks and NLP to building responsive web applications that push the boundaries of user experience.
          </p>
          <div className="bg-[#181c27]/80 rounded-xl p-5 text-base text-gray-100 shadow-lg inline-block mx-auto">
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00fff7] rounded-full inline-block" />{' '}
                <span className="text-white">🎓 IIT Mandi, B.Tech &apos;28</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#a78bfa] rounded-full inline-block" />{' '}
                <span className="text-white">🤖 Machine Learning Engineer</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00fff7] rounded-full inline-block" />{' '}
                <span className="text-white">💻 Full-Stack Developer</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#a78bfa] rounded-full inline-block" />{' '}
                <span className="text-white">🧠 AI Enthusiast</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
