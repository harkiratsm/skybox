import type { Metadata } from "next";
import "./globals.css";

import {Inter} from 'next/font/google'

import { TrpcProvider } from "@repo/trpc/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontInter = Inter({subsets: ['latin'], variable: "--font-sans" });


export const metadata: Metadata = {
  title: "Skybox",
  description: "Save your files, notes, and bookmarks in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"/>
      </head> 
      <body className={cn(fontInter)}>
        <TrpcProvider>
        {children}
        </TrpcProvider>
        <Toaster />
      </body>
    </html>
  );
}
