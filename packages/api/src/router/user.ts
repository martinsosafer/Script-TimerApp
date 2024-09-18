import { z } from "zod";

import { db, eq, schema, sql } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";
import { clCredits } from "@voiceai/db/schema/copyLeaksCredit";

import { createTRPCRouter, protectedProcedure, TRPCError } from "../trpc";

//Function to update the credits
async function updateUserCredits(
  userId: string,
  planCredits: {
    elevenLabsCredits: number;
    openAiCredits: number;
    clCredits: number; // Add CopyLeaks credits
  },
) {
  const {
    elevenLabsCredits,
    openAiCredits,
    clCredits: copyLeaksCredits,
  } = planCredits;

  try {
    // Update CopyLeaks credits (clCredits)
    const existingClCredits = await db.query.clCredits.findFirst({
      where: eq(clCredits.userId, userId),
    });

    if (existingClCredits) {
      // Update the existing CL credits
      await db
        .update(clCredits)
        .set({
          credits: copyLeaksCredits,
          updated_at: new Date(),
        })
        .where(eq(clCredits.userId, userId))
        .execute();

      console.log("CL credits updated successfully for user:", userId);
    } else {
      // Insert new CL credits if they don't exist
      await db.insert(clCredits).values({
        userId: userId,
        credits: copyLeaksCredits,
        updated_at: new Date(),
      });

      console.log(
        "CL credits initialized and updated successfully for user:",
        userId,
      );
    }

    // Eleven Labs Credits Update (As per your existing code)
    const existingElevenLabsCredit = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    if (existingElevenLabsCredit) {
      await db
        .update(elevenLabsCredit)
        .set({
          credits: elevenLabsCredits,
          updated_at: new Date(),
        })
        .where(eq(elevenLabsCredit.userId, userId))
        .execute();
    } else {
      await db.insert(elevenLabsCredit).values({
        userId: userId,
        credits: elevenLabsCredits,
        updated_at: new Date(),
      });
    }

    // OpenAI Credits Update (As per your existing code)
    const openAiCredit = await db.query.openAiCredit.findFirst({
      where: eq(schema.openAiCredit.userId, userId),
    });

    if (openAiCredit) {
      await db
        .update(schema.openAiCredit)
        .set({
          credits: openAiCredits,
          updated_at: new Date(),
        })
        .where(eq(schema.openAiCredit.userId, userId))
        .execute();
    } else {
      await db.insert(schema.openAiCredit).values({
        userId: userId,
        credits: openAiCredits,
        updated_at: new Date(),
      });
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
        cl_credits: schema.clCredits.credits,
        eleven_labs_credits: schema.elevenLabsCredit.credits,
      })
      .from(schema.users)
      .leftJoin(schema.subscriptions, () =>
        eq(schema.users.id, schema.subscriptions.userId),
      )
      .leftJoin(schema.credits, () =>
        eq(schema.users.id, schema.credits.userId),
      )
      .leftJoin(schema.clCredits, () =>
        eq(schema.users.id, schema.clCredits.userId),
      )
      .leftJoin(schema.elevenLabsCredit, () =>
        eq(schema.users.id, schema.elevenLabsCredit.userId),
      )
      .groupBy(
        schema.users.id,
        schema.users.name,
        schema.users.email,
        schema.users.created_at,
        schema.subscriptions.status,
        schema.subscriptions.plan_id,
        schema.subscriptions.updated_at,
        schema.clCredits.credits,
        schema.elevenLabsCredit.credits,
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
            status: "STUDENTCLMO",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        const planCredits = {
          elevenLabsCredits: 10000,
          openAiCredits: 200000,
          clCredits: 40,
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
            status: "CREATORCLMO",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();
        const planCredits = {
          elevenLabsCredits: 10000,
          openAiCredits: 400000,
          clCredits: 60,
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
            status: "BUSINESSCLMO",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();
        const planCredits = {
          elevenLabsCredits: 10000,
          openAiCredits: 1000000,
          clCredits: 80,
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
            status: "STUDENTCLYR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();
        const planCredits = {
          elevenLabsCredits: 10000,
          openAiCredits: 200000,
          clCredits: 40,
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
            status: "CREATORCLYR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        const planCredits = {
          elevenLabsCredits: 10000,
          openAiCredits: 400000,
          clCredits: 60,
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
            status: "BUSINESSCLYR",
            plan_id: input.planId ?? "initial_plan_id",
            updated_at: sql`NOW()`,
          })
          .where(eq(schema.subscriptions.userId, input.userId))
          .execute();

        const planCredits = {
          elevenLabsCredits: 10000,
          openAiCredits: 1000000,
          clCredits: 60,
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
