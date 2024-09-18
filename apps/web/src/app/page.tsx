import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { AppCard } from "@/components/(dashboard)/app-card";
import { DriveCard } from "@/components/(dashboard)/drive-card";
import { Header } from "@/components/(dashboard)/layout/header";
import { NotesCards } from "@/components/(dashboard)/note-card";
import { ProfileCard } from "@/components/(dashboard)/profile-card";
import { getAllNotes } from "@repo/lib/server-specific/all-notes";
import { UserSchema } from "@repo/drizzle/schema/user";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }


  const notes = await getAllNotes({ userId: session?.user?.id ?? '' });
  // const drive = await getAllDrive({ userId: session?.user?.id ?? '' });
  return (
    <>
      <Header user={session.user as UserSchema} />
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {session?.user && <ProfileCard user={session.user as UserSchema} />}
          <NotesCards notes={notes} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <DriveCard />
          <AppCard />
        </div>
      </div>
    </>
  )
}