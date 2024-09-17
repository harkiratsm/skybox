'use client';

import { trpc } from "@repo/trpc/react";
import Editor from "./Editor";
import { CloudUpload } from "lucide-react";

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function NoteEditor({noteId}: {noteId: string}) {
    const {data: note, isLoading} = trpc.note.getNotesByID.useQuery({id: noteId});
    const { mutateAsync: updateNote, isLoading: isSaving } = trpc.note.updateNote.useMutation()

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

  const debouncedHandleEditorChange = debounce(handleEditorChange, 400);

  if (isLoading) {
    return <div>Loading note...</div>
  }

  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <div className="relative">
      {isSaving && <span className="flex self-end"> <CloudUpload className="mr-2 text-primary" /> Saving </span>}
      <Editor onChange={debouncedHandleEditorChange} initialContent={note[0].content ?? ''} />
      
    </div>
  )
}