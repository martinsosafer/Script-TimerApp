import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { fetchUserCredits } from "~/app/actions/user11LabsCredits";
import { set11LabsCreditsBasedOnPlan } from "~/lib/set11labsCredits";
import { History } from "../../_components/history";
import PageHeader from "../components/page-header";
import {
  characters,
  getTotalCredits,
} from "../texttovoice/[[...scriptId]]/utils";

export const metadata: Metadata = {
  title: "History",
  description: "Example music app using the components.",
};

export default async function HistoryPage() {
  const session = await auth();

  // Initialize credits variable
  let credits = 0;

  if (session?.user.id && session?.user.subscription?.status) {
    // Set credits based on the user's subscription plan
    await set11LabsCreditsBasedOnPlan(
      session.user.id,
      session.user.subscription.status,
    );

    try {
      credits = await fetchUserCredits(session.user.id);
    } catch (error) {
      console.error("Error fetching user credits:", error);
    }
  }

  const subData = session?.user.subscription;

  const totalCredits = getTotalCredits(subData?.status);

  const subtitle = (
    <>
      {subData?.status ? (
        <div>
          <p className="font-base mb-2 text-center">
            This is where you choose and create your voice overs. On your
            current plan, <br />
            <span className="text-cp-primary font-semibold">
              {subData.status}
            </span>
            , you are entitled to{" "}
            <span className="text-cp-primary font-bold">
              {characters[subData.status]}
            </span>{" "}
            per script.
          </p>
          <p className="font-base mb-2 text-center">
            You have{" "}
            <span className="text-cp-primary font-bold">{credits}</span>{" "}
            characters left of{" "}
            <span className="text-cp-primary font-bold">{totalCredits}</span>{" "}
            total monthly characters.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="font-base text-center">
            This is where you choose and create your voice overs.
          </p>
          <p className="font-base mb-2 text-center">
            Log in to Script Timer and start creating now.
          </p>
        </div>
      )}
    </>
  );
  return (
    <>
      <PageHeader title="History" subtitle={subtitle} />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <History />
        </div>
      </div>
    </>
  );
}
