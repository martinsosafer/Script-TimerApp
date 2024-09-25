import Link from "next/link";

import { IconHandshake, IconWallet } from "@voiceai/ui/@/components/ui/icons";

export default function PlansNavItem() {
  return (
    <Link
      href="/plans"
      className="mb-3 flex cursor-pointer flex-col items-center"
    >
      <div className="mb-1">
        <IconHandshake className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
        <IconWallet className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
      </div>
      <span className=" font-poppins text-base font-medium">Plans</span>
    </Link>
  );
}
