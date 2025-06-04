import Link from "next/link";

import { auth } from "@voiceai/auth";
import { IllustrationCornerTriangle } from "@voiceai/ui/@/illustrations";

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
      {/* Add Boosters */}
      <IllustrationCornerTriangle className="absolute right-[-16px] top-[62px] max-lg:h-[187px] max-lg:w-[198px] lg:right-0 lg:top-[108px]" />
      <Link
        className="text-cp-white hover:text-cp-primary-light transition duration-700"
        href={"/boosters"}
      >
        <h3 className="absolute right-[-10px] top-[106px] rotate-45 text-[18px] font-bold lg:top-[174px] lg:text-2xl">
          ADD BOOSTERS!
        </h3>
        <p className="absolute right-[64px] top-[196px] rotate-45 text-sm max-lg:invisible">
          Click here
        </p>
      </Link>

      <div className="max-md:px-10 max-md:pt-5 max-sm:px-0 max-sm:pt-10">
        <PageHeader
          title="Choose a plan"
          subtitle="Transform your ideas into perfect scripts, voice overs, and images in any language."
        />
      </div>
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
