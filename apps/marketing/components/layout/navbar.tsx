"use client";
import { ServerCrash } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ServerCrash className="h-6 w-6 text-primary" />
            <span className="font-bold text-primary text-lg sm:text-xl">Skybox</span>
          </Link>
            <Link href='https://skybox-web.vercel.app/signin' target="_blank" className="flex items-center">
              <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
                Login
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
};
