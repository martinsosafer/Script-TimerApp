"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { IconEye, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

export default function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("fullName"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (!response.ok) {
        throw Error("Email already exists");
      }
      if (response.ok) {
        router.push("/signin");
      }
    } catch (error) {
      alert(error);
      console.log("ERROR", error);
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
          placeholder="Enter your email address"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
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
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-semibold">
          Confirm Password
        </label>
        <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Please confirm your password."
            className="w-full outline-none"
            required
          />
          <IconEye
            className={`${confirmPasswordVisible && "text-gray-400"} cursor-pointer`}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`flex items-center justify-center rounded-md py-2 font-semibold text-white ${password !== confirmPassword ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-primary"}`}
        disabled={password !== confirmPassword}
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
