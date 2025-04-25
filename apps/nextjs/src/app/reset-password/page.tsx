import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import coverImg from "../../../public/login_photo.png";
import AnimatedGifs from "../signin/animtadgifs";
import ValidateEmailForm from "./validate-email-form";
import ValidatePassword from "./validatepassword";

export default async function ResetPassword() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-cp-background container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex hidden h-full w-full items-center justify-center lg:block">
        <AnimatedGifs />
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="mx-auto flex h-full flex-col justify-center gap-2 space-y-6 pt-6 sm:w-[360px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="relative h-[48px] w-[287px] p-5">
              <Image
                src={"/ScriptTimerLogoPrimary.png"}
                alt="Script-Timer AI Logo"
                fill
                priority
              />
            </div>

            <h3 className="font-poppins text-2xl font-normal text-tertiary">
              Bring your projects to life
            </h3>
          </div>

          <ValidatePassword />
        </div>
      </div>
    </div>
  );
}
