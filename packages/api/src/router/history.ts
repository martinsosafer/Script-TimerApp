import { z } from "zod";

import { and, desc, eq, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const historyRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        credit_id: schema.credits.id,
        history_id: schema.generations.id,
        type: schema.credits.type,
        credits: schema.credits.credits,
        created_at: schema.generations.created_at,
        prompt: schema.generations.prompt,
        metadata: schema.generations.metadata,
      })
      .from(schema.generations) // Start from generations table
      .leftJoin(
        schema.credits,
        eq(schema.credits.generationId, schema.generations.id),
      )
      .where(eq(schema.generations.userId, ctx.session.user.id))
      .orderBy(desc(schema.generations.created_at)) // Order by generations' created_at only
      .limit(100);
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
