import { auth } from "@voiceai/auth";

import { poppins } from "~/app/fonts";
import PageHeader from "../components/page-header";
import Compare from "./compare";
import FAQs from "./faqs";
import LanguagesRows from "./languages-rows";
import Plans from "./plans";
import PricingTestimonials from "./testimonials";
import type { Plan } from "./types";
import { getSubscription } from "./utils";

export default async function NewPlansPage() {
  const session = await auth();
  let subscription;

  if (session) {
    subscription = await getSubscription(session?.user.subscription?.planId);
  }

  return (
    <div
      className={`bg-cp-background flex w-full flex-col items-center ${poppins.className}`}
    >
      <PageHeader
        title="Choose a plan"
        subtitle="Transform your ideas into perfect scripts, voice overs, and images in any language."
      />
      <Plans
        session={session}
        subscription={(subscription?.plan as Plan) ?? null}
      />
      <Compare session={session} />
      <LanguagesRows />
      <PricingTestimonials />
      <FAQs />
    </div>
  );
}
