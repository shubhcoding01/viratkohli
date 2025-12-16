'use client';

import { Sparkles, Environment, ContactShadows } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function StadiumModel() {
  const { mode } = useStore();
  const { scene } = useThree();

  // 1. Dynamic Atmosphere (Fog)
  // This blends the floor into the background seamlessly
  useEffect(() => {
    const color = mode === 'aggressive' ? '#2a0a0a' : '#050505'; // Red tint vs Deep Black
    scene.fog = new THREE.Fog(color, 5, 20); // Starts at 5m, fully opaque at 20m
    scene.background = new THREE.Color(color);
  }, [mode, scene]);

  return (
    <group>
      {/* 2. Realistic Lighting (HDRI) 
          'preset="city"' gives a nice night-time stadium vibe automatically.
          blur={1} hides the actual image so it looks like soft light.
      */}
      <Environment preset="city" blur={1} />

      {/* 3. The Floor (Pitch) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#111" 
          roughness={0.8} 
          metalness={0.2} 
        />
      </mesh>

      {/* 4. Contact Shadows 
          This makes the character look "grounded" instead of floating.
      */}
      <ContactShadows 
        resolution={1024} 
        scale={10} 
        blur={2} 
        opacity={0.5} 
        far={1} 
        color="#000" 
      />

      {/* 5. Floating Dust / Camera Flashes 
          This creates the "Stadium Energy". 
      */}
      <Sparkles 
        count={200} 
        scale={10} 
        size={4} 
        speed={0.4} 
        opacity={0.5}
        color={mode === 'aggressive' ? '#E31937' : '#D4AF37'} // Red vs Gold
      />
      
      {/* 6. Spotlight (The "God Ray" on Virat) */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={mode === 'aggressive' ? 800 : 500} 
        color={mode === 'aggressive' ? '#ff0000' : '#ffffff'} 
        castShadow
      />
    </group>
  );
}