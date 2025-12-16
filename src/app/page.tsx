// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/dom/LoadingScreen';
import Navbar from '@/components/dom/Navbar';

// 1. Lazy Load the 3D Scene
// We use 'ssr: false' because 3D cannot be rendered on the server.
// This prevents the "window is not defined" error.
const Scene = dynamic(() => import('@/components/canvas/Scene'), { 
  ssr: false 
});

// 2. Import Sections
import Hero from '@/app/(sections)/Hero';
import Stats from '@/app/(sections)/Stats';
import Career from '@/app/(sections)/Career';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-vk-black">
      
      {/* LAYER 1: The UI Overlays (Fixed Top) */}
      <LoadingScreen />
      <Navbar />

      {/* LAYER 2: The 3D Background (Fixed Back) */}
      {/* We put this in a fixed container so it doesn't scroll away */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* LAYER 3: The Scrollable Content (Foreground) */}
      {/* We add 'relative z-10' so this sits ON TOP of the 3D canvas */}
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <Stats />
        <Career />
        
        {/* Footer / Copyright */}
        <footer className="w-full py-6 text-center text-white/20 font-heading tracking-widest text-sm">
          DESIGNED FOR THE KING. BUILT WITH NEXT.JS
        </footer>
      </div>

    </main>
  );
}