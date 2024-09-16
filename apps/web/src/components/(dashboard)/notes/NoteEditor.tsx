'use client';

import { trpc } from "@repo/trpc/react";
import Editor from "./Editor";

export default function NoteEditor({noteId}: {noteId: string}) {
    const {data: note, isLoading} = trpc.note.getNotesByID.useQuery({id: noteId});
    const { mutateAsync: updateNote } = trpc.note.updateNote.useMutation()

  const handleEditorChange = async (content: string) => {
    if (note) {
      try {
        await updateNote({
          id: note[0].id,
          title: note[0].title,
          content: content,
          folderId: note[0].folderId
        })
      } catch (error) {
        console.error('Failed to update note:', error)
      }
    }
  }

  if (isLoading) {
    return <div>Loading note...</div>
  }

  if (!note) {
    return <div>Note not found</div>
  }

  return <Editor onChange={handleEditorChange} initialContent={note[0].content ?? ''} />
}