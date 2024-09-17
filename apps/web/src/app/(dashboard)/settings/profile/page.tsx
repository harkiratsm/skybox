import { auth } from "@/auth";
import { SettingHeader } from "@/components/(dashboard)/settings/header";
import { DeleteAccount } from "@/components/(dashboard)/settings/profile/profile-delete";
import { ProfileForm } from "@/components/(dashboard)/settings/profile/profile-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Profile",
}

export default async function ProfilePage() {
    const session = await auth();

    return (
        <>
            <SettingHeader title="Profile" subtitle="Update your profile information." />

            <ProfileForm className="mb-8 max-w-xl" user={session?.user} />

            <hr className="my-4 max-w-xl" />
            <DeleteAccount className="max-w-xl" user={session?.user}/>
        </>
    )

}