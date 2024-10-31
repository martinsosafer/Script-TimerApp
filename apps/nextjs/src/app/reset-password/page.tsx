import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import coverImg from "../../../public/login_photo.png";
import Logo from "../(site)/components/logo";
import AnimatedGifs from "../signin/animtadgifs";
import ValidateEmailForm from "./validate-email-form";
import ValidatePassword from "./validatepassword";

export default async function ResetPassword() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AnimatedGifs />

      <div className="flex items-center justify-center p-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Logo className="text-5xl" />
            <div className="mr-10">
              <h3 className="font-poppins text-2xl font-normal text-tertiary">
                Bring your projects to life
              </h3>
            </div>
          </div>
          <div>
            <ValidatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
