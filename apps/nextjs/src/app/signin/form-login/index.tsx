"use client";

//import { signIn } from "@voiceai/auth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IconEye, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { useSharedState } from "~/app/context/state";
import { credentialsLogin } from "../actions";

export default function LoginForm() {
  const router = useRouter();

  const { productId } = useSharedState();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const result = await credentialsLogin(formData);
      if (!result.error) {
        if (productId) {
          const res = await fetch("api/checkout", {
            method: "POST",
            body: JSON.stringify({
              productId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const {
            session: { url },
          } = await res.json();

          return (window.location.href = url as string);
        }
        router.push("/?origin=login");
        router.refresh();
      }
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleLogin}
      className="mx-auto flex w-full max-w-md flex-col gap-3 pt-4"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="text-cp-black text-sm font-bold">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="enter your email address"
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-cp-black text-sm font-bold">
          Password
        </label>
        <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="enter your password"
            className="w-full outline-none"
          />
          <IconEye
            className={`${passwordVisible && "text-gray-400"} cursor-pointer`}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
      </div>
      <div className="flex items-end justify-end">
        <p className=" text-cp-gray-500 text-end text-sm">
          Forgot your Password?{" "}
          <Link
            href="/reset-password"
            className="text-cp-primary-light hover:text-cp-primary font-semibold underline-offset-4"
          >
            Reset it here
          </Link>{" "}
        </p>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center rounded-md bg-primary py-2 font-semibold text-white"
      >
        {loading ? (
          <IconSpinner className="h-6 w-6 animate-spin" />
        ) : (
          "Sign In "
        )}
      </button>
    </form>
  );
}
