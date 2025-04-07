import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import { getSoundfxFavorites } from "./actions";
import SoundEffectsMenu from "./soundEffectsMenu/soundEffectsMenu";

export const metadata: Metadata = {
  title: "Sound Effects and Music",
  description: "AI-powered sound effects and music generation.",
};

export default async function SoundEffectsPage() {
  const session = await auth();
  // const favorites = await getSoundfxFavorites(session?.user?.id ?? "");

  // console.log("FAVORITES", favorites);

  const subData = session?.user.subscription;

  const subtitle = (
    <>
      <p>The ultimate hub for downloadable and AI-generated sounds.</p>
      {!subData?.status ? (
        <p className="font-base mb-2 text-center">
          Sign in to start creating soundscapes.
        </p>
      ) : null}
    </>
  );

  return (
    <main className="bg-cp-background px-4 pb-14">
      <PageHeader title="Sound Effects & Music" subtitle={subtitle} />

      <section className="flex w-full flex-col items-center gap-4">
        <p
          className={`bg-cp-accent-lightest w-full rounded-lg px-[12px] py-[8px] text-sm leading-[25px] text-[#212121] shadow-md lg:max-w-5xl lg:px-[24px] lg:py-[12px] lg:text-sm`}
        >
          You can enjoy our collection of downloadable sound effects and music,
          or create your own using prompts.
        </p>

        <SoundEffectsMenu subData={subData} />
      </section>
    </main>
  );
}
