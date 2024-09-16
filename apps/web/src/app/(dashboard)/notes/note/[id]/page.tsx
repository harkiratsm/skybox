import Editor from "@/components/(dashboard)/notes/Editor";
import NoteEditor from "@/components/(dashboard)/notes/NoteEditor";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export type NotesPageProps = {
    params: {
        id: string;
    };
};

export default function NotesPage({params}: NotesPageProps) {
    const { id } = params;

    if (!id) {
        redirect("/notes")
    }

    return (
        <Suspense fallback="Loading...">
            <NoteEditor noteId={id} />
        </Suspense>
    );
}