
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uniqueIndex,
  boolean
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"
import { genId } from "../utils";


  
export const users = pgTable('user', {
  id: text('id').notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image')
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull()
})


export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
)

export const Authenticator = pgTable(
  'authenticator',
  {
    id: text('id')
      .notNull()
      .primaryKey()
      .$defaultFn(() => genId('ath')),
    credentialID: text('credentialId').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    userIdIdx: uniqueIndex('Authenticator_credentialID_key').on(authenticator.credentialID),
  }),
)

