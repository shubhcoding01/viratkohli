import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Cinzel } from "next/font/google";
// @ts-ignore: allow importing global css
import "./globals.css"; 
import { cn } from "@/lib/utils"; 
import SmoothScrolling from "@/components/dom/SmoothScroll"; // Import our Provider

// Font A: Sporty / Jersey Headings
const bebas = Bebas_Neue({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-bebas" 
});

// Font B: Clean Reading Text
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter" 
});

// Font C: The Royal / Cinematic Text
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel"
});

export const metadata: Metadata = {
  title: {
    default: "Virat Kohli | The King's Arena",
    template: "%s | VK18"
  },
  description: "An immersive cinematic experience celebrating the G.O.A.T of Cricket. Journey through the records, the aggression, and the legacy.",
  keywords: ["Virat Kohli", "Cricket", "3D Website", "Three.js", "React", "Next.js", "RCB", "India"],
  authors: [{ name: "Shubham Raj" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://virat-3d.vercel.app",
    title: "Virat Kohli | The King's Arena",
    description: "Experience the G.O.A.T in 3D.",
    siteName: "The King's Arena",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virat Kohli 3D Experience",
    description: "The King. The Era. The Records.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide scroll-smooth"> 
      <body className={cn(
        bebas.variable, 
        inter.variable, 
        cinzel.variable,
        "antialiased bg-[#050505] text-white selection:bg-vk-gold selection:text-black overflow-x-hidden"
      )}>
        
        {/* --- GLOBAL FILM GRAIN --- */}
        <div 
          className="fixed inset-0 z-[9999] opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` 
          }}
        />

        {/* 1. WRAP APP IN SMOOTH SCROLL PROVIDER */}
        <SmoothScrolling>
          <main className="relative z-0">
              {children}
          </main>
        </SmoothScrolling>
        
      </body>
    </html>
  );
}