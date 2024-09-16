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
      <body className={cn(fontInter)}>
        <TrpcProvider>
        {children}
        </TrpcProvider>
        <Toaster />
      </body>
    </html>
  );
}
