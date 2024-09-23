import { createSelectSchema } from "drizzle-zod";
import { folders, notes } from "./notes";
import { z } from "zod";
import { files } from "./files";
import { Authenticator, users } from "./user";


// Note Schema
export const ZNotesSchema = createSelectSchema(notes);

export type NotesSchema = z.infer<typeof ZNotesSchema>

export const ZFolderSchema = createSelectSchema(folders);

export type FolderSchema = z.infer<typeof ZFolderSchema>


// Files Schema 

const TFileSchema = createSelectSchema(files);

export type FileSchema = z.infer<typeof TFileSchema>;


// User Schema

export const ZUserSchema = createSelectSchema(users);

export type UserSchema = z.infer<typeof ZUserSchema>

export const ZAuthenticatorSchema = createSelectSchema(Authenticator);

export type AuthenticatorSchema = z.infer<typeof ZAuthenticatorSchema>
