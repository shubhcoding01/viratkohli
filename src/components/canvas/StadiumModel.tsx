'use client';

import { Sparkles, Environment, ContactShadows, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StadiumModel() {
  const { mode } = useStore();
  const { scene } = useThree();
  const flashRef = useRef<THREE.PointLight>(null);

  // 1. DYNAMIC ATMOSPHERE (Fog & Background)
  useEffect(() => {
    // Mode Logic:
    // Idle = Deep Black/Gold (Classy)
    // Aggressive = RCB Red/Dark (Intense)
    const targetColor = mode === 'aggressive' ? new THREE.Color('#2a0a0a') : new THREE.Color('#050505');
    const fogDensity = mode === 'aggressive' ? 0.05 : 0.02;

    // Smooth transition for background color would require a lerp loop, 
    // but direct assignment is okay for scene background.
    scene.background = targetColor;
    // Exponential fog looks more realistic than linear fog
    scene.fog = new THREE.FogExp2(targetColor.getHexString(), fogDensity);
  }, [mode, scene]);


  // 2. CROWD CAMERA FLASH EFFECT
  // Randomly flickers a light to simulate stadium photography
  useFrame((state) => {
    if (flashRef.current) {
      // 1% chance to flash every frame
      if (Math.random() > 0.98) {
        flashRef.current.intensity = 200 + Math.random() * 300;
        // Random position for the flash
        flashRef.current.position.set(
           (Math.random() - 0.5) * 40,
           5 + Math.random() * 10,
           -10 + (Math.random() - 0.5) * 10
        );
      } else {
        // Fade out quickly
        flashRef.current.intensity = THREE.MathUtils.lerp(flashRef.current.intensity, 0, 0.2);
      }
    }
  });

  return (
    <group>
      {/* 3. REFLECTIVE FLOOR (The "Wet Pitch" Look) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]} // Blur ground reflections (width, height)
          resolution={1024} // Texture resolution
          mixBlur={1} // How much blur mixes with surface
          mixStrength={40} // Strength of the reflection
          roughness={1} // Surface roughness
          depthScale={1.2} // Scale the depth factor
          minDepthThreshold={0.4} // Lower edge for the depth texture
          maxDepthThreshold={1.4} // Upper edge for the depth texture
          color="#151515" // Base color of the floor
          metalness={0.5}
          mirror={0.5} // Mirror intensity
        />
      </mesh>

      {/* 4. REALISTIC SHADOWS */}
      <ContactShadows 
        resolution={1024} 
        scale={10} 
        blur={2.5} 
        opacity={0.6} 
        far={1.2} 
        color="#000" 
      />

      {/* 5. STADIUM PARTICLES (Dust/Confetti) */}
      <Sparkles 
        count={300} 
        scale={12} 
        size={3} 
        speed={0.2} 
        opacity={0.7}
        color={mode === 'aggressive' ? '#E31937' : '#D4AF37'} // Red vs Gold
        noise={0.5} // Adds turbulence
      />

      {/* 6. DISTANT STARS (The Night Sky) */}
      {/* Adds depth to the black void */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 7. LIGHTING RIG */}
      
      {/* A. The "God Ray" Spotlight (Main Key Light) */}
      <spotLight 
        position={[5, 8, 5]} 
        angle={0.2} 
        penumbra={1} 
        intensity={mode === 'aggressive' ? 800 : 500} 
        color={mode === 'aggressive' ? '#ff4d4d' : '#ffffff'} 
        castShadow
        shadow-bias={-0.0001}
      />

      {/* B. Rim Light (Backlight) - Separates Virat from background */}
      <spotLight 
        position={[-5, 5, -5]} 
        angle={0.5} 
        intensity={300} 
        color="#D4AF37" // Gold Rim
      />

      {/* C. The Camera Flash Light Source */}
      <pointLight ref={flashRef} color="white" distance={50} decay={2} />

      {/* D. Environment Map (Reflections) */}
      <Environment preset="city" blur={1} />
    </group>
  );
}