import { integer, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { BOOSTER_START_CREDITS } from "../../../apps/nextjs/src/constants/credits";
import { pgTable } from "./_table";
import { users } from "./auth";

export const status = pgEnum("status", ["ACTIVE", "INACTIVE", "COMPLETED"]);

export const clBooster = pgTable("cl_booster", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  credits: integer("credits")
    .notNull()
    .default(BOOSTER_START_CREDITS.PLAGIARISM),
  status: status("status").notNull().default("INACTIVE"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
