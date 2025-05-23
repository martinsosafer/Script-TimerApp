"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  const isCheckingOut = origin === "checkout";
  const isBooster = origin === "booster"; // Add to handler and create new text for boosters

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <div className="relative h-[48px] w-[287px] p-4">
        <Image
          src={"/ScriptTimerLogoPrimary.png"}
          alt="Script-Timer AI Logo"
          fill
          priority
        />
      </div>
      <div className="justify-center text-center">
        {isCheckingOut ? (
          <>
            <h3 className="justify-center text-center font-poppins text-2xl font-semibold leading-[28px] text-black">
              To upgrade
            </h3>
            <h3 className="mt-1 justify-center text-center font-poppins text-2xl font-semibold leading-[28px] text-black">
              Log in & choose your plan
            </h3>
          </>
        ) : (
          <h3 className="text-cp-secondary justify-center text-center font-poppins text-xl font-normal leading-[28px]">
            Bring your projects to life
          </h3>
        )}
      </div>
    </div>
  );
}
