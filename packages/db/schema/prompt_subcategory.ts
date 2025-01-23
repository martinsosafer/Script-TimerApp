import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { promptCategory } from "./prompt_category";

export const promptSubcategory = pgTable("prompt_subcategory", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => promptCategory.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
