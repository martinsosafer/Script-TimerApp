import { z } from "zod";

import { db, eq, schema, sql } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

import { createTRPCRouter, protectedProcedure, TRPCError } from "../trpc";

//Function to update the credits
async function updateUserCredits(
  userId: string,
  planCredits: {
    elevenLabsCredits: number;
    openAiCredits: number;
  },
) {
  const { elevenLabsCredits, openAiCredits } = planCredits;
  try {
    const existingCredit = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    if (existingCredit) {
      // Update the existing credits
      await db
        .update(elevenLabsCredit)
        .set({
          credits: elevenLabsCredits,
          updated_at: new Date(),
        })
        .where(eq(elevenLabsCredit.userId, userId))
        .execute();

      console.log("Credits updated successfully for user:", userId);
    } else {
      // Insert new credits if they don't exist
      await db.insert(elevenLabsCredit).values({
        userId: userId,
        credits: elevenLabsCredits,
        updated_at: new Date(),
      });

      console.log(
        "Credits initialized and updated successfully for user:",
        userId,
      );
    }

    const openAiCredit = await db.query.openAiCredit.findFirst({
      where: eq(schema.openAiCredit.userId, userId),
    });

    console.log("OPENAICREDIT", openAiCredit);

    if (openAiCredit) {
      // Update the existing credits
      await db
        .update(schema.openAiCredit)
        .set({
          credits: openAiCredits,
          updated_at: new Date(),
        })
        .where(eq(schema.openAiCredit.userId, userId))
        .execute();
    } else {
      // Insert new credits if they don't exist
      await db.insert(schema.openAiCredit).values({
        userId: userId,
        credits: openAiCredits,
        updated_at: new Date(),
      });

      console.log(
        "Credits initialized and updated successfully for user:",
        userId,
      );
    }
  } catch (error) {
    console.error("Error updating 11 Labs credits:", error);
    throw new Error(`Error updating credits: ${(error as Error).message}`);
  }
}

export { updateUserCredits };

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        name: schema.users.name,
        email: schema.users.email,
        id: schema.users.id,
        created_at: schema.users.created_at,
        updated_at: schema.subscriptions.updated_at,
        status: schema.subscriptions.status,
        plan_id: schema.subscriptions.plan_id,
        total_credits: sql`COALESCE(SUM(${schema.credits.credits}), 0)`,
      })
      .from(schema.users)
      .leftJoin(schema.subscriptions, () =>
        eq(schema.users.id, schema.subscriptions.userId),
      )
      .leftJoin(schema.credits, () =>
        eq(schema.users.id, schema.credits.userId),
      )
      .groupBy(
        schema.users.id,
        schema.users.name,
        schema.users.email,
        schema.users.created_at,
        schema.subscriptions.status,
        schema.subscriptions.plan_id,
        schema.subscriptions.updated_at,
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
            status: "FREE",
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
  initialFreeTrial: protectedProcedure
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
            status: "FREE_TRIAL",
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
          .set({ status: "FREE_TRIAL", updated_at: sql`NOW()` })
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

  updateStudent: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Update the user's subscription status to "STUDENT"
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "STUDENT",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        // Update the user's credits for the "STUDENT" plan
        const planCredits = {
          elevenLabsCredits: 40000,
          openAiCredits: 200000,
        };
        await updateUserCredits(input.userId, planCredits);

        return { success: true };
      } catch (error) {
        console.error(
          "Error updating subscription and setting credits:",
          error,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating subscription and setting credits",
        });
      }
    }),
  updateCreator: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "CREATOR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })

          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        // Update the user's credits for the "Creator" plan
        const planCredits = {
          elevenLabsCredits: 80000,
          openAiCredits: 400000,
        };
        await updateUserCredits(input.userId, planCredits);
        return { success: true };
      } catch (error) {
        console.error("Error updating subscription:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating subscription",
        });
      }
    }),
  updateBusiness: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "BUSINESS",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })

          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        // Update the user's credits for the "Business" plan
        const planCredits = {
          elevenLabsCredits: 125000,
          openAiCredits: 1000000,
        };
        await updateUserCredits(input.userId, planCredits);

        return { success: true };
      } catch (error) {
        console.error("Error updating subscription:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating subscription",
        });
      }
    }),
  updateStudentClMO: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "STUDENTClMO",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
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

  updateCreatorClMO: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "CREATORClMO",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
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
  updateBusinessClMO: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "BUSINESSClMO",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
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
  updateStudentClYR: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "STUDENTClYR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
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

  updateCreatorClYR: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "CREATORClYR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
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
  updateBusinessClYR: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(5),
        planId: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(schema.subscriptions)
          .set({
            status: "BUSINESSYR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
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
          .set({ status: "FREE", updated_at: sql`NOW()` })
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
});
