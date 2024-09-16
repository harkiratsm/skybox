
import * as dotenv from 'dotenv';
import {defineConfig} from 'drizzle-kit';

dotenv.config({
  path: '.env.local',
});

export default defineConfig({
    schema: "./schema/*",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    },
});