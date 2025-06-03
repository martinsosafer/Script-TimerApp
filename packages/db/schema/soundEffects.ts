import { relations } from "drizzle-orm";
import { primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const userRelations = relations(users, ({ many }) => ({
  userToSoundfx: many(userToSoundfx),
}));

export const soundfx = pgTable("soundfx", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  pathname: text("pathname").notNull(),
  url: text("url").notNull(),
  downloadurl: text("downloadurl").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const soundfxFavoriteRelations = relations(soundfx, ({ many }) => ({
  userToSoundfx: many(userToSoundfx),
}));

// Join Table
export const userToSoundfx = pgTable(
  "user_to_soundfx",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    soundfxId: uuid("soundfx_id")
      .notNull()
      .references(() => soundfx.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey(t.userId, t.soundfxId) }),
);

export const userToSoundfxRelations = relations(userToSoundfx, ({ one }) => ({
  soundfxFavorite: one(soundfx, {
    fields: [userToSoundfx.soundfxId],
    references: [soundfx.id],
  }),
  user: one(users, {
    fields: [userToSoundfx.userId],
    references: [users.id],
  }),
}));
