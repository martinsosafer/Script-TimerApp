import { z } from "zod";

import { desc, eq, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const voiceRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    try {
      const response = await fetch("https://api.elevenlabs.io/v1/voices", {
        method: "GET",
        credentials: "include",
        headers: {
          "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
          accept: "application/json",
        },
      });
      const voices = (await response.json()) as {
        voices: [{ voice_id: string }];
      };

      return voices.voices;
    } catch (error) {
      console.error("Error in 11labs", error);
      return [];
    }
  }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.voices.findMany({ orderBy: desc(schema.voices.id) });
  }),
  create: protectedProcedure
    .input(
      z.object({
        voice_id: z.string().min(1),
        message: z.string().min(1),
        similarity: z.number().min(0).max(1).default(0.8),
        stability: z.number().min(0).max(1).default(0.5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("IN PUT INPUT ", input);
      const voice = await ctx.db.query.voices.findFirst({
        where: eq(schema.voices.id, input.voice_id),
      });

      if (voice?.type === "11LABS") {
        const options = {
          method: "POST",
          headers: {
            "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
          responseType: "arraybuffer",
          body: JSON.stringify({
            model_id: "eleven_multilingual_v2",
            text: input.message,
            voice_settings: {
              similarity_boost: input.similarity,
              stability: input.stability,
              // style: 0.5,
              // use_speaker_boost: true,
            },
          }),
        };

        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voice.external_id}`,
          options,
        );

        const audioBase64 = Buffer.from(await response.arrayBuffer()).toString(
          "base64",
        );

        return { audio: audioBase64 };
      }
    }),
});
