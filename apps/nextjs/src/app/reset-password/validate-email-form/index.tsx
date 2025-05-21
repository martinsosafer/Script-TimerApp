"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

export default function ValidateEmailForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSendResetMail(event: FormEvent<HTMLFormElement>) {
    setError(null);
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
      }),
    });
    if (response.ok) {
      setSuccess(true);
    } else {
      setError(response.statusText);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSendResetMail}
      className="mx-auto flex w-full max-w-md flex-col gap-2"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-cp-black text-sm font-semibold">
          Enter your email address
        </label>
        <input
          name="email"
          type="email"
          placeholder="Email adress"
          className="rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      {error && (
        <p className="py-4 text-center text-lg font-semibold text-[#FF3B3B]">
          {error}
        </p>
      )}

      {success && (
        <div className="py-4 text-center text-lg font-semibold text-primary">
          <p>Email validation successful!</p>
          <p>Please check your email</p>
        </div>
      )}

      {!error && !success ? (
        <button
          type="submit"
          className="mt-4 flex cursor-pointer items-center justify-center rounded-md bg-primary py-2 font-semibold text-white"
        >
          {loading ? (
            <IconSpinner className="h-6 w-6 animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      ) : null}
    </form>
  );
}
