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
        gender: z.string().optional(), // New field
        preview_url: z.string().optional(), // New field
        type: z.enum(["11LABS", "OTHER"]).optional(),
        active: z.boolean().default(true),
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
        if (input.gender) {
          form.append("gender", input.gender);
        }
        if (input.preview_url) {
          form.append("preview_url", input.preview_url);
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

        // Retrieve the user's email from the session
        const userEmail = ctx.session.user.email;

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
            userEmail, // Add this line to include the user's email
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
            metadata: {
              labels: {
                gender: input.gender || "OTHER",
              },
              preview_url:
                input.preview_url ||
                "This is a cloned voice created by Script Timer",
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
          message: "Error creating voice",
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
});
