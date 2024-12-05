import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FacebookIcon,
  IconCopyright,
  IconFooterLocation,
  IconFooterMail,
  IconFooterPhone,
  LinkedInIcon,
  TwitterIcon,
} from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";

export default function LpFooter() {
  const router = useRouter();
  return (
    <footer
      className={`${roboto.className} bg-cp-primary flex w-full flex-col items-center p-10 text-white`}
    >
      <div className="flex w-full justify-between">
        <div className="flex w-[206px] flex-col items-center">
          <div className="relative h-[144px] w-[144px]">
            <Image src="/logo-footer.png" alt="Co-Producer logo" fill />
          </div>
          <h4
            className={`${poppins.className} text-xl font-bold leading-[30px]`}
          >
            Co-Producer
          </h4>
          <h5 className="text-xs font-normal">created by Script Timer</h5>
          <p className="mt-5 w-full text-center text-[14px] font-bold leading-5">
            All the tools to deliver your story. Your voice matters.
          </p>
          <Button
            label="Sign up"
            onClick={() => router.push("/register")}
            type="accent"
            fit
            className="mt-10"
          />
        </div>
        <div className="flex w-[206px] flex-col">
          <h5 className={`${poppins.className} text-xl font-bold leading-7`}>
            Quick Links
          </h5>
          <Link className="mt-4 text-[16px] leading-[22px]" href="/">
            Home
          </Link>
          <Link className="mt-3 text-[16px] leading-[22px]" href="/">
            About Us
          </Link>
          <Link className="mt-3 text-[16px] leading-[22px]" href="/">
            Blog
          </Link>
          <Link className="mt-3 text-[16px] leading-[22px]" href="/">
            Product
          </Link>
          <Link className="mt-3 text-[16px] leading-[22px]" href="/">
            Contact
          </Link>
        </div>
        <div className="flex w-[206px] flex-col">
          <h5 className={`${poppins.className} text-xl font-bold leading-7`}>
            Connect with us
          </h5>
          <div className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]">
            <IconFooterPhone /> +1 888.899.8910
          </div>
          <div className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]">
            <IconFooterMail /> info@coproducer.ai
          </div>
          <div className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]">
            <IconFooterLocation /> Hollywood, Miami, USA
          </div>
        </div>
        <div className="flex w-[206px] flex-col">
          <h5 className={`${poppins.className} text-xl font-bold leading-7`}>
            Social Links
          </h5>
          <Link
            href="https://www.facebook.com/RipMediaGroup"
            className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]"
          >
            <FacebookIcon className="h-6 w-6" /> Facebook
          </Link>
          <Link
            href="https://www.linkedin.com/in/mauryrogow/"
            className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]"
          >
            <LinkedInIcon className="h-6 w-6" /> LinkedIn
          </Link>
          <Link
            href="https://x.com/ripmediagroup"
            className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]"
          >
            <TwitterIcon className="h-6 w-6" /> Twitter
          </Link>
        </div>
      </div>
      <p className="mt-9 flex items-center gap-1 text-[16px]">
        Copyright <IconCopyright /> 2024 Co-Producer. All rights reserved.
      </p>
    </footer>
  );
}
