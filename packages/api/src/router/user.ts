import { z } from "zod";

import { and, asc, ilike, like, schema } from "@voiceai/db";

import { createTRPCRouter, protectedProcedure, TRPCError } from "../trpc";

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        name: schema.users.name,
        email: schema.users.email,
        id: schema.users.id,
      })
      .from(schema.users);
  }),
});
