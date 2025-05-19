"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IconEye, IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

export default function RegisterForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/auth/register/`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("fullName"),
          email: formData.get("email"),
          password: formData.get("password"),
          ...(code ? { appSumoCode: code } : {}),
        }),
      });
      if (!response.ok) {
        throw Error("Email already exists");
      }
      if (response.ok) {
        router.push("/signin");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `${error as string}`,
        variant: "destructive",
      });
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="mx-auto flex w-full max-w-md flex-col gap-3"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="text-cp-black text-sm font-semibold">
          Full Name
        </label>
        <input
          name="fullName"
          placeholder="Enter your full name"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-cp-black text-sm font-semibold">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-cp-black text-sm font-semibold"
        >
          Password
        </label>
        <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Create a password"
            className="w-full outline-none"
            required
          />
          <IconEye
            className={`${passwordVisible && "text-gray-400"} cursor-pointer`}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`flex cursor-pointer items-center justify-center rounded-md bg-primary py-2 font-semibold text-white`}
      >
        {loading ? (
          <IconSpinner className="h-6 w-6 animate-spin" />
        ) : (
          "Create your account"
        )}
      </button>
    </form>
  );
}
