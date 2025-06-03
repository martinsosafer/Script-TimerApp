import { integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { BOOSTER_START_CREDITS } from "../../../apps/nextjs/src/constants/credits";
import { pgTable } from "./_table";
import { users } from "./auth";

export const clBooster = pgTable("cl_booster", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  credits: integer("credits")
    .notNull()
    .default(BOOSTER_START_CREDITS.PLAGIARISM),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
