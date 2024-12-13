import { z } from "zod";

import { eq, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const landingsRouter = createTRPCRouter({
  listAllLandings: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.landingPage);
  }),
  getLanding: publicProcedure
    .input(
      z.object({
        segment: z.string().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.landingPage.findFirst({
        where: eq(schema.landingPage.segment, input.segment),
      });
    }),
});
