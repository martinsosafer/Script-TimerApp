"use server";

import { Stripe } from "stripe";

import { db, eq, schema } from "@voiceai/db";

import {
  STARTING_11CL_CREDITS,
  STARTING_CL_CREDITS,
  STARTING_IMG_CREDITS,
  STARTING_OPENAI_CREDITS,
} from "~/constants/credits";
import { plans } from "~/constants/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function upgrade(
  priceId: string,
  subscriptionId: string,
  userId: string,
  discountCoupon?: string | null,
) {
  // console.log("discountCoupon", discountCoupon);
  let promotionCodeId;

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!subscription.items.data[0]) {
      throw new Error("Subscription not found");
    }

    // console.log("subscription", subscription);

    // Validate Discount Coupon
    if (discountCoupon) {
      const promotionCode = await stripe.promotionCodes.list({
        code: discountCoupon,
        active: true,
        limit: 1,
      });

      if (!promotionCode?.data[0]) {
        throw new Error("Invalid discount coupon: " + discountCoupon);
      }

      promotionCodeId = promotionCode.data[0].id;
    }

    // console.log("promotionCodeId", promotionCodeId);

    //   // console.log("priceId", priceId);
    //   // console.log("subscription", subscription.items.data[0]);
    //   console.log("subscriptionId", subscriptionId);
    // console.log("promotionCodeId", promotionCodeId);

    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: priceId,
          },
        ],
        discounts: [{ promotion_code: promotionCodeId }],
      },
    );
    // Possible statuses: active | incomplete | incomplete_expired | past_due | trialing | canceled | unpaid
    if (!updatedSubscription || updatedSubscription.status !== "active") {
      throw new Error(
        "Failed to update subscription: " + updatedSubscription.status,
      );
    }

    return console.log("updatedSubscription", updatedSubscription);

    // const product = await stripe.products.retrieve(
    //   updatedSubscription.items.data[0]?.price.product as string,
    // );

    // return console.log("product", product);

    //   if (!product) {
    //     throw new Error("Product not found");
    //   }

    //   const updgradedPlan = product.name;

    //   const newPlan = plans[updgradedPlan];

    //   await db
    //     .update(schema.subscriptions)
    //     .set({
    //       plan: "CUSTOM",
    //       status: newPlan,
    //     })
    //     .where(eq(schema.subscriptions.userId, userId))
    //     .execute();

    //   await db
    //     .update(schema.clCredits)
    //     .set({
    //       credits:
    //         STARTING_CL_CREDITS[newPlan as keyof typeof STARTING_CL_CREDITS],
    //     })
    //     .where(eq(schema.clCredits.userId, userId))
    //     .execute();

    //   await db
    //     .update(schema.elevenLabsCredit)
    //     .set({
    //       credits:
    //         STARTING_11CL_CREDITS[newPlan as keyof typeof STARTING_11CL_CREDITS],
    //     })
    //     .where(eq(schema.elevenLabsCredit.userId, userId))
    //     .execute();

    //   await db
    //     .update(schema.openAiCredit)
    //     .set({
    //       credits:
    //         STARTING_OPENAI_CREDITS[
    //           newPlan as keyof typeof STARTING_OPENAI_CREDITS
    //         ],
    //     })
    //     .where(eq(schema.openAiCredit.userId, userId))
    //     .execute();

    //   await db
    //     .update(schema.imgCredit)
    //     .set({
    //       credits:
    //         STARTING_IMG_CREDITS[newPlan as keyof typeof STARTING_IMG_CREDITS],
    //     })
    //     .where(eq(schema.imgCredit.userId, userId))
    //     .execute();

    //   console.log(`> Subscription for userId ${userId} updated successfully <`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
