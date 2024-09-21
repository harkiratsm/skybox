/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars  */

'use client';
import { useState, useCallback, useEffect } from 'react';
import { trpc } from "@repo/trpc/react";
import { CloudUpload } from "lucide-react";
import dynamic from 'next/dynamic';
import { NotesSchema } from "@repo/drizzle/schema/type";

const Editor = dynamic(() => import('./Editor'), { ssr: false });

// Move debounce to a separate utility file if used across multiple components
const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default function NoteEditor({note}: {note: NotesSchema}) {
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState(note?.content ?? '');
  const { mutateAsync: updateNote } = trpc.note.updateNote.useMutation();

  const handleEditorChange = useCallback(async (newContent: string) => {
    if (note && newContent !== content) {
      setIsSaving(true);
      try {
        await updateNote({
          id: note.id,
          title: note.title,
          content: newContent,
          folderId: note.folderId
        });
        setContent(newContent);
      } catch (error) {
        console.error('Failed to update note:', error);
      } finally {
        setIsSaving(false);
      }
    }
  }, [note, updateNote, content]);

  const debouncedHandleEditorChange = useCallback(
    debounce(handleEditorChange, 400),
    [handleEditorChange]
  );

  useEffect(() => {
    setContent(note?.content ?? '');
  }, [note]);

  if (!note || note.id === '') {
    return <div>Note not found</div>;
  }

  return (
    <div className="relative">
      <span className="flex self-end">
        <CloudUpload className="mr-2 text-primary" />
        {isSaving ? 'Saving...' : 'Saved'}
      </span>
      <Editor onChange={debouncedHandleEditorChange} initialContent={content} />
    </div>
  );
}