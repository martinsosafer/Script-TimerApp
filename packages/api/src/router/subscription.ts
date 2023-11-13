import { z } from "zod";

import { desc, eq, schema } from "@voiceai/db";
import { createCheckoutSession, Stripe } from "@voiceai/pay";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const subscriptionRouter = createTRPCRouter({
  session: protectedProcedure.query(async () => {
    try {
      const session = await createCheckoutSession();
      return session;
    } catch (error) {
      console.error("Error in subscription", error);
      return [];
    }
  }),
});
