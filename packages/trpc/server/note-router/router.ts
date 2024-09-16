import { procedure, router } from "../trpc";
import { ZCreateNoteSchema, ZDeleteNoteSchema, ZGetNotesByIDSchema, ZGetNotesSchema, ZUpdateNoteSchema } from "./schema";
import { and, db, eq } from "@repo/drizzle";
import {notes} from "@repo/drizzle/schema/notes";
const { v4: uuidv4 } = require('uuid');


export const noteRouter = router({
    createNote: procedure.input(ZCreateNoteSchema).mutation(async ({input, ctx}) => {
        try {
            return await db.insert(notes).values({
                id: uuidv4(),
                title: input.title,
                content: input.content,
                folderId: input.folderId,
                userId: ctx.session?.user?.id ?? "",
            }).returning()
        } catch (error) {
            console.error(error);
        }
    }),
    deleteNote: procedure.input(ZDeleteNoteSchema).mutation(async ({input, ctx}) => {
        try {
            return await db.delete(notes).
            where(
                and(
                  eq(notes.id, input.id),
                  eq(notes.folderId, input.folderId),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              )
        } catch (error) {
            console.error(error);
        }
    }),
    getNotes: procedure.input(ZGetNotesSchema).query(async ({input, ctx}) => {
        try {
            return await db.select().from(notes).where(
                and(
                  eq(notes.folderId, input.folderId),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              );
        } catch (error) {
            console.error(error);
        }
    }),
    getNotesByID: procedure.input(ZGetNotesByIDSchema).query(async ({input, ctx}) => {
        try {
            return await db.select().from(notes).where(
                and(
                  eq(notes.id, input.id),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              );
        } catch (error) {
            console.error(error);
        }
    }),
    updateNote: procedure.input(ZUpdateNoteSchema).mutation(async ({input, ctx}) => {
        try {
            return await db.update(notes).set({
                title: input.title,
                content: input.content,
                folderId: input.folderId,
            }).where(
                and(
                  eq(notes.id, input.id),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              );
        } catch (error) {
            console.error(error);
        }
    })
});