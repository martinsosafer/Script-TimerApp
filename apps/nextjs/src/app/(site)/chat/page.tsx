import type { Metadata } from "next";

import { generateRandomString } from "~/utils/helpers";
import { Chat } from "../components/chat/chat";

export const metadata: Metadata = {
  title: "Script Coach",
  description: "Example music app using the components.",
};

export default function indexPage() {
  const id = generateRandomString();
  return (
    <div className="w-full">
      <Chat id={id} />
    </div>
  );
}
