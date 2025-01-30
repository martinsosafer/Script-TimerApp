interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="bg-cp-background relative flex h-full w-full justify-center overflow-hidden">
      {children}
    </div>
  );
}
