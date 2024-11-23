import { schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const promptsRouter = createTRPCRouter({
  listAllPrompts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.prompts);
  }),
});
