"use client";

import { useSearchParams } from "next/navigation";

import Logo from "~/app/(site)/components/logo";

export default function Header() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  const isCheckingOut = origin === "checkout";

  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <Logo />
      <div className="justify-center text-center">
        <h3 className="text-cp-secondary justify-center text-center font-poppins text-[20px] font-normal leading-[28px]">
          {isCheckingOut
            ? "Let's get started with your personalized & upgraded work space"
            : "Bring your projects to life"}
        </h3>
      </div>
    </div>
  );
}
