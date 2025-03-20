import { z } from "zod";

import { desc, eq, schema } from "@voiceai/db";
import { checkSession, createCheckoutSession } from "@voiceai/pay";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const subscriptionRouter = createTRPCRouter({
  session: protectedProcedure.query(async ({ ctx }) => {
    try {
      const session = await createCheckoutSession(ctx.session.user.id);
      return session;
    } catch (error) {
      console.error("Error in subscription", error);
      return [];
    }
  }),
  Subscription: protectedProcedure.query(async ({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await ctx.subscription; // Use the subscription data from the context
  }),
  mySubscription: protectedProcedure.query(async ({ ctx }) => {
    const appSumoSubscription =
      await ctx.db.query.appSumoSubscription.findFirst({
        where: eq(schema.appSumoSubscription.userId, ctx.session.user.id),
      });

    const regularSubscription = await ctx.db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, ctx.session.user.id),
    });

    return appSumoSubscription ?? regularSubscription;
  }),
});
