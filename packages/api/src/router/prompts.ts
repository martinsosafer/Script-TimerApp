import { schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const promptsRouter = createTRPCRouter({
  listAllPrompts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.prompts);
  }),
  listAllPromptCategories: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.promptCategory);
  }),
  listAllPromptSunCategories: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.promptSubcategory);
  }),
});
