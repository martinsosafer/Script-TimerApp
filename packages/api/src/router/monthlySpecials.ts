import { schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const monthlySpecialsRouter = createTRPCRouter({
  listAllSpecials: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.monthlySpecials);
  }),
});
