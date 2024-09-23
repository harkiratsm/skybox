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
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}
