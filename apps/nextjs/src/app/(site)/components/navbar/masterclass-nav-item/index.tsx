import Link from "next/link";

import {
  IconGlasses,
  IconMonitorPlay,
} from "@voiceai/ui/@/components/ui/icons";

export default function MasterclassesNavItem() {
  return (
    <Link
      href="/masterclasses"
      className=" flex cursor-pointer flex-col items-center"
    >
      <div className="mb-2">
        <IconGlasses className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
        <IconMonitorPlay className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
      </div>
      <span className=" font-poppins font-semibold">Story</span>
      <span className=" font-poppins font-semibold">University</span>
    </Link>
  );
}
