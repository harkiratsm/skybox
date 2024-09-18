import { db, eq } from "@repo/drizzle";
import { files } from "@repo/drizzle/schema/files";

export const getAllFiles = async (userId: string) => {
    return await db.select().from(files).where(eq(files.userId, userId));
}