"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Strictly typed props for future extensibility
interface BrainModelProps {
  scale?: number;
  className?: string;
}

function BrainModelMesh({ scale = 1 }: { scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/my-model.glb");

  // Center the model
  useEffect(() => {
    if (ref.current) {
      // Compute bounding box and center
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      ref.current.position.set(-center.x, -center.y, -center.z);
    }
  }, [scene]);

  // Scroll-driven Y rotation with lerp
  const targetY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll (0 to 1)
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollNorm = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      // Map to a reasonable rotation range (e.g., 0 to 2*PI)
      targetY.current = scrollNorm * Math.PI * 2;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (ref.current) {
      // Lerp current rotation to target
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        targetY.current,
        0.08 // Damping factor (tweak for smoothness)
      );
    }
  });

  return (
    <group ref={ref} scale={scale}>
      {/* Render all children of the loaded scene */}
      {scene.children.map((child) => (
        <primitive object={child} key={child.uuid} />
      ))}
    </group>
  );
}

const BrainModel: React.FC<BrainModelProps> = ({ scale = 1, className }) => (
  <div className={className} style={{ width: "100%", height: "100%" }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />
      <BrainModelMesh scale={scale} />
    </Canvas>
  </div>
);

export default BrainModel;
