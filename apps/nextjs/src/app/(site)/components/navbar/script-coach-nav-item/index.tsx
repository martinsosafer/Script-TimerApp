import Link from "next/link";

import {
  IconBrainCog,
  IconPencilLine,
} from "@voiceai/ui/@/components/ui/icons";

export default function ScriptCoachNavItem() {
  return (
    <Link href={`/chat`} className="flex flex-col items-center">
      <IconPencilLine className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
      <IconBrainCog className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 -translate-y-full transform opacity-0 transition-opacity  duration-300 group-hover:opacity-100" />
      <span className="font-poppins font-semibold">Script Coach</span>
    </Link>
  );
}
