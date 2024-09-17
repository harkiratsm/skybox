import { z } from "zod";

export const ZCreateFilesSchema = z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.string(),
});