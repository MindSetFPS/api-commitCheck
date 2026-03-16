import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './server/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,  // <-- cambia connectionString por url
  },
} satisfies Config;