import { auth } from '@/auth';
import { findFolders } from '@repo/lib/server-specific/find-folder'
import { redirect } from 'next/navigation'

export default async function NotesPage() {
    const session = await auth(); 
    const folders = await findFolders({ userId: session?.user?.id ?? "" });


  if (folders && folders.length > 0) {
    redirect(`/notes/folder/${folders[0].id}`)
  }
  
  return <div /> 
}