import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";

import { auth } from "@voiceai/auth";
import { and, db } from "@voiceai/db";

import { poppins, roboto } from "~/app/fonts";
// import {
//   IconPencilLine,
//   IconUserRound,
// } from "@voiceai/ui/@/components/ui/icons";

import type { I_AppSumoSubscription } from "~/constants/types/subscriptions";
import type { SubData } from "../boosters/types";
import { getImgCredits } from "../image-generator/actions";
import { get11LabsPlanAndBoosterCredits, getCredits } from "./actions";
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
  noStore();
  const session = await auth();
  if (!session) {
    redirect("/");
  }

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

  // Voices credits
  const elevenLabsCredits = await get11LabsPlanAndBoosterCredits(
    session?.user.id ?? "",
  );
  // Images credits
  const imgCredits = await getImgCredits(session?.user.id ?? "");

  return (
    <main className="flex h-full w-full justify-center px-1 pb-20 pt-10">
      <section className="shadow-cp-gray-300 flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="h-[100px] w-full bg-gradient-to-b from-[#0066FF] to-[#13EBCDCC]" />
        <div className="flex w-full flex-col px-3 pb-8 lg:px-8">
          <header className="mt-[-86px] flex flex-col items-start">
            {/* Image */}
            {/* <div className="relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border-8 border-white bg-gray-400">
              <IconUserRound className="h-20 w-20 text-white" />
              <div className="absolute bottom-0 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <IconPencilLine className="h-6 w-6 text-gray-600" />
              </div>
            </div> */}

            <div className="p-4">
              <h1 className="text-cp-white-ghost text-xl font-semibold">
                {session?.user.name}
              </h1>
              <p className={`${poppins.className} text-md text-cp-black`}>
                {session?.user.email}
              </p>
            </div>
          </header>

          <SubscriptionDetails
            subscription={isAppSumo ? appSumoSubscription : stripeSubscription}
            credits={credits?.[0]}
            isAppSumo={isAppSumo}
            plan={session?.user.subscription?.status}
            subData={session?.user.subscription as SubData}
            imgCredits={imgCredits}
            elevenLabsCredits={elevenLabsCredits}
          />
        </div>
      </section>
    </main>
  );
}
