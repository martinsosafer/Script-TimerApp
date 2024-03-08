import { z } from "zod";

import { and, asc, eq, ilike, like, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, TRPCError } from "../trpc";

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const thirtyDaysAgo = subDays(new Date(), 30);

      const usersWithCharacterCountLast30Days = await ctx.db
        .select({
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          created_at: schema.users.created_at,
          characterCountLast30Days: raw(
            "COALESCE(SUM(LENGTH(script)), 0) AS character_count_last_30_days",
          ),
        })
        .from(schema.users)
        .leftJoin(schema.scripts, function () {
          this.on(
            eq(schema.users.id, schema.scripts.userId),
            and(
              schema.scripts.created_at.gte(thirtyDaysAgo),
              schema.scripts.created_at.lt(new Date()),
            ),
          );
        })
        .groupBy("id");

      return usersWithCharacterCountLast30Days;
    } catch (error) {
      console.error("Error retrieving users with character count:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error retrieving users with character count",
      });
    }
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
  updateSubscription: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({ status: "ACTIVE" })
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
});
