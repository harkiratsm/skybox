import { procedure, router } from "../trpc";

import { and, db, eq } from "@repo/drizzle";
import { ZCreateFolderSchema, ZDeleteFolderSchema, ZUpdateFolderSchema } from "./schema";
import { folders } from "@repo/drizzle/schema/notes";
import { FolderSchema, ZFolderSchema } from "@repo/drizzle/schema/type";
const { v4: uuidv4 } = require('uuid');


export const folderRouter = router({
    createFolder: procedure.meta({
        openapi: {
            method: "POST",
            path: "/trpc/folders",
            summary: "Create a folder",
            tags: ["folder"],
        }
    }).input(ZCreateFolderSchema).output(ZFolderSchema).mutation(async ({input, ctx}) => {
        try {
            const result = await db.insert(folders).values({
            id: uuidv4(),
                name: input.name,
                userId: ctx.session?.user?.id ?? "",
            }).returning();
            return result[0] as FolderSchema;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }),
    deleteFolder: procedure.meta({
        openapi: {
            method: "DELETE",
            path: "/trpc/folders/{id}",
            summary: "Delete a folder",
            tags: ["folder"],
        }
    }).input(ZDeleteFolderSchema).output(ZFolderSchema).mutation(async ({input, ctx}) => {
        try {
            const res = await db.delete(folders).where(
                and(eq(folders.userId, ctx.session?.user?.id ?? ""), eq(folders.id, input.id))
            ).returning();
            return res[0] as FolderSchema
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete folder");
        }
    }),
    updateFolder: procedure.meta({
        openapi: {
            method: "PUT",
            path: "/trpc/folders/{id}",
            summary: "Update a folder",
            tags: ["folder"],
        }
    }).input(ZUpdateFolderSchema).output(ZFolderSchema).mutation(async ({input}) => {
        try {
            const result = await db.update(folders).set({
                name: input.name,
            }).where(eq(folders.id, input.id)).returning();
            return result[0] as FolderSchema;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update folder");
        }
    })
});