import { z } from "zod";

export const ZDeleteAccountSchema = z.object({
    userId: z.string(),
});

export const ZUpdateProfileSchema = z.object({
    name: z.string(),
});