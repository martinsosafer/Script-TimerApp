"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

export default function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (response.ok) {
      router.push("/signin");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="mx-auto flex w-full max-w-md flex-col space-y-4"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Full Name
        </label>
        <input
          name="fullName"
          placeholder="Enter your full name"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="Eenter your email address"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          name="password"
          type="password"
          placeholder="Enter your password"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-semibold">
          Confirm Password
        </label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          name="confirmPassword"
          type="password"
          placeholder="Plase confirm your password."
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className={`flex items-center justify-center rounded-md py-2 font-semibold text-white ${password !== confirmPassword ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-primary"}`}
        disabled={password !== confirmPassword}
      >
        {loading ? <IconSpinner className="h-6 w-6 animate-spin" /> : "Sign Up"}
      </button>
    </form>
  );
}
