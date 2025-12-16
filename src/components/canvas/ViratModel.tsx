'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import gsap from 'gsap';

export default function ViratModel() {
  const group = useRef<THREE.Group>(null);
  const { mode } = useStore();

  // 1. Load the Model
  // NOTE: If you don't have this file in public/models yet, 
  // the app will break unless you comment this out and use the fallback below.
  // For now, I will wrap it in a try-catch logic visually.
  
  /* Once you have the file, uncomment these lines:
     const { scene, animations } = useGLTF('/models/virat-batting.glb');
     const { actions } = useAnimations(animations, group);
  */

  // 2. Logic to React to "Modes"
  useEffect(() => {
    if (!group.current) return;

    // A. Aggressive Mode (RCB Red / Fast Movement)
    if (mode === 'aggressive') {
      gsap.to(group.current.scale, {
        x: 1.1, y: 1.1, z: 1.1, // Pulse effect
        duration: 0.5,
        ease: "back.out(1.7)"
      });
      // If you had real animations: actions['AggressiveShot']?.play();
    } 
    
    // B. Classic Mode (India Blue / Steady)
    else if (mode === 'classic') {
      gsap.to(group.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [mode]);

  // 3. Constant Animation Loop
  useFrame((state) => {
    if (!group.current) return;

    // Gentle floating breathing animation
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

    // Slight rotation based on mouse position (Parallax)
    const x = state.pointer.x * 0.2;
    const y = state.pointer.y * 0.2;
    
    // Smoothly interpolate rotation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.1);
  });

  // --- RENDER ---
  
  // OPTION A: If you HAVE the model (Uncomment scene below)
  // return <primitive ref={group} object={scene} scale={2} position={[0, -2, 0]} />

  // OPTION B: PLACEHOLDER (Use this until you download a GLB)
  return (
    <group ref={group} dispose={null}>
      {/* 1. The "Body" */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial 
          color={mode === 'aggressive' ? '#E31937' : '#005EB8'} // Changes color Red/Blue
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 2. The "Head" (Helmet) */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* 3. The "Bat" */}
      <mesh position={[0.6, -0.5, 0.2]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.2, 1.5, 0.05]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} />
      </mesh>
    </group>
  );
}

// Preload to prevent lag
// useGLTF.preload('/models/virat-batting.glb');