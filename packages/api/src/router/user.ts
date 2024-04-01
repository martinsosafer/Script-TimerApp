import { z } from "zod";

import { and, asc, eq, ilike, like, schema, sql } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, TRPCError } from "../trpc";

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        name: schema.users.name,
        email: schema.users.email,
        id: schema.users.id,
        created_at: schema.users.created_at,
        status: schema.subscriptions.status,
        total_credits: sql`COALESCE(SUM(${schema.credits.credits}), 0)`,
      })
      .from(schema.users)
      .leftJoin(schema.subscriptions, (on) =>
        eq(schema.users.id, schema.subscriptions.userId),
      )
      .leftJoin(schema.credits, (on) =>
        eq(schema.users.id, schema.credits.userId),
      )
      .groupBy(
        schema.users.id,
        schema.users.name,
        schema.users.email,
        schema.users.created_at,
        schema.subscriptions.status,
      );
  }),

  giveSubscription: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5), // User ID to whom subscription is given
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Insert into subscriptions table with plan "STARTER" and status "ACTIVE"
        await ctx.db
          .insert(schema.subscriptions)
          .values({
            userId: input.userId,
            plan: "STARTER",
            status: "ACTIVE",
          })
          .execute();

        return { success: true };
      } catch (error) {
        console.error("Error giving subscription:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error giving subscription",
        });
      }
    }),
  cancelSubscription: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({ status: "CANCELLED" })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        return { success: true };
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error cancelling subscription",
        });
      }
    }),
  updateStudent: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({ status: "STUDENT" })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        return { success: true };
      } catch (error) {
        console.error("Error updating subscription:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating subscription",
        });
      }
    }),
  updateCreator: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({ status: "CREATOR" })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        return { success: true };
      } catch (error) {
        console.error("Error updating subscription:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating subscription",
        });
      }
    }),
  giveFreeTrial: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5), // User ID to whom free trial is given
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({ status: "FREE_TRIAL" })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        return { success: true };
      } catch (error) {
        console.error("Error giving free trial:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error giving free trial",
        });
      }
    }),
});
