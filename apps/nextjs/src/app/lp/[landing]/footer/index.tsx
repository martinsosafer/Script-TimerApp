import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

import {
  FacebookIcon,
  IconFooterLocation,
  IconFooterMail,
  IconFooterPhone,
  LinkedInIcon,
} from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";

export default function LpFooter({
  session,
  path,
}: {
  session: Session | null | undefined;
  path: string;
}) {
  const router = useRouter();
  return (
    <footer
      className={`${roboto.className} bg-cp-primary flex w-full flex-col items-center p-6 text-white lg:p-10`}
    >
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
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
            label="Try it free"
            onClick={() => router.push(session ? "/" : `${path}/#loginForm`)}
            type="accent"
            fit
            className="mt-10"
          />
        </div>
        <div className="flex w-[206px] flex-col">
          <h5 className={`${poppins.className} text-xl font-bold leading-7`}>
            Quick Links
          </h5>
          <Link
            className="mt-4 text-[16px] leading-[22px]"
            href={session ? "/" : "/register"}
          >
            Home
          </Link>
          <Link className="mt-3 text-[16px] leading-[22px]" href="/">
            About Us
          </Link>
          <Link
            className="mt-3 text-[16px] leading-[22px]"
            href="https://script-timer.com/blogs/"
          >
            Blog
          </Link>
          <Link className="mt-3 text-[16px] leading-[22px]" href="/">
            Product
          </Link>
          <Link
            className="mt-3 text-[16px] leading-[22px]"
            href="mailto:hello@co-producer.ai"
          >
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
            <IconFooterMail /> hello@co-producer.ai
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
            href="https://www.facebook.com/61566134112698"
            className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]"
          >
            <FacebookIcon className="h-6 w-6" /> Facebook
          </Link>
          <Link
            href="https://www.linkedin.com/company/co-producer/"
            className="mt-4 flex items-center gap-2 text-[16px] leading-[22px]"
          >
            <LinkedInIcon className="h-6 w-6" /> LinkedIn
          </Link>
        </div>
      </div>
      <p className="mt-9 px-10 text-center text-[16px] lg:px-0">
        Copyright &#169; 2024 Co-Producer. All rights reserved.
      </p>
    </footer>
  );
}
