import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import { poppins } from "../fonts";
import RegisterForm from "../register/register-form";
import Header from "../register/subcomponents/header";
import AnimatedGifs from "../signin/animtadgifs";

export default async function RegisterDirect() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="bg-cp-background container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Side */}
      <div className="hidden h-full w-full items-center justify-center lg:block">
        <AnimatedGifs />
      </div>

      {/* Right Side */}
      <section className="flex w-full justify-center gap-4 pt-8">
        <div className="flex max-w-[350px] flex-col gap-5">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Header />
          </div>

          <p className={`${poppins.className} text-center`}>
            Register and start creating with Script-Timer features today!
          </p>

          <RegisterForm />

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
      </section>
    </main>
  );
}
