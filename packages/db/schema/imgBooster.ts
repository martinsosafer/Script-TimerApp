import { integer, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const status = pgEnum("status", ["active", "inactive", "used"]);

export const imgBooster = pgTable("img_booster", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  credits: integer("credits").notNull().default(300),
  // status: status("status").notNull().default("inactive"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
