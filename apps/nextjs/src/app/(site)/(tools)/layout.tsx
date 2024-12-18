import type { Metadata } from "next";

import PageHeader from "../components/page-header";
import ToolsNavigator from "./tools-navigator";

export const metadata: Metadata = {
  title: "Scipt Timer Tools",
  description: "Free tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cp-background flex w-full flex-col items-center">
      <PageHeader
        title="Free tools"
        subtitle="Easy to use tools to improve your script"
      />
      <ToolsNavigator />
      {children}
    </div>
  );
}
