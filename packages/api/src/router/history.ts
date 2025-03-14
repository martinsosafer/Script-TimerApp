import { z } from "zod";

import { and, desc, eq, schema, sql } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const historyRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        history_id: schema.generations.id,
        type: schema.generations.type,
        created_at: schema.generations.created_at,
        prompt: schema.generations.prompt,
        metadata: schema.generations.metadata,
        voice_name: sql<string>`CASE
        WHEN ${schema.generations.type} = 'GOOGLE' THEN ${schema.voices.name}
        ELSE ${schema.generations.metadata}->>'voice_actor' 
      END`.as("voice_name"),
      })
      .from(schema.generations)
      .leftJoin(
        schema.voices,
        and(
          eq(
            schema.voices.external_id,
            sql`${schema.generations.metadata}->>'voice_actor'`,
          ),
          eq(schema.generations.type, "GOOGLE"),
        ),
      )
      .where(eq(schema.generations.userId, ctx.session.user.id))
      .orderBy(desc(schema.generations.created_at));
  }),
  download: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: schema.generations.id,
          file: schema.generations.response,
        })
        .from(schema.generations)
        .where(
          and(
            eq(schema.generations.userId, ctx.session.user.id),
            eq(schema.generations.id, input.id),
          ),
        )
        .then((res) => res?.[0] ?? null);
    }),
});
