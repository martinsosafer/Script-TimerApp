import Image from "next/image";
import Link from "next/link";

import { signIn } from "@voiceai/auth";
import { cn } from "@voiceai/ui/@/lib/utils";

import coverImg from "../../../public/login-banner-photo.png";

export const runtime = "edge";

export default async function SignIn() {
  return (
    <>
      <>
        <div className="container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Log In to Script Timer
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your voice matters, lets get started
                </p>
              </div>
              <div className={cn("grid gap-6")}>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Continue with
                    </span>
                  </div>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await signIn("facebook", { redirectTo: "/" });
                  }}
                >
                  <button className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1877F2] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
                    <svg
                      version="1.1"
                      className="h-5 w-5"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 40 40"
                    >
                      <linearGradient
                        id="SVGID_1_"
                        gradientUnits="userSpaceOnUse"
                        x1="-277.375"
                        y1="406.6018"
                        x2="-277.375"
                        y2="407.5726"
                        gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)"
                      >
                        <stop offset="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <path
                        className="st0 fill-white"
                        d="M16.7,39.8C7.2,38.1,0,29.9,0,20C0,9,9,0,20,0s20,9,20,20c0,9.9-7.2,18.1-16.7,19.8l-1.1-0.9h-4.4L16.7,39.8z"
                      />
                      <path
                        className="st1 fill-[#1877F2]"
                        d="M27.8,25.6l0.9-5.6h-5.3v-3.9c0-1.6,0.6-2.8,3-2.8h2.6V8.2c-1.4-0.2-3-0.4-4.4-0.4c-4.6,0-7.8,2.8-7.8,7.8V20
	h-5v5.6h5v14.1c1.1,0.2,2.2,0.3,3.3,0.3c1.1,0,2.2-0.1,3.3-0.3V25.6H27.8z"
                      />
                    </svg>

                    <span className="text-sm font-semibold leading-6">
                      Facebook
                    </span>
                  </button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/" });
                  }}
                >
                  <button className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    <span className="text-sm font-semibold leading-6">
                      Google
                    </span>
                  </button>
                </form>
              </div>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
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
          <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <Image
              className="h-md absolute bottom-0 right-0 z-20 hidden w-full rounded-lg object-cover md:block"
              src={coverImg}
              alt="Picture of the author"
            />
            {/* <div className="absolute inset-0 z-20 flex-1 rounded-lg lg:block"> */}

            {/* </div> */}
            {/* <div className="relative hidden w-0 flex-1 lg:block">
              <Image
                className="absolute inset-0 h-full w-full object-cover"
                src={coverImg}
                alt="Picture of the author"
              />
            </div> */}
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Script Timer
            </div>
            <div className="relative z-20">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;Script Timer and the Ai has transformed the way we
                  create, test, and deliver our best content. And, it saves us
                  hours AND expense every week. Game-changer!&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
