// import { auth } from "@/auth";
import { Suspense } from "react";
import { DrivePageView } from "./drive-page-view";

export default async function DrivePage() {
    // const session = await auth();
    // const drives = await findDrives({ userId: session?.user?.id ?? "" });
    return (
        <Suspense fallback="Loading...">
            <DrivePageView  />
        </Suspense>
    );
}