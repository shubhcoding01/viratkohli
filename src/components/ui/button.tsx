// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Preload } from '@react-three/drei';
// import { Suspense } from 'react';
// import { useStore } from '@/store/useStore';
// import ViratModel from '../canvas/ViratModel';
// import StadiumModel from '../canvas/StadiumModel';
// import PostProcessing from '../canvas/PostProcessing';

// export default function Scene() {
//   const { mode } = useStore();

//   return (
//     // 1. The 3D Window (Canvas)
//     // shadows: Enables realistic shadow calculations
//     // dpr: Device Pixel Ratio (Maintains sharpness on high-res screens)
//     // gl: Configures the renderer for cinematic colors
//     <div id="canvas-container" className="fixed inset-0 z-0">
//       <Canvas
//         shadows
//         dpr={[1, 2]} 
//         camera={{ position: [0, 2, 6], fov: 45 }}
//         gl={{ antialias: false }} // We let PostProcessing handle antialiasing
//       >
//         {/* 2. Controls 
//             enableZoom={false}: Prevents breaking the immersion
//             maxPolarAngle: Prevents the camera from going under the floor
//         */}
//         <OrbitControls 
//           enableZoom={false} 
//           enablePan={false} 
//           maxPolarAngle={Math.PI / 2 - 0.1} // Stop at ground level
//           autoRotate={mode === 'idle'} // Only rotate when idle
//           autoRotateSpeed={0.5}
//         />

//         {/* 3. The World 
//             Suspense waits for the 3D models to load before showing anything.
//             While loading, it shows 'null' (The LoadingScreen handles the UI).
//         */}
//         <Suspense fallback={null}>
//           <StadiumModel />
//           <ViratModel />
//           <PostProcessing />
          
//           {/* Preload assets so they don't pop in later */}
//           <Preload all />
//         </Suspense>

//       </Canvas>
//     </div>
//   );
// }

'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. DEFINE VARIANTS (The "Royal" Styles)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        // Default: Liquid Gold
        default: "bg-vk-gold text-black font-bold hover:bg-yellow-400 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] border border-yellow-300/50",
        
        // Glass: For secondary actions
        glass: "bg-white/10 text-white border border-white/10 hover:bg-white/20 backdrop-blur-md",
        
        // Outline: Gold Border
        outline: "border border-vk-gold/50 text-vk-gold hover:bg-vk-gold hover:text-black",
        
        // Ghost: Text only
        ghost: "hover:bg-white/10 hover:text-white text-gray-300",
      },
      size: {
        default: "h-10 px-8 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-10 text-base uppercase tracking-widest",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If 'asChild' is true, it renders as the child component (like a Next.js Link)
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }