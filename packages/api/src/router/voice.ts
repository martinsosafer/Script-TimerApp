import { z } from "zod";

import { and, asc, db, eq, ilike, schema } from "@voiceai/db";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  TRPCError,
} from "../trpc";

function addWatermark(message: string) {
  const watermark = "created by script timer";

  // Prepend the watermark to the message
  // const prependedMessage = `${watermark} - ${message}`;

  // Append the watermark to the message
  // const appendedMessage = `${prependedMessage} - ${watermark}`;
  const appendedMessage = `${message} - ${watermark}`;
  return appendedMessage;
}

export const voiceRouter = createTRPCRouter({
  publicVoices: publicProcedure.query(async () => {
    return await db
      .select()
      .from(schema.voices)
      .where(eq(schema.voices.active, true))
      .orderBy(asc(schema.voices.rank));
  }),
  listAllVoices: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(schema.voices)
      .orderBy(asc(schema.voices.rank));
  }),
  list: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input?.name && input?.name.length > 0) {
        return await ctx.db
          .select()
          .from(schema.voices)
          .where(
            and(
              ilike(schema.voices.name, `%${input.name}%`),
              eq(schema.voices.active, true),
            ),
          );
      }
      const subscription = await ctx.db.query.subscriptions.findFirst({
        where: eq(schema.subscriptions.userId, ctx.session.user.id),
      });

      let maxVoices = 5; // Maximum number of voices for free users
      if (
        subscription?.status === "STUDENT" ||
        subscription?.status === "CREATOR" ||
        subscription?.status === "BUSINESS" ||
        subscription?.status === "FREE_TRIAL"
      ) {
        // If user has an active subscription, set maximum voices to a higher value
        maxVoices = Number.MAX_SAFE_INTEGER; // Set to a very large number
      }
      return await ctx.db
        .select()
        .from(schema.voices)
        .where(eq(schema.voices.active, true))
        .limit(maxVoices)
        .orderBy(asc(schema.voices.rank));
    }),
  create: protectedProcedure
    .input(
      z.object({
        voice_id: z.string().min(1),
        voice_actor: z.string().min(1),
        message: z.string().min(1).trim(),
        similarity: z.number().min(0).max(1).default(0.8),
        stability: z.number().min(0).max(1).default(0.5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const subscription = await ctx.db.query.subscriptions.findFirst({
          where: eq(schema.subscriptions.userId, ctx.session.user.id),
        });

        let maxMessageLength = 300; // Default maximum message length for free users

        if (
          subscription?.status === "FREE_TRIAL" ||
          subscription?.status === "STUDENT"
        ) {
          maxMessageLength = 2000;
        } else if (subscription?.status === "CREATOR") {
          maxMessageLength = 5000;
        } else if (subscription?.status === "BUSINESS") {
          maxMessageLength = 10000;
        }

        if (input.message.length > maxMessageLength) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: `Maximum message length exceeded. Max length: ${maxMessageLength} characters.`,
          });
        }

        let message = input.message;

        if (
          !["BUSINESS", "STUDENT", "CREATOR"].includes(subscription?.status)
        ) {
          message = addWatermark(message);
        }

        const generationId = await ctx.db
          .insert(schema.generations)
          .values({
            userId: ctx.session.user.id,
            type: "OTHER",
            prompt: input.message,
            metadata: {
              voice_id: input.voice_id,
              voice_actor: input.voice_actor,
            },
          })
          .returning({ generationId: schema.generations.id })
          .then((res) => res?.[0]?.generationId);

        if (!generationId) throw new Error("Error creating record");
      } catch (e) {
        console.log("There was an error", e);
      }
    }),
  newVoice: protectedProcedure
    .input(
      z.object({
        external_id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        picture: z.string().optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
        type: z.enum(["11LABS", "OTHER"]).optional(),
        active: z.boolean().default(true),
        metadata: z.record(z.unknown()).optional(),
        rank: z.number().default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingVoice = await ctx.db.query.voices.findFirst({
          where: eq(schema.voices.external_id, input.external_id),
        });

        if (existingVoice) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Voice with this external ID already exists.",
          });
        }

        const newVoice = await ctx.db
          .insert(schema.voices)
          .values({
            external_id: input.external_id,
            name: input.name,
            description: input.description,
            picture: input.picture,
            gender: input.gender ?? "OTHER",
            type: input.type ?? "OTHER",
            active: input.active ?? true,
            metadata: input.metadata ?? {},
            rank: input.rank ?? 0,
          })
          .execute();

        return newVoice;
      } catch (error) {
        console.error("Error creating voice:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating voice",
        });
      }
    }),
  favoriteVoice: protectedProcedure
    .input(
      z.object({
        voice: z.object({
          id: z.string().min(1),
          external_id: z.string().min(1),
          name: z.string().min(1),
          picture: z.string(),
          metadata: z.object({
            preview_url: z.string(),
            labels: z.object({
              gender: z.string(),
            }),
          }),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { voice } = input;
      const userId = ctx.session.user.id;

      try {
        const subscription = await ctx.db.query.subscriptions.findFirst({
          where: eq(schema.subscriptions.userId, userId),
        });

        if (!subscription) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Subscription not found for the user",
          });
        }

        const currentFavorites = subscription.favorite_voices || [];

        // Check if the voice is already in the list of favorites
        const isAlreadyFavorite = currentFavorites.some(
          (fav) => fav.external_id === voice.external_id,
        );

        if (isAlreadyFavorite) {
          // Remove the voice from favorites and set the favorite boolean to null
          const updatedFavorites = currentFavorites.filter(
            (fav) => fav.external_id !== voice.external_id,
          );

          await ctx.db
            .update(schema.voices)
            .set({ favorite: null }) // Set the favorite boolean to null
            .where(eq(schema.voices.external_id, voice.external_id))
            .execute();

          await ctx.db
            .update(schema.subscriptions)
            .set({ favorite_voices: updatedFavorites })
            .where(eq(schema.subscriptions.userId, userId))
            .execute();

          return { success: true };
        } else {
          // Add the voice to favorites and set the favorite boolean to true
          const updatedFavorites = [...currentFavorites, voice];

          await ctx.db
            .update(schema.voices)
            .set({ favorite: true }) // Set the favorite boolean to true
            .where(eq(schema.voices.external_id, voice.external_id))
            .execute();

          await ctx.db
            .update(schema.subscriptions)
            .set({ favorite_voices: updatedFavorites })
            .where(eq(schema.subscriptions.userId, userId))
            .execute();

          return { success: true };
        }
      } catch (error) {
        console.error("Error toggling favorite voice:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error toggling favorite voice",
        });
      }
    }),
});
