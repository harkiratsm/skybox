import { db, eq } from "@repo/drizzle";
import { folders } from "@repo/drizzle/schema/notes";


export  async function findFolders({ userId }: { userId: string }) {
    return await db.select().from(folders).where(eq(folders.userId, userId));
}