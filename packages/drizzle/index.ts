import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env.local',
});

const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

const sql = neon(dbUrl!);
export const db = drizzle(sql);

export * from 'drizzle-orm';