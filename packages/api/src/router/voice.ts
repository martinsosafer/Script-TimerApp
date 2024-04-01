import { z } from "zod";

import { and, asc, eq, ilike, like, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, TRPCError } from "../trpc";

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
        voice_actor: z.string().min(1), // Add voice_actor field
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
        }

        if (input.message.length > maxMessageLength) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: `Maximum message length exceeded. Max length: ${maxMessageLength} characters.`,
          });
        }

        const voice = await ctx.db.query.voices.findFirst({
          where: eq(schema.voices.id, input.voice_id),
        });
        let message = input.message;

        if (subscription?.status !== "ACTIVE") {
          message = addWatermark(message);
        }

        if (voice?.type === "11LABS") {
          const payload = {
            model_id: "eleven_multilingual_v2",
            text: message,
            voice_actor: input.voice_actor,
            voice_settings: {
              similarity_boost: input.similarity,
              stability: input.stability,
              // style: 0.5,
              // use_speaker_boost: true,
            },
          };
          console.log("CALLING");
          const options = {
            method: "POST",
            headers: {
              "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
              "Content-Type": "application/json",
              Accept: "audio/mpeg",
            },
            responseType: "arraybuffer",
            body: JSON.stringify(payload),
          };

          const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voice.external_id}`,
            options,
          );

          if (!response.ok) {
            const responseData = await response.text(); // Convert the response to text for debugging
            throw new Error(
              `HTTP error! Status: ${response.status}, Response: ${responseData}`,
            );
          }

          // If the response was successful, handle it based on its content type
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("audio/mpeg")) {
            // Handle audio content if needed

            const audioBase64 = Buffer.from(
              await response.arrayBuffer(),
            ).toString("base64");
            const credits = await ctx.db
              .select({ credits: schema.credits.credits })
              .from(schema.credits)
              .where(eq(schema.credits.userId, ctx.session.user.id));

            // TODO: check if user has enough credits

            const generationId = await ctx.db
              .insert(schema.generations)
              .values({
                userId: ctx.session.user.id,
                type: "11LABS",
                prompt: input.message,
                response: audioBase64,
                metadata: payload,
              })
              .returning({ generationId: schema.generations.id })
              .then((res) => res?.[0]?.generationId);
            if (!generationId) throw new Error("Error creating voice");
            await ctx.db.insert(schema.credits).values({
              userId: ctx.session.user.id,
              generationId: generationId,
              type: "11LABS",
              credits: input.message.length,
            });

            return { audio: audioBase64 };
            // Do something with audioData if necessary
          } else {
            // If the response is JSON, parse it
            const responseData = await response.json();
            // Do something with responseData if necessary
            console.log(responseData); // Log the parsed data for debugging
          }
          console.log("DONE");
        }
      } catch (e) {
        console.log("There was an error", e);
      }
    }),
});
