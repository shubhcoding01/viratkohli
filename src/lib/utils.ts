// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// /**
//  * Merges Tailwind CSS classes without conflicts.
//  * Example: cn("bg-red-500", isActive && "text-white")
//  */
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 1. THE CLASS MERGER (Standard)
 * Merges Tailwind classes intelligently.
 * Example: cn("px-2 py-2", "p-4") -> "p-4" (Handles conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 2. NUMBER FORMATTER (Advanced)
 * Converts big numbers into readable formats like 1.5M or 13.8K
 * Useful for your Stats Section if you ever fetch dynamic data.
 */
export function formatCompactNumber(number: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

/**
 * 3. CURRENCY FORMATTER
 * Useful if you add brand value or auction price stats later.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 4. ASYNC DELAY HELPER
 * Useful for sequencing animations in your Intro component.
 * Usage: await wait(2000); // Pauses code for 2 seconds
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 5. ABSOLUTE URL HELPER
 * Essential for SEO (Metadata) when sharing on Twitter/WhatsApp.
 * Ensures the image link works even on localhost.
 */
export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path; // Client-side
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`; // Vercel
  return `http://localhost:3000${path}`; // Localhost
}

/**
 * 6. DATE FORMATTER
 * Converts a date into a nice string: "March 22, 2025"
 */
export function formatDate(date: number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}