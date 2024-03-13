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
        created_at: schema.credits.created_at,
        prompt: schema.generations.prompt,
        actor: schema.generations.actor,
        // file: schema.generations.response,
      })
      .from(schema.credits)
      .fullJoin(
        schema.generations,
        eq(schema.credits.generationId, schema.generations.id),
      )
      .where(and(eq(schema.credits.userId, ctx.session.user.id)))
      .orderBy(desc(schema.credits.created_at))
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
