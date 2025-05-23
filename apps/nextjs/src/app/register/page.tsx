import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import AnimatedGifs from "../signin/animtadgifs";
import { LoginWithEmailForm } from "../signin/email-login";
import FormSwitcher from "../signin/formswitcher";
import GoogleForm from "./google-form";
import RegisterForm from "./register-form";
import Header from "./subcomponents/header";

export default async function Register() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Gradient div moved to the left */}
      <div className="hidden h-full w-full items-center justify-center lg:block">
        <AnimatedGifs />
      </div>

      {/* Form moved to the right */}
      <div className="p-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
          <Header />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <FormSwitcher highlightSignUp={false} highlightRegister={true} />
            </div>

            <RegisterForm />

            <GoogleForm />

            <div className="relative">
              <div className="text-md relative flex justify-center pb-1 pt-2">
                <span className="bg-background px-2 text-black">or</span>
              </div>
            </div>

            <LoginWithEmailForm />

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
