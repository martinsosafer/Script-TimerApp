import Link from "next/link";

import Button from "~/app/(site)/components/button";
import Logo from "~/app/(site)/components/logo";
import { poppins } from "~/app/fonts";
import AnimatedGifs from "~/app/signin/animtadgifs";
import AnimatedGifs2 from "~/app/signin/animtadgifs/animation2";
import FormSwitcher from "~/app/signin/formswitcher";
import SignUpForm from "~/app/signin/signupform";

export default function DemoHero() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left section */}
      <div className="relative flex h-full flex-col items-start justify-center pb-[160px] pt-[160px]">
        <div className="w-full">
          <div className="flex flex-col pl-[180px] pr-[60px]">
            <div className={`text-start ${poppins.className}`}>
              <p className="text-cp-primary mb-[20px] text-[24px] font-bold leading-[34px]">
                You're not just creating content.
              </p>
              <h1 className="text-cp-primary text-[58px] font-bold leading-[70px]">
                You're creating <br />
                <span className="text-cp-secondary">an experience</span>.
              </h1>
              <p className="text-cp-primary mt-[31px] text-[20px] font-normal leading-[28px]">
                Engage your audience, create scripts, voice <br /> overs,
                storyboards, blogs and more with our <br /> custom built AI
                library!
              </p>
            </div>
            <div className="mt-[93px] flex items-center gap-[40px]">
              <Link href="/demo">
                <Button type="secondary" label="Free Demo" width="w-[206px]" />
              </Link>
              <Link href="/register">
                <Button type="primary" label="Try it free" width="w-[206px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - AnimatedGifs */}
      <div className="hidden h-full min-h-screen w-full items-center justify-center lg:block">
        <AnimatedGifs2 marginTop={-80} />
      </div>
    </div>
  );
}
