import NoteEditor from "@/components/(dashboard)/notes/NoteEditor";
import { NotesSchema } from "@repo/drizzle/schema/type";
import { getNotebyId } from "@repo/lib/server-specific/get-note-by-id";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export type NotesPageProps = {
    params: {
        id: string;
    };
};

export default async  function NotesPage({ params }: NotesPageProps) {
    const { id } = params;

    if (!id) {
        redirect("/notes")
    }

    const note: NotesSchema = await getNotebyId({ id });

    return (
        <Suspense fallback="Loading...">
            <NoteEditor note={note} />
        </Suspense>
    );
}