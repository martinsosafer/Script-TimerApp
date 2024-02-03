import type { Metadata } from "next";

import { nanoid } from "~/utils/helpers";
import { Chat } from "../components/chat/chat";
// import LeftMenu from "../components/chat/leftmenuchat";
import { SidebarDesktop } from "../components/sidebar-desktop";

export const metadata: Metadata = {
  title: "Script Coach",
  description: "Example music app using the components.",
};

export default function indexPage() {
  const id = nanoid();

  return (
    <div>
      <Chat id={id} />
    </div>
  );
}
