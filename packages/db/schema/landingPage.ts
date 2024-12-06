import { pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const is_active = pgEnum("is_active", ["active", "inactive"]);
export const type = pgEnum("type", ["regular", "tools", "saasy"]);

export const landingPage = pgTable("landing_page", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  segment: text("segment").notNull(),
  title: text("title").notNull(),
  type: type("type").notNull().default("regular"),
  description: text("description").notNull(),
  video_url: text("video_url").notNull(),
  is_active: is_active("is_active").notNull().default("active"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
