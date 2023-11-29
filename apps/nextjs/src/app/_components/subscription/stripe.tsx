"use client";

import * as React from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { api } from "~/utils/api";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export default function Stripe() {
  const { data, isLoading } = api.subscription.session.useQuery();

  const { data: subscriptionData, isLoading: subscriptionIsLoading } =
    api.subscription.mySubscription.useQuery();

  console.log("subscription data", subscriptionData);

  return (
    <div id="checkout">
      {subscriptionData?.status === "ACTIVE" ? (
        <>Your Subscription is Active</>
      ) : (
        <>
          {/* @ts-expect-error will type stripe later */}
          {data?.client_secret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              // @ts-expect-error will type stripe later
              options={{ clientSecret: data?.client_secret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </>
      )}
    </div>
  );
}
