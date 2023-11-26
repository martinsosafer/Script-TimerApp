// import { z } from "zod";

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
      console.log("in voices", voices);
      return voices.voices;
    } catch (error) {
      console.error("Error in 11labs", error);
      return [];
    }
  }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.voices.findMany({ orderBy: desc(schema.voices.id) });
  }),
});
