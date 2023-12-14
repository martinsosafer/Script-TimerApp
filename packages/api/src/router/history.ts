import { z } from "zod";

import { and, desc, eq, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const historyRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        credit_id: schema.credits.id,
        type: schema.credits.type,
        credits: schema.credits.credits,
        created_at: schema.credits.created_at,
        prompt: schema.generations.prompt,
        file: schema.generations.response,
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
});
