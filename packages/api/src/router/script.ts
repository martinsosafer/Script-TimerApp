import { z } from "zod";

import { and, desc, eq, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const scriptRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: schema.scripts.id,
        name: schema.scripts.name,
        // Could be problematic to return long text in a long list. Commenting out for now until we need it
        // Solution is to pass in fields as an argument at some point
        // script: schema.scripts.script,
      })
      .from(schema.scripts)
      .where(and(eq(schema.scripts.userId, ctx.session.user.id)))
      .orderBy(desc(schema.scripts.created_at))
      .limit(100);
  }),
  get: protectedProcedure
    .input(
      z.object({
        id: z.string().min(5),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: schema.scripts.id,
          name: schema.scripts.name,
          script: schema.scripts.script,
        })
        .from(schema.scripts)
        .where(
          and(
            eq(schema.scripts.userId, ctx.session.user.id),
            eq(schema.scripts.id, input.id),
          ),
        )
        .then((res) => res?.[0] ?? null);
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        script: z.string().min(1).max(10000).optional().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(schema.scripts)
        .values({
          userId: ctx.session.user.id,
          name: input.name,
          type: "11LABS",
          script: input.script,
        })
        .returning()
        .then((res) => res?.[0]);
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(5),
        name: z.string().min(1).max(100).optional(),
        script: z.string().min(1).max(10000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(schema.scripts)
        .set({
          name: input.name,
          script: input.script,
        })
        .where(
          and(
            eq(schema.scripts.userId, ctx.session.user.id),
            eq(schema.scripts.id, input.id),
          ),
        )
        .returning()
        .then((res) => res?.[0]);
    }),
});
