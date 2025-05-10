import Link from "next/link";

import { Button } from "@voiceai/ui";

import { RevealText } from "~/app/animations/RevealText";
import { poppins } from "~/app/fonts";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function HeroSection() {
  return (
    <>
      <div
        className={`${poppins.className} from-cp-primary relative flex justify-center bg-gradient-to-br to-[#000000] pb-16 pt-10 lg:pb-16 lg:pt-20`}
      >
        <div className="flex flex-col gap-14">
          <div className="flex h-full max-w-[1024px] flex-col items-start justify-items-center gap-[24px] lg:flex-row lg:justify-between lg:gap-12">
            {/* Text Content (left) */}
            <div className="flex w-full max-w-[600px] flex-col gap-3 px-4 md:max-w-lg lg:w-[50%] lg:text-start">
              <RevealText>
                <h1 className="text-3xl font-bold leading-[38.3px] text-white md:text-[52px] md:leading-[60px]">
                  <span className="text-cyan-300">Create Voices </span>
                  <br />
                  {""} & Scripts
                  <br />
                  in seconds
                </h1>
              </RevealText>
              <RevealText>
                <p className="text-[18px] font-normal leading-[25px] text-white lg:text-[20px] lg:leading-[28px]">
                  Text to Speech, AI Voices, Script Writing,{" "}
                  <br className="hidden lg:block" />
                  Image Creation to make your scripts amazing.{" "}
                </p>
              </RevealText>
            </div>

            {/* Video (right) */}
            <div className="flex h-full w-full items-center justify-center lg:w-[50%]">
              <MotionTransition>
                <div className="outline-cp-primary-lightest h-[182px] w-[326px]  rounded-lg outline lg:h-[264px] lg:w-[468px]">
                  <iframe
                    src="https://player.vimeo.com/video/1020211350?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="Script-Timer Ai Onboarding video"
                  />
                </div>
              </MotionTransition>
            </div>
          </div>
          {/* Bottom (center) */}
          <Link href="/texttovoice" className="flex w-full justify-center">
            <RevealText>
              <Button
                variant="accent"
                size="lg"
                className="md:px-11 md:py-8 md:text-lg"
              >
                Start by listening to your scripts here
              </Button>
            </RevealText>
          </Link>
        </div>
      </div>
    </>
  );
}
