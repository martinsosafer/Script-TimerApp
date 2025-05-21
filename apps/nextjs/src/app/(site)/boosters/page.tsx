import Image from "next/image";

import { auth } from "@voiceai/auth";
import {
  IlustrationMasterclasses,
  IlustrationPlagiarismDetection,
  IlustrationTodayOnly,
  IlustrationVoiceSoundfx,
} from "@voiceai/ui/@/ilustrations";

import { poppins, roboto } from "~/app/fonts";
import {
  STARTING_11CL_CREDITS,
  STARTING_CL_CREDITS,
  STARTING_IMG_CREDITS,
} from "~/constants/credits";
import {
  getImageCredits,
  getPlagiarismCredits,
  getVoiceCredits,
} from "./actions";
import BoosterCard from "./BoosterCard/BoosterCard";
import type { SubData } from "./types";

export default async function BoostersPage() {
  const session = await auth();
  const userId = session?.user.id;
  const userPlan = session?.user.subscription?.status;
  const subData = session?.user.subscription as SubData | undefined;

  const imageCredits = await getImageCredits(userId ?? "");
  const imageCreditsPercentage =
    (100 * (imageCredits?.credits ?? 0)) /
    STARTING_IMG_CREDITS[userPlan as keyof typeof STARTING_IMG_CREDITS];

  const plagiarismCredits = await getPlagiarismCredits(userId ?? "");
  const plagiarismCreditsPercentage =
    (100 * (plagiarismCredits?.credits ?? 0)) /
    STARTING_CL_CREDITS[userPlan as keyof typeof STARTING_CL_CREDITS];

  const voiceCredits = await getVoiceCredits(userId ?? "");
  const voiceCreditsPercentage =
    (100 * (voiceCredits?.credits ?? 0)) /
    STARTING_11CL_CREDITS[userPlan as keyof typeof STARTING_11CL_CREDITS];

  return (
    <>
      <header className="from-cp-primary relative bg-gradient-to-br to-black py-[75px] text-center">
        <IlustrationTodayOnly className="absolute right-0 top-0 max-lg:h-[187px] max-lg:w-[198px] max-md:h-[115px] max-md:w-[120px]" />

        <p
          className={`${poppins.className} text-2xl/8 text-[#13EBDC] max-md:text-xl`}
        >
          You can add popular
        </p>
        <h1
          className={`${poppins.className} text-5xl/snug font-bold text-white max-md:text-4xl/snug`}
        >
          Booster Packs
        </h1>
        <p
          className={`${poppins.className} text-2xl/8 text-[#13EBDC] max-md:text-xl`}
        >
          with a large discount
        </p>
      </header>

      <main className="flex flex-col items-center gap-8 px-3 pb-20 pt-8 lg:pb-28">
        <p
          className={`bg-cp-accent-lightest w-full rounded-lg px-[12px] py-[8px] text-sm/none leading-[25px] text-[#212121] shadow-md lg:max-w-5xl lg:px-[24px] lg:py-[12px]`}
        >
          These credits are stored in your account and can be used all year,
          locking in discounted credits long term (as long as your membership is
          active).
        </p>

        <div className="flex flex-col gap-20">
          {/* Images Boost */}
          <BoosterCard
            subData={subData}
            type="IMAGES"
            creditsPercentage={imageCreditsPercentage}
            amount={300}
            title="Images"
            description="Create images like these for:"
            detailsList={[
              "Storyboards",
              "Websites",
              "Email",
              "Book Covers",
              "Social Media Posts",
            ]}
            descriptionEnd="and more!"
            imageMain={
              <Image
                src={"/boostersImages/boosters_imageGeneration.png"}
                alt="image generation"
                fill
                className={`mt-9 object-contain`}
                priority
              />
            }
            imageBottomLeft={
              <Image
                src={"/boostersImages/boosters_creationLab.png"}
                alt="Creation Lab"
                fill
                className={`rounded-lg object-contain`}
              />
            }
            imageBottomRight={
              <Image
                src={"/boostersImages/boosters_storyboard.png"}
                alt="Storyboard"
                fill
                className={`rounded-lg object-contain`}
              />
            }
          />

          {/* Plagiarism Boost */}
          <BoosterCard
            subData={subData}
            type="PLAGIARISM"
            creditsPercentage={plagiarismCreditsPercentage}
            amount={150000}
            amountDescription="words"
            title="Ai and Plagiarism Detection"
            description="Tested at 99.12% Accurate"
            detailsList={[
              "Plagiarism & AI detection",
              "Source links to original",
              "GPT, Claude, Gemini detection",
              "Over 100 languages",
              "Paraphrasing detection",
              "Text spinner detection",
            ]}
            imageMain={
              <IlustrationPlagiarismDetection className="max-md:w-[300px] max-sm:w-[200px]" />
            }
          />

          {/* Voice Boost */}
          <BoosterCard
            subData={subData}
            type="VOICE"
            creditsPercentage={voiceCreditsPercentage}
            amount={250000}
            amountDescription="characters"
            title="Voice Overs, Voice Cloning & Sound Effects"
            description="Boost your credits and create more:"
            detailsList={[
              "Voice overs",
              "Clone voices",
              "Record and get feedback",
              "Sound Effects",
            ]}
            imageMain={
              <IlustrationVoiceSoundfx className="max-md:w-[300px] max-sm:w-[200px]" />
            }
          />

          {/* Masterclasses Boost */}
          <BoosterCard
            subData={subData}
            type="MASTERCLASS"
            creditsPercentage={100}
            amount={1}
            amountDescription="year access"
            title="Masterclasses"
            description="Get access to our Masterclasses"
            detailsList={[
              "Stories That Transform Marketing",
              "How to Create Stunning Videos",
              "Present and Win Your Audience",
              "Create with Hollywood Movie Storylines",
              "How to Build Rapport with Your Audience",
              "Customer Journey Mapping With Generative AI",
            ]}
            descriptionEnd="and more!"
            imageMain={
              <IlustrationMasterclasses className="h-[458px] w-[458px] max-md:w-[300px] max-sm:w-[200px]" />
            }
          />
        </div>
      </main>
    </>
  );
}
