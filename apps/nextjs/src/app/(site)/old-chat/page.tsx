import type { Metadata } from "next";

import { nanoid } from "~/utils/helpers";
import { Chat } from "./chat/chat";

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
