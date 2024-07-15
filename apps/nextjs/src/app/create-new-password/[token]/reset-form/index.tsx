"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { IconEye, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/create-new-password", {
      method: "POST",
      body: JSON.stringify({
        password: formData.get("password"),
        token,
      }),
    });
    if (response.ok) {
      router.push("/signin");
    } else {
      setError(response.statusText);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleResetPassword}
      className="mx-auto flex w-full max-w-md flex-col gap-2"
    >
      <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
        <input
          name="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Create a new password"
          className="w-full outline-none"
          required
        />
        <IconEye
          className={`${passwordVisible && "text-gray-400"} cursor-pointer`}
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      </div>
      {error && <p className="text-sm text-red-800">{error}</p>}
      <button
        type="submit"
        className="mt-4 flex cursor-pointer items-center justify-center rounded-md bg-primary py-2 font-semibold text-white"
      >
        {loading ? (
          <IconSpinner className="h-6 w-6 animate-spin" />
        ) : (
          "Create new Password"
        )}
      </button>
    </form>
  );
}
