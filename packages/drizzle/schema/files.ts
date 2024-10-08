import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";


export const files = pgTable('files', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    url: text('url').notNull(),
    userId: text('user_id').references(() => users.id).notNull(),
    type: text('type').notNull(),
    size: text('size').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});