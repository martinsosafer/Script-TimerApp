import Image from "next/image";
import Link from "next/link";

import { IconClose } from "@voiceai/ui/@/components/ui/icons";

import { roboto } from "~/app/fonts";

interface MonthlySpecialProps {
  name: string;
  description: string;
  promo_code: string;
  link: string;
  onClose: () => void;
  type: "promo" | "announcement";
}

export default function MonthlySpecial({
  name,
  description,
  promo_code,
  link,
  onClose,
  type,
}: MonthlySpecialProps) {
  return (
    <section
      className={`${type === "promo" ? "bg-cp-accent" : "bg-cp-secondary-lightest"} flex h-[56px] w-full items-center justify-center ${roboto.className} gap-5`}
    >
      <button
        className="absolute right-4 flex h-4 w-4 items-center justify-center"
        onClick={onClose}
      >
        <IconClose className=" h-4 w-4" />
      </button>
      <div className="flex items-center">
        <div className="relative flex h-[24px] w-[24px] items-center justify-center">
          <Image
            src={type === "promo" ? "/Time-Clock-Fire.svg" : "/Megaphone.svg"}
            alt="Monthly Special"
            fill
          />
        </div>
        <span className="ml-[8px] text-[14px] font-bold uppercase">{name}</span>
      </div>
      <span className="text-[14px]">{description}</span>
      {type === "promo" && (
        <span className="text-[14px]">
          Use one-time-promotion code:{" "}
          <span className="text-cp-primary font-bold">{promo_code}</span>
        </span>
      )}

      {link && (
        <Link
          href={link}
          className="flex items-center justify-center text-[14px] text-primary underline underline-offset-1 hover:font-semibold"
        >
          Take me there
        </Link>
      )}
    </section>
  );
}
