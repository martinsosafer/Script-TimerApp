import { ChatHistory } from "./chathistory";
import { SidebarMobile } from "./sidebarmobile";

interface LeftMobileProps {
  userId?: string;
}
export function LeftMobile({ userId }: LeftMobileProps) {
  return (
    <SidebarMobile>
      {/* @ts-ignore */}
      <ChatHistory userId={userId} />
    </SidebarMobile>
  );
}
