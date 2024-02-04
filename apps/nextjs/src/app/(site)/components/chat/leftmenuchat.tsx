import React from "react";

import { ChatHistory } from "./chathistory";
import { Leftbar } from "./leftbar";

interface LeftMenuProps {
  userId?: string;
}
export function LeftMenu({ userId }: LeftMenuProps) {
  return (
    <Leftbar className="peer absolute inset-y-0 z-30 hidden h-screen -translate-x-full border-r bg-muted bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <ChatHistory userId={userId} />
    </Leftbar>
  );
}

{
  /* <div className="h-screen w-[250px] bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 p-4 text-white"></div> */
}
