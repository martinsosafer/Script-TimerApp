import type { Metadata } from "next";

import ToolsNavigator from "./admin-navigator";

export const metadata: Metadata = {
  title: "Scipt Timer Tools",
  description: "Free tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center">
      <ToolsNavigator />
      {children}
    </div>
  );
}
