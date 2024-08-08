import { integer, jsonb, real, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const plagiarism = pgTable("plagiarism_scan", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  total_words: integer("total_words").notNull().default(0),
  identical_words: integer("identical_words").notNull().default(0),
  minor_changed_words: integer("minor_changed_words").notNull().default(0),
  related_meaning_words: integer("related_meaning_words").notNull().default(0),
  aggregated_score: real("aggregated_score").notNull().default(0.0),
  internet: jsonb("internet").default([]),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
