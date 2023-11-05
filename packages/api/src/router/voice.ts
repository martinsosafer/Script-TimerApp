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
  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     // return ctx.db
  //     //   .select()
  //     //   .from(schema.post)
  //     //   .where(eq(schema.post.id, input.id));
  //     return ctx.db.query.post.findFirst({
  //       where: eq(schema.post.id, input.id),
  //     });
  //   }),
  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       content: z.string().min(1),
  //     }),
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.post).values(input);
  //   }),
  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  // }),
});
