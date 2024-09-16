import { auth } from "@/auth";
import NotesPageView from "@/components/(dashboard)/notes/NotesPageView";
import { findFolders } from "@repo/lib/server-specific/find-folder";
import { Suspense } from "react";

export default async function NotesLayout({children}: {children: React.ReactNode}) {
    const session = await auth(); 
    const folders = await findFolders({ userId: session?.user?.id ?? "" });
    return (
        <Suspense fallback="Loading...">
            <NotesPageView folders={folders} >
             {children}
            </NotesPageView>
        </Suspense>
    );
}