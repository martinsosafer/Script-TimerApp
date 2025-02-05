import Image from "next/image";

import type { Session } from "@voiceai/auth";

import VoiceGeneratorMockup from "./mockwidget";

export default function MockUpBlock({
  session,
  path,
}: {
  session: Session | null | undefined;
  path: string;
}) {
  return (
    <div className="relative">
      <div className="relative z-20 w-full">
        <h3
          className="mb-5 w-[230px] text-[22px] font-bold text-white lg:w-full lg:text-[28px]"
          id="freeDemo"
        >
          Explore what’s inside the app with this{" "}
          <span className="text-cp-accent">free sample</span>
        </h3>

        <VoiceGeneratorMockup session={session} path={path} />
      </div>
      <div className="absolute right-0 top-12 z-0 lg:-right-36 lg:-top-10">
        <div className="relative h-[110px] w-[110px] lg:h-[410px] lg:w-[410px]">
          <Image src={"/freeSampleLpRobot.png"} alt="free sample robot" fill />
        </div>
      </div>
    </div>
  );
}
