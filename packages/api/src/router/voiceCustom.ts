import { FormData } from "formdata-node";
import { z } from "zod";

import { and, asc, db, eq, ilike, schema } from "@voiceai/db";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  TRPCError,
} from "../trpc";

export const voiceCustomRouter = createTRPCRouter({
  newCustomVoice: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        files: z.string().min(1), // URL or path to the audio file
        labels: z.string().optional(),
        picture: z.string().optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
        type: z.enum(["11LABS", "OTHER"]).optional(),
        active: z.boolean().default(true),
        metadata: z.record(z.unknown()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Convert base64 string back to a file
        const fileBuffer = Buffer.from(input.files.split(",")[1], "base64");
        const fileName = "voice-file.wav"; // Change the file extension if necessary

        // Prepare form data for ElevenLabs API
        const form = new FormData();
        form.append("name", input.name);
        form.append("description", input.description);
        form.append(
          "files",
          new Blob([fileBuffer], { type: "audio/wav" }),
          fileName,
        );
        if (input.labels) {
          form.append("labels", input.labels);
        }

        // Send the request to ElevenLabs API
        const response = await fetch(
          "https://api.elevenlabs.io/v1/voices/add",
          {
            method: "POST",
            headers: {
              "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
            },
            body: form,
          },
        );

        const data = await response.json();

        // Log the response data to check its structure
        console.log("API Response Data:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to add voice to ElevenLabs");
        }

        const externalId = data.voice_id; // Ensure this is the correct field from the API response

        // Insert the new voice into your database
        const newVoice = await ctx.db
          .insert(schema.voicesCustom)
          .values({
            external_id: externalId,
            name: input.name,
            description: input.description,
            picture: input.picture,
            gender: input.gender ?? "OTHER",
            type: input.type ?? "OTHER",
            active: input.active,
            metadata: input.metadata ?? {},
          })
          .execute();

        // Update the user's subscription with the new custom voice
        const userId = ctx.session.user.id;

        // Fetch the current subscription
        const subscription = await ctx.db.query.subscriptions.findFirst({
          where: eq(schema.subscriptions.userId, userId),
        });

        if (!subscription) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Subscription not found for the user",
          });
        }

        const currentCustomVoices = subscription.custom_voices || [];

        // Add the new voice to the list of custom voices
        const updatedCustomVoices = [
          ...currentCustomVoices,
          {
            id: newVoice.id, // Ensure this matches the newVoice schema
            external_id: externalId,
            name: input.name,
            description: input.description,
            picture: input.picture,
            gender: input.gender ?? "OTHER",
            type: input.type ?? "OTHER",
            active: input.active,
            metadata: input.metadata ?? {},
          },
        ];

        await ctx.db
          .update(schema.subscriptions)
          .set({ custom_voices: updatedCustomVoices })
          .where(eq(schema.subscriptions.userId, userId))
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
  listAllCustomVoices: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id; // Get the user ID from the session

    try {
      // Fetch the user's subscription to get the list of custom voices
      const subscription = await ctx.db.query.subscriptions.findFirst({
        where: eq(schema.subscriptions.userId, userId),
      });

      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscription not found for the user",
        });
      }

      // Return the custom voices
      return subscription.custom_voices || [];
    } catch (error) {
      console.error("Error listing custom voices:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error listing custom voices",
      });
    }
  }),
  CustomVoice: protectedProcedure
    .input(
      z.object({
        voiceCustom: z.object({
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
      const { voiceCustom } = input;
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

        const currentCustom = subscription.custom_voices || [];

        // Check if the voice is already in the list of favorites
        const isAlreadyCustom = currentCustom.some(
          (custom) => custom.id === voice.external_id,
        );

        if (isAlreadyCustom) {
          // Remove the voice from favorites and set the favorite boolean to null
          const updatedCustom = currentCustom.filter(
            (custom) => custom.id !== voice.id,
          );

          await ctx.db
            .update(schema.subscriptions)
            .set({ custom_voices: updatedCustom })
            .where(eq(schema.subscriptions.userId, userId))
            .execute();

          return { success: true };
        } else {
          // Add the voice to favorites and set the favorite boolean to true
          const updatedCustom = [...currentCustom, voiceCustom];

          await ctx.db
            .update(schema.subscriptions)
            .set({ Custom_voices: updatedCustom })
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
