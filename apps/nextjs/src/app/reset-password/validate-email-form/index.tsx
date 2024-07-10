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
      <input
        name="email"
        type="email"
        placeholder="Enter your email address"
        className="rounded-md border border-gray-300 px-3 py-2"
        required
      />
      {error && (
        <p className="text-center text-sm font-semibold text-red-800">
          {error}
        </p>
      )}
      {success && (
        <p className="text-center text-sm font-semibold text-primary">
          Email validation successful, please check your email.
        </p>
      )}
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
    </form>
  );
}
