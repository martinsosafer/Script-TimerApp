import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import coverImg from "../../../public/login_photo.png";
import Logo from "../(site)/components/logo";
import AnimatedGifs from "../signin/animtadgifs";
import FormSwitcher from "../signin/formswitcher";
import SignUpForm from "../signin/signupform";
import GoogleForm from "./google-form";
import RegisterForm from "./register-form";

export default async function Register() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Gradient div moved to the left */}
      <AnimatedGifs />

      {/* Form moved to the right */}
      <div className="p-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Logo />
            <div className="justify-center text-center">
              <h3 className="text-cp-secondary justify-center text-center font-poppins text-[20px] font-normal leading-[28px]">
                Bring your projects to life
              </h3>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <FormSwitcher highlightSignUp={false} highlightRegister={true} />
            </div>

            <RegisterForm />
            <div className="relative">
              <div className="text-md relative mb-2 mt-2 flex justify-center">
                <span className="bg-background px-2 text-black">or</span>
              </div>
            </div>
            <GoogleForm />
            <div className="mt-5">
              <p className="px-8 text-center text-sm text-black">
                By signing in, you agree to our{" "}
                <Link
                  href="https://script-timer.com/script-timer-terms-of-service/"
                  target="_blank"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="https://script-timer.com/script-timer-privacy-policy"
                  target="_blank"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
