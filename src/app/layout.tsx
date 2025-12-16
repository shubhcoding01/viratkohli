import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
// @ts-ignore: allow importing global css
import "./globals.css"; 
import { cn } from "@/lib/utils"; // Ensure this points to your utils file

// 1. Configure "Jersey Number" Font (Headings)
const bebas = Bebas_Neue({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-bebas" 
});

// 2. Configure "Body" Font (Reading Text)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter" 
});

// 3. SEO Metadata (The "Social Card" Setup)
export const metadata: Metadata = {
  title: {
    default: "Virat Kohli | The King's Arena",
    template: "%s | VK18"
  },
  description: "An immersive 3D experience celebrating the G.O.A.T of Cricket. Journey through the records, the aggression, and the legacy.",
  keywords: ["Virat Kohli", "Cricket", "3D Website", "Three.js", "React", "Next.js", "RCB", "India"],
  authors: [{ name: "Your Name" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://virat-3d.vercel.app", // Replace with your actual URL later
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

// 4. Viewport Settings (Crucial for 3D Mobile Performance)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental pinch-zoom breaking the 3D view
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide"> 
      {/* ADVANCED STYLING CLASSES:
         - selection:bg-vk-gold: Highlights text in Gold.
         - selection:text-black: Highlighted text turns Black for contrast.
         - scrollbar-hide: We hide the default ugly browser scrollbar (add this utility in globals.css or install 'tailwind-scrollbar-hide').
         - antialiased: Makes fonts crisp.
      */}
      <body className={cn(
        bebas.variable, 
        inter.variable, 
        "antialiased bg-vk-black text-white selection:bg-vk-gold selection:text-vk-black overflow-x-hidden"
      )}>
        {children}
      </body>
    </html>
  );
}