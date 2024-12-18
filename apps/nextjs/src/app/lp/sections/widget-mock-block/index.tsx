import Image from "next/image";

import VoiceGeneratorMockup from "./mockwidget";

export default function MockUpBlock() {
  return (
    <div className="relative h-full w-full pb-8">
      <h3 className="mb-5 text-[28px] font-bold text-white" id="freeDemo">
        Explore what’s inside the app with this{" "}
        <span className="text-cp-accent">free sample</span>
      </h3>
      <VoiceGeneratorMockup />
      <div className="absolute -right-36 -top-10 z-0">
        <div className="relative h-[410px] w-[410px]">
          <Image src={"/freeSampleLpRobot.png"} alt="free sample robot" fill />
        </div>
      </div>
    </div>
  );
}
