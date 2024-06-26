"use client";

//import { signIn } from "@voiceai/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { credentialsLogin } from "../actions";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      console.log("FORM DATA", formData);
      const result = await credentialsLogin(formData);
      if (!result.error) {
        router.push("/");
        router.refresh();
        setLoading(false);
      }
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="mx-auto flex w-full max-w-md flex-col space-y-4"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="enter your email address"
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <button className="flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white">
        {loading ? (
          <IconSpinner className="h-6 w-6 animate-spin" />
        ) : (
          "Sign In "
        )}
      </button>
    </form>
  );
}
