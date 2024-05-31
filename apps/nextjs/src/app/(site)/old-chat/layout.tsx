import { auth } from "@voiceai/auth";

import { api } from "~/utils/api";
import ChatModal from "./chat/chatmodal";
import { LeftMenu } from "./chat/leftmenuchat";
import { LeftMobile } from "./chat/leftmobile";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }
  //Get subscription info

  return (
    <div className="relative flex h-full overflow-hidden ">
      <LeftMenu userId={session.user.id} />

      <div className="animate-in group w-full overflow-auto pl-0 duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <div className=" mb-6 ml-6 mt-2">
          <LeftMobile userId={session.user.id} />
        </div>
        {children}
      </div>
    </div>
  );
}
