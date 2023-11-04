import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as auth from "./schema/auth";

export const schema = { ...auth };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
