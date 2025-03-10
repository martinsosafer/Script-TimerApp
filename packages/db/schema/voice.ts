import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const voiceType = pgEnum("voice_type", ["11LABS", "GOOGLE", "OTHER"]);
export const voiceGender = pgEnum("voice_gender", ["MALE", "FEMALE", "OTHER"]);

export const voices = pgTable("voice", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  external_id: text("external_id").notNull(),
  rank: integer("rank").notNull().default(0),
  active: boolean("active").notNull().default(false),
  type: voiceType("voice_type").notNull().default("OTHER"),
  gender: voiceGender("gender").notNull().default("OTHER"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  picture: text("picture"),
  metadata: jsonb("metadata"),
  favorite: boolean("favorite").default(false),
  celebrity: boolean("celebrity").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
