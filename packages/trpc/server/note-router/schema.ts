import z from "zod";

export const ZCreateNoteSchema = z.object({
    title: z.string(),
    content: z.string(),
    folderId: z.string(),
});

export const ZDeleteNoteSchema = z.object({
    id: z.string(),
    folderId : z.string(),
});

export const ZGetNotesSchema = z.object({
    folderId: z.string(), 
});

export const ZGetNotesByIDSchema = z.object({
    id: z.string(),
});

export const ZUpdateNoteSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    folderId: z.string(),
});