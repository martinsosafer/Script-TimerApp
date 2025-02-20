import { integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const imgCredit = pgTable("img_credit", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  credits: integer("credits").notNull().default(10),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
