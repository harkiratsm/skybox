import { auth } from "@/auth";
import { Header } from "@/components/(dashboard)/layout/header";
import { UserSchema } from "@repo/drizzle/schema/type";
import { redirect } from "next/navigation";
import React from "react";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    if (!session || !session?.user) {
        redirect("/signin");
    }

    return (
        <>
            <Header user={session?.user as UserSchema} />
            <main className="mt-4">{children}</main>
        </>
    );

}
