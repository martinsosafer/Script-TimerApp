import { LeftMenu } from "../components/chat/leftmenuchat";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative">
      {/* Menú a la izquierda */}
      <div className="absolute left-0 top-0 z-10 h-screen overflow-hidden">
        <LeftMenu />
      </div>

      {/* Contenido principal (chat) */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
