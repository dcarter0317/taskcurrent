import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskCurrent | Workflow automation for growing businesses",
  description:
    "TaskCurrent connects the tools you already use and automates repetitive work like lead follow-up, reminders, and onboarding.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
   <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased motion-safe:scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
  >
      <body className="min-h-full flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
