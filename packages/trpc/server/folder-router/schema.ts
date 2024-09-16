import z from "zod";

export const ZCreateFolderSchema = z.object({
    name: z.string(),
});

export const ZDeleteFolderSchema = z.object({
    id: z.string(),
});

export const ZUpdateFolderSchema = z.object({
    id: z.string(),
    name: z.string(),
});
