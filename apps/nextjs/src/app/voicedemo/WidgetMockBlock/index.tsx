import Image from "next/image";

import { poppins } from "~/app/fonts";
import BotInPhoneImg from "../../../../public/BotInphone.png";
import VoiceGeneratorMockup from "./mockwidget";

export default function MockUpBlock() {
  return (
    <div className="h-full w-full bg-gradient-to-t from-[#125FF133] to-[#0066FF]">
      <div className=" pb-[160px] pt-[60px]">
        <VoiceGeneratorMockup />
      </div>
    </div>
  );
}
