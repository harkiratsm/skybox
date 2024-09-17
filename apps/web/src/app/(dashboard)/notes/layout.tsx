import { auth } from "@/auth";
import NotesPageView from "@/components/(dashboard)/notes/NotesPageView";
import { findFolders } from "@repo/lib/server-specific/find-folder";
import { Suspense } from "react";

export default async function NotesLayout({children}: {children: React.ReactNode}) {
    const session = await auth(); 

    if (!session) {
        return null;
    }

    const initialFolders = await findFolders({ userId: session?.user?.id ?? "" });
    return (
        <Suspense fallback="Loading...">
            <NotesPageView initialFolders={initialFolders} >
             {children}
            </NotesPageView>
        </Suspense>
    );
}