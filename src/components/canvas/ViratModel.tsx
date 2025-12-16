'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function ViratModel() {
  const group = useRef<THREE.Group>(null);
  const { mode } = useStore();
  
  // 1. Load the Real 3D Asset
  const { scene, animations, materials } = useGLTF('/models/virat-batting.glb');
  const { actions } = useAnimations(animations, group);

  // 2. Load the Jersey Texture (The RCB Kit)
  const rcbTexture = useTexture('/textures/jersey-rcb.jpg');
  rcbTexture.flipY = false; // Fixes upside-down textures on GLB models

  // 3. Apply the Jersey Texture Dynamically
  useEffect(() => {
    // Traverse the model to find the "TShirt" or "Body" mesh
    // NOTE: You might need to check your GLB in Blender to find the exact mesh name
    scene.traverse((child: any) => {
      if (child.isMesh && (child.name.includes('TShirt') || child.name.includes('Body'))) {
         child.material.map = rcbTexture; // Apply RCB Jersey
         child.material.needsUpdate = true;
      }
    });
  }, [scene, rcbTexture]);

  // 4. Animation Logic
  useEffect(() => {
    // Reset all animations
    Object.values(actions).forEach(action => action?.stop());
    
    if (actions['Batting']) {
      actions['Batting'].play(); // Assumes your GLB has an animation named 'Batting'
    }
  }, [actions]);

  return <primitive ref={group} object={scene} scale={1.5} position={[0, 0, 0]} />;
}

useGLTF.preload('/models/virat-batting.glb');