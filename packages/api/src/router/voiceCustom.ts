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
        // Check if the voice with the given external_id already exists
        const existingVoice = await ctx.db.query.voicesCustom.findFirst({
          where: { external_id: input.external_id },
        });

        if (existingVoice) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Voice with this external ID already exists.",
          });
        }

        // Prepare form data for ElevenLabs API
        const form = new FormData();
        form.append("name", input.name);
        form.append("description", input.description);
        form.append("files", input.files); // Assuming input.files is a path to the file
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

        if (!response.ok) {
          throw new Error(data.message || "Failed to add voice to ElevenLabs");
        }

        // Insert the new voice into your database
        const newVoice = await ctx.db
          .insert(schema.voicesCustom)
          .values({
            name: input.name,
            description: input.description,
            picture: input.picture,
            gender: input.gender ?? "OTHER",
            type: input.type ?? "OTHER",
            active: input.active ?? true,
            metadata: input.metadata ?? {},
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
          (custom) => custom.external_id === voice.external_id,
        );

        if (isAlreadyCustom) {
          // Remove the voice from favorites and set the favorite boolean to null
          const updatedCustom = currentCustom.filter(
            (custom) => custom.external_id !== voice.external_id,
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
