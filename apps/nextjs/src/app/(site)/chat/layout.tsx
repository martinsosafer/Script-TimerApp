interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex h-full w-full justify-center overflow-hidden bg-[#FAFAFA]">
      {children}
    </div>
  );
}
