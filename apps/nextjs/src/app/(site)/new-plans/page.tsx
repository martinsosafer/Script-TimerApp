import { auth } from "@voiceai/auth";

import { poppins } from "~/app/fonts";
import type { Plan } from "../plans/types";
import Compare from "./compare";
import Explore from "./explore";
import FAQs from "./faqs";
import LanguagesRows from "./languages-rows";
import Plans from "./plans";
import PricingTestimonials from "./testimonials";
import { getSubscription } from "./utils";
import Welcome from "./welcome";

export default async function NewPlansPage() {
  const session = await auth();
  let subscription;

  if (session) {
    subscription = await getSubscription(session?.user.subscription?.planId);
  }

  console.log("subscription", subscription);
  console.log("session", session);

  return (
    <div
      className={`bg-cp-background flex w-full flex-col items-center ${poppins.className}`}
    >
      <Welcome />
      <Plans
        session={session}
        subscription={(subscription?.plan as Plan) ?? null}
      />
      <Explore />
      <Compare session={session} />
      <LanguagesRows />
      <PricingTestimonials />
      <FAQs />
    </div>
  );
}
