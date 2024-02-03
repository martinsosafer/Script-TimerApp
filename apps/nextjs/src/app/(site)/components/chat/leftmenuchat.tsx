import React from "react";

import { auth } from "@voiceai/auth";

import { ChatHistory } from "./chathistory";

export async function LeftMenu() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div className="h-screen w-[250px] bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 p-4 text-white">
      <ChatHistory userId={session.user.id} />
    </div>
  );
}
