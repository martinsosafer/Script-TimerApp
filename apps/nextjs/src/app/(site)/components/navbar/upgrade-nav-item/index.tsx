import Link from "next/link";

import { IconUpgrades } from "@voiceai/ui/@/components/ui/icons";

export default function UpgradeNavItem() {
  return (
    <Link
      href="/new-plans"
      className="group flex cursor-pointer items-center gap-2"
    >
      <span className=" font-poppins text-white group-hover:text-white/80 ">
        Upgrade
      </span>
      <IconUpgrades className="text-white group-hover:text-white/80 " />
    </Link>
  );
}
