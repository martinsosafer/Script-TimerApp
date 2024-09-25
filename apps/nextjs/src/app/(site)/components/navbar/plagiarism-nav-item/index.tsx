import Link from "next/link";

import { IconCopyright, SirenIcon } from "@voiceai/ui/@/components/ui/icons";

export default function PlagNavItem() {
  return (
    <Link
      href="/plagiarism-detector"
      className="flex cursor-pointer flex-col items-center"
    >
      <div className="mb-2">
        <IconCopyright className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
        <SirenIcon className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
      </div>
      <span className=" font-poppins text-base font-medium">Plagiarism</span>
      <span className=" font-poppins text-base font-medium">& Ai Detector</span>
    </Link>
  );
}
