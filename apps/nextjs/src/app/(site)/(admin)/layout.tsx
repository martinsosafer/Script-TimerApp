import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import AdminNavigator from "./admin-navigator";

export const metadata: Metadata = {
  title: "Scipt Timer Tools",
  description: "Free tools",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const allowedIds = [
    "b76a1726-e72e-43ca-b250-840af61dfdfe",
    "59d42d74-5b5a-4b52-aedb-8bcb8f076381",
    "a2b976c5-977d-41f3-8152-3ff7eec41f11",
    "abf2ceef-2864-4506-80ac-c4452023f003",
  ];

  if (!session?.user?.id || !allowedIds.includes(session.user.id)) {
    return <h2 className="flex w-full justify-center">Unauthorized</h2>;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <AdminNavigator />
      {children}
    </div>
  );
}
