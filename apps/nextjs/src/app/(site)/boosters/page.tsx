import { auth } from "@voiceai/auth";
import { IlustrationTodayOnly } from "@voiceai/ui/@/ilustrations";

import { poppins, roboto } from "~/app/fonts";

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
      <div className="flex h-[500px] flex-col  items-center">
        <h1 className="text-4xl font-bold">Boosters</h1>
        <p className="mt-2 text-lg">Coming soon...</p>
      </div>
    </>
  );
}
