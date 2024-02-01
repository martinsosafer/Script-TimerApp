import React from "react";

import { auth } from "@voiceai/auth";
import { Button } from "@voiceai/ui";
import { IconPlus } from "@voiceai/ui/@/components/ui/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { useSidebar } from "~/app/hooks/useSideBar";
import { api } from "~/utils/api";
import { ChatHistory } from "./chat/chathistory";

interface SidebarDesktopProps {}

const SidebarDesktop: React.FC<SidebarDesktopProps> = () => {
  const { isSidebarOpen, isLoading, toggleSidebar } = useSidebar();
  //we get the userid
  const { data: session } = api.auth.getSession.useQuery();

  const userId = session?.user?.id;

  const handleButtonClick = () => {
    toggleSidebar();
  };

  const mockupMessages = [
    { id: 1, text: "Hello!" },
    { id: 2, text: "How are you?" },
    { id: 3, text: "Nice to meet you!" },
    { id: 4, text: "I'm doing well, thank you." },
    { id: 5, text: "Any exciting plans for the weekend?" },
    {
      id: 6,
      text: "I heard about a great movie...",
    },
    // Add more messages as needed
  ];
  // Assume you have some logic to check if the user is authenticated
  // const isAuthenticated = auth(); // Add your actual authentication logic

  // if (!isAuthenticated?.user?.id) {
  //   return null;
  // }

  return (
    <div>
      <div>
        <Button variant="default" size="default" onClick={handleButtonClick}>
          <IconPlus />
        </Button>
      </div>
      <div
        data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
        className={cn(
          " absolute inset-y-0 z-30 mt-16 hidden -translate-x-full border-r  bg-foreground duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]",
        )}
      >
        <ChatHistory messages={mockupMessages} userId={userId} />
        {/* <ChatHistory userId={isAuthenticated.user.id} />  */}
        {/* Add the Button component here */}
      </div>
    </div>
  );
};

export default SidebarDesktop;
