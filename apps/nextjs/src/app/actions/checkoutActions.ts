"use server";

import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function upgrade(priceId: string, subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("SUBSCRIPTION", subscription);
    //console.log("SUBSCRIPTION", subscription.items.data[0]);

    if (!subscription.items.data[0]) {
      throw new Error("Subscription not found");
    }

    // const updatedSubscription = await stripe.subscriptions.update(
    //   subscriptionId,
    //   {
    //     items: [
    //       {
    //         id: subscription.items.data[0].id,
    //         price: priceId,
    //       },
    //     ],
    //   },
    // );

    const product = await stripe.products.retrieve(
      subscription.items.data[0].price.product as string,
    );

    if (!product) {
      throw new Error("Product not found");
    }

    const newProductName = product.name;

    //console.log("UPDATED SUBSCRIPTION", updatedSubscription);
  } catch (error) {
    console.error(error);
  }

  //   const response = await fetch("/api/upgrade", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       productId,
  //       subscriptionId,
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to upgrade subscription");
  //   }

  //   return response.json();
}

// onClick={
//     session
//       ? async () => {
//           const res = await fetch("/api/checkout", {
//             method: "POST",
//             body: JSON.stringify({
//               productId,
//             }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//           const {
//             session: { url },
//           } = await res.json();

//           window.location.href = url as string;
//         }
//       : () => router.push("/register")
//   }
