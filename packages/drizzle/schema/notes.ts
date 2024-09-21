import { pgTable, text, timestamp} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user';


export const folders = pgTable('folders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const notes = pgTable('notes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  content: text('content'),
  userId: text('user_id').references(() => users.id).notNull(),
  folderId: text('folder_id').references(() => folders.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});


export const folderRelations = relations(folders, ({ many, one }) => ({
  notes: many(notes),
  user: one(users, {
    fields: [folders.userId],
    references: [users.id]
  })
}));

export const noteRelations = relations(notes, ({ one }) => ({
  folder: one(folders, {
    fields: [notes.folderId],
    references: [folders.id]
  }),
  user: one(users, {
    fields: [notes.userId],
    references: [users.id]
  })
}));




