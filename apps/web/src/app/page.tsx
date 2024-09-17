import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CloudIcon, FileTextIcon, ImageIcon, LayoutGridIcon, PencilIcon, UserIcon, FileIcon } from "lucide-react"
import { Header } from "@/components/(dashboard)/layout/header";
import { AppCard } from "@/components/(dashboard)/app-card";
import { NotesCards } from "@/components/(dashboard)/note-card";
import {getAllNotes} from "@repo/lib/server-specific/all-notes"
import { ProfileCard } from "@/components/(dashboard)/profile-card";
import { DriveCard } from "@/components/(dashboard)/drive-card";
import Image from "next/image";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
      redirect("/signin");
  }

  

  const notes = await getAllNotes({ userId: session?.user?.id ?? '' });
  // const drive = await getAllDrive({ userId: session?.user?.id ?? '' });
  return (
    <>
      <Header user={session.user} />
        <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {session?.user && <ProfileCard user={session.user as any} />}
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