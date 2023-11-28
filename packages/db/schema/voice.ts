import {
  boolean,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const voiceType = pgEnum("voice_type", ["11LABS", "OTHER"]);

export const voices = pgTable("voice", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  external_id: text("external_id").notNull(),
  active: boolean("active").notNull().default(false),
  type: voiceType("voice_type").notNull().default("OTHER"),
  name: text("name"),
  picture: text("picture"),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
