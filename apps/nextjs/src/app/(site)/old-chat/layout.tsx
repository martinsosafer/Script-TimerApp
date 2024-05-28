import { auth } from "@voiceai/auth";

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
    <div className="relative flex h-full w-full justify-center overflow-hidden bg-[#FAFAFA] py-10">
      {children}
    </div>
  );
}
