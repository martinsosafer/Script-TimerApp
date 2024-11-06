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
}

export default function MonthlySpecial({
  name,
  description,
  promo_code,
  link,
  onClose,
}: MonthlySpecialProps) {
  return (
    <section
      className={`bg-cp-accent flex h-[56px] w-full items-center justify-center ${roboto.className} gap-4`}
    >
      <button
        className="absolute right-4 flex h-4 w-4 items-center justify-center"
        onClick={onClose}
      >
        <IconClose className=" h-4 w-4" />
      </button>
      <div className="flex items-center">
        <div className="relative flex h-[24px] w-[24px] items-center justify-center">
          <Image src="/Time-Clock-Fire.svg" alt="Monthly Special" fill />
        </div>
        <span className="ml-[8px] text-[14px] font-bold uppercase">{name}</span>
      </div>
      <span className="text-[14px]">{description}</span>
      <span className="text-[14px]">
        Add one-time-promotion code:{" "}
        <span className="text-cp-primary font-bold">{promo_code}</span>
      </span>
      {link && (
        <Link
          href={link}
          className="relative flex h-[24px] w-[24px] items-center justify-center text-[14px]"
        >
          <Image src="/takeMeThere.svg" alt="Monthly Special" fill />
        </Link>
      )}
    </section>
  );
}
