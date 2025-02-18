"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

//import { signIn } from "@voiceai/auth";

import { createUser } from "./actions";

export function LoginWithEmailForm() {
  const searchParams = useSearchParams();

  const code = searchParams.get("amp;code");

  const [loading, setLoading] = React.useState(false);
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      await createUser({ email, appSumoCode: code });
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="relative mb-4 mt-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            EMAIL ME A LINK
          </span>
        </div>
      </div>
      <form
        onSubmit={handleLogin}
        className="mx-auto flex w-full max-w-md flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white"
        >
          {loading ? (
            <IconSpinner className="h-6 w-6 animate-spin" />
          ) : (
            "Send me a link"
          )}
        </button>
      </form>
    </div>
  );
}
