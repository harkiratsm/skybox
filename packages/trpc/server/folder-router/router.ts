import { procedure, router } from "../trpc";

import { db, eq } from "@repo/drizzle";
import { ZCreateFolderSchema, ZDeleteFolderSchema, ZUpdateFolderSchema } from "./schema";
import { folders } from "@repo/drizzle/schema/notes";
const { v4: uuidv4 } = require('uuid');


export const folderRouter = router({
    createFolder: procedure.input(ZCreateFolderSchema).mutation(async ({input, ctx}) => {
        try {
            return await db.insert(folders).values({
            id: uuidv4(),
                name: input.name,
                userId: ctx.session?.user?.id ?? "",
            }).returning()
        } catch (error) {
            console.error(error);
        }
    }),
    deleteFolder: procedure.input(ZDeleteFolderSchema).mutation(async ({input}) => {
        try {
            return await db.delete(folders).where(eq(folders.id, input.id));
        } catch (error) {
            console.error(error);
        }
    }),
    updateFolder: procedure.input(ZUpdateFolderSchema).mutation(async ({input}) => {
        try {
            return await db.update(folders).set({
                name: input.name,
            }).where(eq(folders.id, input.id));
        } catch (error) {
            console.error(error);
        }
    })
});