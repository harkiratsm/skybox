import { SettingsNav } from "@/components/(dashboard)/settings/navigation";
import React from "react";

export type SettingsLayoutProps = {
    children: React.ReactNode;
};


export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="mx-auto w-full px-4 md:px-8 max-w-screen-lg">
            <h1 className="text-3xl font-semibold">
                Settings 
            </h1>
            <div className="grid grid-cols-12 mt-4 gap-x-8 md:mt-8">
                <SettingsNav className="hidden md:flex md:col-span-3" />
                <div className="col-span-12 md:col-span-9">{children}</div>
            </div>
        </div>
    );
}