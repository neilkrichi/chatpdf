import { defineConfig } from 'drizzle-kit'
import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({ path: ".env"});

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
});