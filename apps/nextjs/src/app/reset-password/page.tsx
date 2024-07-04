import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import coverImg from "../../../public/login_photo.png";
import ValidateEmailForm from "./validate-email-form";

export default async function ResetPassword() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="container relative min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-poppins text-2xl font-semibold tracking-tight">
              Reset your Password
            </h1>
            <p className="text-sm text-muted-foreground">
              You will receive a reset password link in your email.
            </p>
          </div>
          <ValidateEmailForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Go back to{" "}
            <Link
              href="/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              SIGN IN
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="relative h-full flex-col overflow-hidden bg-gradient-to-b from-blue-300 to-blue-700 p-10 text-white dark:border-r lg:flex">
        <Image
          className="h-md absolute bottom-0 left-10  right-0 z-20 hidden w-full rounded-lg  border-4 border-primary object-cover lg:block"
          src={coverImg}
          alt="Picture of the author"
        />

        <div className="absolute inset-0 " />
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
          <h3 className="font-poppins">Script Timer</h3>
        </div>
        <div className="relative z-20">
          <blockquote className="space-y-2 rounded-md  p-4">
            <p className="text-lg">
              &ldquo;Script Timer Ai has been a revelation for my scriptwriting
              and production process, making it an essential tool for any
              speaker or creator looking to deliver impactful messages with
              confidence and ease.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
