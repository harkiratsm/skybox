import { db, eq } from "@repo/drizzle";
import { notes } from "@repo/drizzle/schema/notes";

export async function getAllNotes({ userId }: { userId: string }) {
    return await db.select().from(notes).where(eq(notes.userId, userId));
}