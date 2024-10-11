import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scipt Timer Tools",
  description: "Free tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col items-center">{children}</div>;
}
