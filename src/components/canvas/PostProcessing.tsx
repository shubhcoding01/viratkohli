// 'use client';

// import { EffectComposer, Bloom, Vignette, Glitch, Noise } from '@react-three/postprocessing';
// import { GlitchMode, BlendFunction } from 'postprocessing';
// import { useStore } from '@/store/useStore';

// export default function PostProcessing() {
//   const { mode } = useStore();

//   return (
//     <EffectComposer disableNormalPass>
//       {/* 1. Bloom (The "God Aura") 
//           luminanceThreshold: Only very bright things (Gold/Neon) will glow.
//           intensity: How strong the glow is.
//       */}
//       <Bloom 
//         luminanceThreshold={1} 
//         mipmapBlur 
//         intensity={mode === 'aggressive' ? 2.5 : 1.5} // Glows harder in aggressive mode
//         radius={0.6}
//       />

//       {/* 2. Vignette (The "Camera Lens" Look) 
//           Darkens the corners to focus attention on Virat.
//       */}
//       <Vignette 
//         offset={0.3} 
//         darkness={0.6} 
//         eskil={false} 
//         blendFunction={BlendFunction.NORMAL} 
//       />

//       {/* 3. Glitch Effect (The "Aggression") 
//           Only active when mode is 'aggressive' (RCB Mode).
//           It looks like a corrupted TV signal.
//       */}
//       <Glitch 
//         delay={[0.5, 1.5]} 
//         duration={[0.1, 0.3]} 
//         strength={[0.2, 0.4]} 
//         mode={GlitchMode.SPORADIC} // Random glitches
//         active={mode === 'aggressive'} // ⚡ ONLY ACTIVE IN RED MODE
//         ratio={0.85} 
//       />

//       {/* 4. Noise (The "Film Grain") 
//           Adds a subtle gritty texture so it doesn't look too clean/fake.
//       */}
//       <Noise opacity={0.05} />
//     </EffectComposer>
//   );
// }

// 'use client';

// import { EffectComposer, Bloom, Vignette, Glitch, Noise } from '@react-three/postprocessing';
// import { GlitchMode, BlendFunction } from 'postprocessing';
// import { useStore } from '@/store/useStore';

// export default function PostProcessing() {
//   const { mode } = useStore();

//   return (
//     <EffectComposer disableNormalPass>
//       {/* 1. Bloom (The "God Aura") */}
//       <Bloom 
//         luminanceThreshold={1} 
//         mipmapBlur 
//         intensity={mode === 'aggressive' ? 2.5 : 1.5} 
//         radius={0.6}
//       />

//       {/* 2. Vignette (The "Camera Lens" Look) */}
//       <Vignette 
//         offset={0.3} 
//         darkness={0.6} 
//         eskil={false} 
//         blendFunction={BlendFunction.NORMAL} 
//       />

//       {/* 3. Glitch Effect (The "Aggression") 
//           FIX: We use conditional rendering `{ mode === ... && }` 
//           instead of an 'active' prop. 
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

//       {/* 4. Noise (The "Film Grain") */}
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
import { GlitchMode, BlendFunction } from 'postprocessing';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

export default function PostProcessing() {
  const { mode } = useStore();

  return (
    // multisampling={4} ensures edges remain sharp even with effects applied
    <EffectComposer disableNormalPass multisampling={4}>
      
      {/* 1. COLOR GRADING (The "Netflix" Look) 
           boosts contrast to make blacks deeper and gold shinier.
      */}
      <BrightnessContrast
        brightness={0}
        contrast={0.1} // +10% Contrast for punchy visuals
      />

      {/* 2. CHROMATIC ABERRATION (Lens Imperfection)
           Adds a subtle RGB split at the edges of the screen.
           Aggressive Mode = Stronger split (Disoriented/Chaos).
      */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // Use NORMAL to overlay correctly
        offset={new THREE.Vector2(
          mode === 'aggressive' ? 0.004 : 0.002, 
          mode === 'aggressive' ? 0.004 : 0.002
        )}
        radialModulation={false}
        modulationOffset={0}
      />

      {/* 3. BLOOM (The "God Aura") 
           luminanceThreshold: Only very bright things (Gold/Neon) will glow.
      */}
      <Bloom 
        luminanceThreshold={1.1} // Higher threshold so only PURE lights glow
        mipmapBlur 
        intensity={mode === 'aggressive' ? 2.0 : 1.2} 
        radius={0.6}
        levels={9} // Smoother blur gradient
      />

      {/* 4. VIGNETTE (Focus Center) 
           Darkens the corners to force the eye to look at Virat/Trophy.
      */}
      <Vignette 
        offset={0.3} 
        darkness={0.6} 
        eskil={false} 
        blendFunction={BlendFunction.NORMAL} 
      />

      {/* 5. GLITCH (The "Aggression") 
           Only renders when strictly necessary.
      */}
      {mode === 'aggressive' && (
        <Glitch 
          delay={[0.5, 1.5]} 
          duration={[0.1, 0.3]} 
          strength={[0.2, 0.4]} 
          mode={GlitchMode.SPORADIC} 
          ratio={0.85} 
        />
      )}

      {/* 6. NOISE (Texture) 
           Prevents "Color Banding" in the dark gradients.
      */}
      <Noise opacity={0.05} />
      
    </EffectComposer>
  );
}