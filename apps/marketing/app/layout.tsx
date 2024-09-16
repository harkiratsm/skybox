import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SkyBox",
  description: "Save your files, notes, and bookmarks in one place",
};
const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}
