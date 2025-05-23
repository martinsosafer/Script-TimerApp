import { sql } from "drizzle-orm";
import { pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const status = pgEnum("status", ["ACTIVE", "INACTIVE", "COMPLETED"]);

export const masterclassBooster = pgTable("masterclass_booster", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  valid_until: timestamp("valid_until", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP + interval '1 year'`),
  status: status("status").notNull().default("INACTIVE"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
