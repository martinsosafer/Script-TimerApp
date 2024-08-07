import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as auth from "./schema/auth";
import * as credit from "./schema/credit";
import * as generation from "./schema/generation";
import * as plagiarism from "./schema/plagiarism";
import * as script from "./schema/script";
import * as subscription from "./schema/subscription";
import * as voice from "./schema/voice";

export const schema = {
  ...auth,
  ...credit,
  ...generation,
  ...script,
  ...subscription,
  ...voice,
  ...plagiarism,
};

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
