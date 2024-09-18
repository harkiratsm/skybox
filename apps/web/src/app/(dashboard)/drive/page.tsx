// import { auth } from "@/auth";
import { Suspense } from "react";
import { DrivePageView } from "./drive-page-view";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllFiles } from "@repo/lib/server-specific/get-all-files";

export default async function DrivePage() {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/signin");
    }
    const initialFiles = await getAllFiles(session?.user?.id ?? '');
    return (
        <Suspense fallback="Loading...">
            <DrivePageView initialFiles={initialFiles} />
        </Suspense>
    );
}