'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function TrophyModel() {
  const { scene } = useGLTF('/models/trophy.glb');
  const ref = useRef<THREE.Group>(null);

  // Rotate the trophy slowly like a showcase
  useFrame((state, delta) => {
    if(ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <primitive 
          ref={ref} 
          object={scene} 
          scale={2} 
          position={[0, 0.5, 0]} 
        />
        
        {/* Add Gold Sparkles around the Trophy */}
        <Sparkles count={50} scale={3} size={4} speed={0.4} opacity={1} color="#FFD700" />
      </Float>
    </group>
  );
}

useGLTF.preload('/models/trophy.glb');