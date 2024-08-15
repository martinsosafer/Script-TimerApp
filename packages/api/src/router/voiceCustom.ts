import { FormData } from "formdata-node";
import { z } from "zod";

import { and, asc, db, eq, ilike, schema } from "@voiceai/db";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  TRPCError,
} from "../trpc";

const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
newCustomVoice: protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      files: z.string().url(),
      labels: z.string().optional(),
      gender: z.string().optional(),
      preview_url: z.string().optional(),
      type: z.enum(["11LABS", "OTHER"]).optional(),
      active: z.boolean().default(true),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      // Retrieve the user's subscription data
      const userId = ctx.session.user.id;
      const subscription = await ctx.db.query.subscriptions.findFirst({
        where: eq(schema.subscriptions.userId, userId),
      });

      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subscription not found for the user",
        });
      }

      // Add logging to verify the plan value
      console.log("User subscription plan:", subscription.plan);

      const customVoiceLimit =
        subscription.status === "CREATOR"
          ? 3
          : subscription.status === "BUSINESS"
          ? 5
          : 0;

      // Log the custom voice limit for debugging
      console.log("Custom voice limit for the user:", customVoiceLimit);

      if (customVoiceLimit === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Your plan does not allow creating custom voices",
        });
      }

      const currentCustomVoices = subscription.custom_voices || [];

      if (currentCustomVoices.length >= customVoiceLimit) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `You have reached the limit of ${customVoiceLimit} custom voices for your plan`,
        });
      }

      // Proceed with creating the new custom voice
      const response = await fetch(input.files);
      const fileBuffer = await response.arrayBuffer();
      if (fileBuffer.byteLength > MAX_FILE_SIZE_BYTES) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit.`,
        });
      }

      // Prepare form data for ElevenLabs API
      const form = new FormData();
      form.append("name", input.name);
      form.append("description", input.description);
      form.append(
        "files",
        new Blob([fileBuffer], { type: "audio/wav" }),
        "voice-file.wav",
      );
      if (input.labels) {
        form.append("labels", input.labels);
      }
      if (input.gender) {
        form.append("gender", input.gender);
      }
      if (input.preview_url) {
        form.append("preview_url", input.preview_url);
      }

      // Send the request to ElevenLabs API
      const elevenLabsResponse = await fetch(
        "https://api.elevenlabs.io/v1/voices/add",
        {
          method: "POST",
          headers: {
            "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
          },
          body: form,
        },
      );

      const data = await elevenLabsResponse.json();

      if (!elevenLabsResponse.ok) {
        throw new Error(data.message || "Failed to add voice to ElevenLabs");
      }

      const externalId = data.voice_id;

      // Insert the new voice into your database
      const newVoice = await ctx.db
        .insert(schema.voicesCustom)
        .values({
          external_id: externalId,
          name: input.name,
          description: input.description,
          metadata: {
            labels: {
              gender: input.gender || "OTHER",
            },
            preview_url: input.preview_url || "",
          },
          type: input.type ?? "OTHER",
          active: input.active,
          userEmail: ctx.session.user.email,
        })
        .execute();

      // Update the user's subscription with the new custom voice
      const updatedCustomVoices = [
        ...currentCustomVoices,
        {
          id: newVoice.id,
          external_id: externalId,
          name: input.name,
          description: input.description,
          metadata: {
            labels: {
              gender: input.gender || "OTHER",
            },
            preview_url: input.preview_url || "",
          },
          type: input.type ?? "OTHER",
          active: input.active,
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
        message: error.message || "Error creating voice",
      });
    }
  }),

  deleteCustomVoice: protectedProcedure
    .input(
      z.object({
        voiceId: z.string().min(1), // The ID of the voice to delete
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Send delete request to ElevenLabs API
        const response = await fetch(
          `https://api.elevenlabs.io/v1/voices/${input.voiceId}`,
          {
            method: "DELETE",
            headers: {
              "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
            },
          },
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.message || "Failed to delete voice from ElevenLabs",
          );
        }

        // Delete the voice from the database
        const userId = ctx.session.user.id;

        // Remove the voice from the voicesCustom table
        await ctx.db
          .delete(schema.voicesCustom)
          .where(eq(schema.voicesCustom.external_id, input.voiceId))
          .execute();

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

        // Update the subscription to remove the deleted voice
        const updatedCustomVoices = (subscription.custom_voices || []).filter(
          (voice) => voice.external_id !== input.voiceId,
        );

        await ctx.db
          .update(schema.subscriptions)
          .set({ custom_voices: updatedCustomVoices })
          .where(eq(schema.subscriptions.userId, userId))
          .execute();

        return { success: true, message: "Voice deleted successfully" };
      } catch (error) {
        console.error("Error deleting voice:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error deleting voice",
        });
      }
    }),
  listAllVoices: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.voicesCustom);
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

      // Fetch the custom voices from the voicesCustom table
      const customVoices = await ctx.db.query.voicesCustom.findMany({
        where: eq(schema.voicesCustom.userEmail, ctx.session.user.email),
        select: {
          id: true,
          external_id: true,
          active: true,
          type: true,
          name: true,
          description: true,
          metadata: true,
          created_at: true,
          updated_at: true,
        },
      });

      // Return the custom voices
      return customVoices;
    } catch (error) {
      console.error("Error listing custom voices:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error listing custom voices",
      });
    }
  }),
});
