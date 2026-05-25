import { defineConfig } from "drizzle-kit";
import { readFileSync } from "node:fs";

// Drizzle Kit doesn't auto-load .env.local. Parse it manually so
// `npm run db:push` and `db:studio` work without external dotenv deps.
function loadEnvLocal() {
  try {
    const raw = readFileSync(".env.local", "utf8");
    for (const line of raw.split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      const [, key, val] = m;
      if (process.env[key] != null) continue;
      process.env[key] = val.replace(/^"(.*)"$/, "$1");
    }
  } catch {
    // .env.local missing — fall through; user may have env from shell already
  }
}

loadEnvLocal();

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL_NON_POOLING ?? "";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  verbose: true,
  strict: true,
});
