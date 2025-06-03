"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FormSwitcher({
  highlightSignUp = false,
  highlightRegister = false,
}) {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  const isCheckingOut = origin === "checkout";
  const isBooster = origin === "booster";

  const handleSigninOrigin = () => {
    if (isCheckingOut) {
      return "/signin?origin=checkout";
    }
    if (isBooster) {
      return "/signin?origin=booster";
    }
    return "/signin";
  };

  const handleRegisterOrigin = () => {
    if (isCheckingOut) {
      return "/register?origin=checkout";
    }
    if (isBooster) {
      return "/register?origin=booster";
    }
    return "/register";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="relative inline-block">
        {/* Log In link */}
        <Link
          href={handleSigninOrigin()}
          className={`mr-16 font-poppins font-medium ${
            highlightSignUp ? "text-primary" : "text-slate-500"
          }`}
        >
          Log In
        </Link>

        {/* Create link */}
        <Link
          href={handleRegisterOrigin()}
          className={`ml-16 font-poppins font-medium ${
            highlightRegister ? "text-primary" : "text-slate-500"
          }`}
        >
          Create
        </Link>

        {/* The blue and black lines */}
        <div className="top-full mt-1 flex w-96 justify-center">
          <div
            className={`h-1 flex-grow ${
              highlightSignUp ? "bg-primary" : "bg-slate-500"
            }`}
            style={{ maxWidth: "220px" }}
          ></div>
          <div
            className={`h-1 flex-grow ${
              highlightRegister ? "bg-blue-500" : "bg-slate-500"
            }`}
            style={{ maxWidth: "220px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
