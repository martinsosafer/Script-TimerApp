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

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <div className="relative inline-block">
        {/* Log In link */}
        <Link
          href={isCheckingOut ? "/signin?origin=checkout" : "/signin"}
          className={`mr-16 font-poppins font-medium ${
            highlightSignUp ? "text-primary" : "text-slate-500"
          }`}
        >
          Login
        </Link>

        {/* Sign Up link */}
        <Link
          href={isCheckingOut ? "/register?origin=checkout" : "/register"}
          className={`ml-16 font-poppins font-medium ${
            highlightRegister ? "text-primary" : "text-slate-500"
          }`}
        >
          Sign In
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
