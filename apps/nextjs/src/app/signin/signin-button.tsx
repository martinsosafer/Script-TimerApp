"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { Icons } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";

import { createUser } from "./actions";

const initialState = {
  message: "",
};

export function LoginWithEmailForm() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            LEGACY USERS: LOGIN VIA LINK
          </span>
        </div>
      </div>
      <p className="mb-3 p-2 text-center text-sm text-muted-foreground">
        Please create a password before 10.1.24
      </p>
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <SubmitButton />

          {state?.message && (
            <p className="text-center text-red-500">{state?.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      onClick={(e) => {
        // prevent multiple submits
        if (pending) e.preventDefault();
      }}
    >
      {pending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Signing In
        </>
      ) : (
        <>Sign In with Email</>
      )}
    </Button>
  );
}
