import { db, eq } from "@repo/drizzle";
import { notes } from "@repo/drizzle/schema/notes";

export async function getNotebyId({ id }: { id: string }) {
    const res = await db.select().from(notes).where(eq(notes.id, id));
    return res[0];
}