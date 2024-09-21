import { z } from "zod";
import { procedure, router } from "../trpc";
import { ZCreateNoteSchema, ZDeleteNoteSchema, ZGetNotesByIDSchema, ZGetNotesSchema, ZUpdateNoteSchema } from "./schema";
import { and, db, eq } from "@repo/drizzle";
import { NotesSchema, ZNotesSchema} from "@repo/drizzle/schema/type";
import { notes } from "@repo/drizzle/schema/notes";
const { v4: uuidv4 } = require('uuid');

export const noteRouter = router({
    createNote: procedure.meta({
        openapi: {
            method: "POST",
            path: "/notes",
            summary: "Create a note",
            tags: ["note"],
        }
    }).input(ZCreateNoteSchema).output(z.array(ZNotesSchema)).mutation(async ({input, ctx}) => {
        try {
             return await db.insert(notes).values({
                id: uuidv4(),
                title: input.title,
                content: input.content, 
                folderId: input.folderId,
                userId: ctx.session?.user?.id ?? "",
            }).returning() as NotesSchema[];
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create note");
        }
    }),
    deleteNote: procedure.meta({
        openapi: {
            method: "DELETE",
            path: "/notes/{id}",
            summary: "Delete a note",
            tags: ["note"],
        }
    }).input(ZDeleteNoteSchema).output(ZNotesSchema).mutation(async ({input, ctx}) => {
        try {
            const res = await db
              .delete(notes)
              .where(
                and(
                  eq(notes.id, input.id),
                  eq(notes.folderId, input.folderId),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              ).returning();
            return res[0] as NotesSchema;
          } catch (error) {
            console.error(error);
            throw new Error("Failed to delete note");
          }
    }),
    getNotes: procedure.meta({
        openapi: {
            method: "GET",
            path: "/notes/folder/{folderId}",
            summary: "Get all notes",
            tags: ["note"],
        }
    }).input(ZGetNotesSchema).output(z.array(ZNotesSchema)).query(async ({input, ctx}) => {
        try {
            const result = await db.select().from(notes).where(
                and(
                  eq(notes.folderId, input.folderId),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              );
            return result as NotesSchema[];
        } catch (error) {
            console.error(error);
            throw new Error("Failed to get notes");
        }
    }),
    getNotesByID: procedure.meta({
        openapi: {
            method: "GET",
            path: "/notes/{id}",
            summary: "Get a note by ID",
            tags: ["note"],
        }
    }).
    input(ZGetNotesByIDSchema).output(ZNotesSchema).query(async ({input, ctx}) => {
        try {
            const result = await db.select().from(notes).where(
                and(
                  eq(notes.id, input.id),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              )
            return result[0] as NotesSchema;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to get note by ID");
        }
    }),
    updateNote: procedure.meta({
        openapi: {
            method: "PUT",
            path: "/notes/{id}",
            summary: "Update a note",
            tags: ["note"],
        }
    }).input(ZUpdateNoteSchema).output(ZNotesSchema).mutation(async ({input, ctx}) => {
        try {
            const result = await db.update(notes).set({
                title: input.title,
                content: input.content,
                folderId: input.folderId,
            }).where(
                and(
                  eq(notes.id, input.id),
                  eq(notes.userId, ctx.session?.user?.id ?? "")
                )
              ).returning();
            return result[0] as NotesSchema;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update note"); 
        }
    })
});