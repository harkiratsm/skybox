import { relations } from 'drizzle-orm';
import {serial, uuid, integer, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable("user",{
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    password: text("password"),
    created_at: timestamp("created_at"),
    updated_at: timestamp("updated_at"),
})

export const session = pgTable("session",{
    id: uuid("id").primaryKey(),
    user_id: integer("user_id"),
    token: text("token").unique(),
    expires : timestamp("expires"),
})            

export const userProfile = pgTable("user_profile",{
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: integer("user_id").notNull().unique(),
})

export const note = pgTable("note",{
    // we need created_at and updated_at
    id: serial("id"),
    title: text("title"),
    content: text("content"),
    user_id: serial("user_id"),
    created_at: timestamp("created_at"),
    updated_at: timestamp("updated_at"),
})

// export const userRelations = relations( user, {
//     sessions: many(session),
// })