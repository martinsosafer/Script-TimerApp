"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  const isCheckingOut = origin === "checkout";
  const isBooster = origin === "booster"; // Add to handler and create new text for boosters

  const handleMessage = () => {
    if (isCheckingOut && pathname === "/signin") {
      return (
        <>
          <h3 className="text-cp-black justify-center text-center font-poppins text-xl font-semibold leading-[28px]">
            To upgrade
          </h3>
          <h3 className="text-cp-black justify-center text-center font-poppins text-xl font-semibold leading-[28px]">
            Log in & choose your plan
          </h3>
        </>
      );
    }
    if (isCheckingOut && pathname === "/register") {
      return (
        <h3 className="text-cp-black justify-center text-center font-poppins text-xl font-semibold leading-[28px]">
          Create your free account
        </h3>
      );
    }
    return (
      <h3 className="text-cp-secondary justify-center text-center font-poppins text-xl font-normal leading-[28px]">
        Bring your projects to life
      </h3>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="relative h-[48px] w-[287px] p-4">
        <Image
          src={"/ScriptTimerLogoPrimary.png"}
          alt="Script-Timer AI Logo"
          fill
          priority
        />
      </div>

      <div className="justify-center text-center">{handleMessage()}</div>
    </div>
  );
}
