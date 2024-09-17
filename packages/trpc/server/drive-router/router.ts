import { files } from "@repo/drizzle/schema/files";
import { procedure, router } from "../trpc";
import { ZCreateFilesSchema } from "./schema";
import { db } from "@repo/drizzle";
const { v4: uuidv4 } = require('uuid');

export const fileRouter = router({
    createFiles: procedure.input(ZCreateFilesSchema).mutation(async ({input, ctx}) => {
        try {
            return await db.insert(files).values({
                id: uuidv4(),
                name: input.name,
                url: input.url,
                type: input.type,
                size: input.size,
                userId: ctx.session?.user?.id ?? "",
            }).returning()
        } catch (error) {
            console.error(error);
        }
    })
})