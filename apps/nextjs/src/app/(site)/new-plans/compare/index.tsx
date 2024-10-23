"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { roboto } from "~/app/fonts";
import Button from "../../components/button";

export default function Compare() {
  const router = useRouter();
  return (
    <section className="mt-[100px] flex flex-col items-center">
      <h2 className="text-cp-primary text-center text-[34px] font-bold">
        The most valuable software for creators
      </h2>
      <p className={`${roboto.className} mt-[12px] text-[16px]`}>
        Compare the benefits your Co-Producer gives you with the tools it
        replaces
      </p>
      <div className="relative mt-[48px] h-[720px] w-[740px]">
        <Image alt="Compare" src="/Compare-table.png" fill quality={100} />
      </div>
      <div className="flex w-[740px]">
        <div className="w-[300px]" />
        <div className="w-[220px]">
          <Button
            label="Get Started"
            onClick={() => router.push("#plans")}
            type="accent"
            fit
          />
        </div>
      </div>
    </section>
  );
}
