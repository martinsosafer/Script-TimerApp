import { redirect } from "next/navigation";
import { Stripe } from "stripe";

import { auth } from "@voiceai/auth";
import { and, db } from "@voiceai/db";
import {
  IconPencilLine,
  IconUserRound,
} from "@voiceai/ui/@/components/ui/icons";

import type { I_AppSumoSubscription } from "~/constants/types/subscriptions";
import { getCredits } from "./actions";
import SubscriptionDetails from "./subscription-details";

async function getSubscription(planId: string | null | undefined) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  if (!planId || planId === "initial_plan_id") {
    return undefined;
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const subscription = await stripe.subscriptions.retrieve(planId);
    return subscription;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
async function getAppSumoDetails(userId: string) {
  return await db.query.appSumoSubscription.findFirst({
    where: (appSumoSubscription, { eq }) =>
      and(
        eq(appSumoSubscription.userId, userId),
        eq(appSumoSubscription.license_status, "active"),
      ),
  });
}

export default async function MyProfile() {
  const session = await auth();
  const isAppSumo = ["1", "2"].includes(
    session?.user.subscription?.status ?? "",
  );

  // Get both types of subscriptions
  const stripeSubscription = await getSubscription(
    isAppSumo ? null : session?.user.subscription?.planId,
  );
  const appSumoSubscription: I_AppSumoSubscription | undefined =
    await getAppSumoDetails(session?.user.id ?? "");

  const credits = await getCredits(session?.user.id ?? "");

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full justify-center bg-[#FAFAFA] py-10">
      <div className="flex w-[1024px] flex-col items-center overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-500">
        <div className="h-[100px] w-full bg-gradient-to-b from-[#0066FF] to-[#13EBCDCC]" />
        <div className="flex w-full flex-col p-8">
          <div className="mt-[-80px] flex flex-col items-start">
            <div className="relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border-8 border-white bg-gray-400">
              <IconUserRound className="h-20 w-20 text-white" />
              <div className="absolute bottom-0 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <IconPencilLine className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-600">
                {session?.user.name}
              </h1>
              <p className="text-md text-gray-600">{session?.user.email}</p>
            </div>
          </div>
          <SubscriptionDetails
            subscription={isAppSumo ? appSumoSubscription : stripeSubscription}
            credits={credits?.[0]}
            isAppSumo={isAppSumo}
          />
        </div>
      </div>
    </div>
  );
}
