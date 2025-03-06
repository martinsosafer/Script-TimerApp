import React, { useState } from "react";

import { signIn } from "@voiceai/auth";
import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { createUser } from "~/app/signin/actions";
import { handleGoogleSignIn } from "./actions";

const EmailOrGoogleForm = () => {
  const [loading, setLoading] = useState(false);

  async function handleEmailLink(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      await createUser({ email, appSumoCode: null });
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  return (
    <div className="flex w-[90%] flex-col items-center gap-1 lg:w-[448px] lg:gap-7">
      {/* Email link form */}
      <div className="w-full">
        <div className="relative mb-4 mt-1">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              EMAIL ME A LINK
            </span>
          </div>
        </div>
        <form
          onSubmit={handleEmailLink}
          className="mx-auto flex w-full flex-col space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="rounded-md border border-gray-300 px-3 py-2 text-[0.9rem] text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-cp-secondary flex h-[42px] items-center justify-center rounded-md py-2 text-[0.9rem] font-semibold text-white"
          >
            {loading ? (
              <IconSpinner className="h-6 w-6 animate-spin" />
            ) : (
              "Email my immediate access"
            )}
          </button>
        </form>
      </div>

      <p>or</p>

      {/* Google button */}
      <form
        action={handleGoogleSignIn}
        className="mx-auto flex w-full max-w-md flex-col space-y-4"
      >
        <button className="flex h-[42px] w-full items-center justify-center gap-3 rounded-md bg-slate-100 px-3 py-1.5 text-black shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] ">
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
            Sign up with Google
          </span>
        </button>
      </form>
    </div>
  );
};

export default EmailOrGoogleForm;
