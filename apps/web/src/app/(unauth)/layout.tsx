import Image from "next/image";
import React from "react";

type UnauthLayoutProps = {
    children: React.ReactNode;
};

export default function UnauthLayout({ children }: UnauthLayoutProps) {
    return (
        <main className="flex flex-col relative min-h-screen items-center justify-center overflow-hidden">
            <div className="absolute -inset-[min(600px,max(400px,60vw))] -z-[1] flex items-center justify-center opacity-70">
                <Image 
                    src="/pattern2.png"
                    fill 
                    alt="background"
                    style={{
                        mask: 'radial-gradient(rgba(255, 255, 255, 1) 0%, transparent 80%)',
                        WebkitMask: 'radial-gradient(rgba(255, 255, 255, 1) 0%, transparent 80%)',
                    }}
                />
            </div>
            <div className="relative w-full flex items-center justify-center">
                {children}
            </div>
        </main>
    );
}