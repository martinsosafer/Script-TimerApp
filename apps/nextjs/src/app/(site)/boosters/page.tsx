import Image from "next/image";

import { auth } from "@voiceai/auth";
import { IlustrationTodayOnly } from "@voiceai/ui/@/ilustrations";

import { poppins, roboto } from "~/app/fonts";
import BoosterCard from "./BoosterCard/BoosterCard";

export default async function BoostersPage() {
  const session = await auth();

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

      <main className="flex flex-col items-center gap-6 px-3 py-8">
        <p
          className={`bg-cp-accent-lightest w-full rounded-lg px-[12px] py-[8px] text-sm/none leading-[25px] text-[#212121] shadow-md lg:max-w-5xl lg:px-[24px] lg:py-[12px]`}
        >
          These credits are stored in your account and and can be used all year,
          locking in discounted credits long term (as long as your membership is
          active).
        </p>

        <BoosterCard
          amount={300}
          title="Images Boost"
          price={77}
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
              src={"/boostersImages/boosters_imageGeneration2.png"}
              alt="image generation"
              // width={410}
              // height={472}
              fill
              className={`rounded-2xl object-contain object-top`}
              priority
            />
          }
          imageBottomLeft={
            <Image
              src={"/boostersImages/boosters_creationLab.png"}
              alt="Creation Lab"
              fill
              className={`rounded-lg`}
            />
          }
          imageBottomRight={
            <Image
              src={"/boostersImages/boosters_storyboard.png"}
              alt="Storyboard"
              fill
              className={`rounded-lg`}
            />
          }
        />
      </main>
    </>
  );
}
