// 'use client';

// import { EffectComposer, Bloom, Vignette, Glitch, Noise, ChromaticAberration } from '@react-three/postprocessing';
// import { GlitchMode, BlendFunction } from 'postprocessing';
// import * as THREE from 'three';
// import { useStore } from '@/store/useStore';

// export default function Effects() {
//   const { mode } = useStore();

//   return (
//     <EffectComposer disableNormalPass>
//       {/* 1. Bloom (The "God Aura") 
//           This makes the Gold bat and White jersey glow.
//       */}
//       <Bloom 
//         luminanceThreshold={1} // Only very bright things glow
//         mipmapBlur 
//         intensity={mode === 'aggressive' ? 2.0 : 1.2} 
//         radius={0.6}
//       />

//       {/* 2. Chromatic Aberration (The "Broadcast Lens" Effect)
//           Separates Red/Green/Blue channels slightly at the edges.
//           This makes it look like a real TV camera, not a 3D render.
//       */}
//       <ChromaticAberration 
//         offset={new THREE.Vector2(0.002, 0.002)} // Subtle shift
//         radialModulation={false}
//         modulationOffset={0}
//       />

//       {/* 3. Vignette (Cinematic Focus) 
//           Darkens the corners to draw eyes to the center (Virat).
//       */}
//       <Vignette 
//         offset={0.3} 
//         darkness={0.6} 
//         eskil={false} 
//         blendFunction={BlendFunction.NORMAL} 
//       />

//       {/* 4. Glitch Effect (The "Aggression") 
//           Only active when mode is 'aggressive' (RCB Mode).
//       */}
//       {mode === 'aggressive' && (
//         <Glitch 
//           delay={[0.5, 1.5]} 
//           duration={[0.1, 0.3]} 
//           strength={[0.2, 0.4]} 
//           mode={GlitchMode.SPORADIC} 
//           ratio={0.85} 
//         />
//       )}

//       {/* 5. Noise (Film Grain) 
//           Prevents color banding and adds texture.
//       */}
//       <Noise opacity={0.05} />
//     </EffectComposer>
//   );
// }


'use client';

import { 
  EffectComposer, 
  Bloom, 
  Vignette, 
  Glitch, 
  Noise, 
  ChromaticAberration,
  BrightnessContrast 
} from '@react-three/postprocessing';
// 👇 CRITICAL: Import enums from the core library
import { GlitchMode, BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function Effects() {
  const { mode } = useStore();

  return (
    <EffectComposer disableNormalPass multisampling={4}>
      
      {/* 1. CONTRAST (The "Netflix" Look) */}
      <BrightnessContrast
        brightness={0}
        contrast={0.1} // +10% Contrast for punchy visuals
      />

      {/* 2. CHROMATIC ABERRATION (Lens Imperfection) */}
      <ChromaticAberration 
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(
          mode === 'aggressive' ? 0.004 : 0.002, 
          mode === 'aggressive' ? 0.004 : 0.002
        )}
        radialModulation={false}
        modulationOffset={0}
      />

      {/* 3. BLOOM (The "God Aura") */}
      <Bloom 
        luminanceThreshold={1.1} 
        mipmapBlur 
        intensity={mode === 'aggressive' ? 2.0 : 1.2} 
        radius={0.6}
        levels={9}
      />

      {/* 4. VIGNETTE (Cinematic Focus) */}
      <Vignette 
        offset={0.3} 
        darkness={0.6} 
        eskil={false} 
        blendFunction={BlendFunction.NORMAL} 
      />

      {/* 5. GLITCH (The "Aggression") - FIXED & STABLE */}
      <Glitch 
        delay={[0.5, 1.5]} 
        duration={[0.1, 0.3]} 
        strength={[0.2, 0.4]} 
        mode={GlitchMode.SPORADIC} 
        ratio={0.85} 
        // 👇 USE 'active' PROP INSTEAD OF CONDITIONAL RENDERING
        active={mode === 'aggressive'} 
      />

      {/* 6. NOISE (Film Grain) */}
      <Noise 
        premultiply
        opacity={0.05} 
        blendFunction={BlendFunction.SOFT_LIGHT} // Blends better with dark backgrounds
      />

    </EffectComposer>
  );
}