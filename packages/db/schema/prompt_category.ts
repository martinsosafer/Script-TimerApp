import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const promptCategory = pgTable("prompt_category", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
