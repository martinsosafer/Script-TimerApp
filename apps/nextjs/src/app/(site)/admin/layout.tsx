import type { ReactNode } from "react";
import React from "react";

import { auth } from "@voiceai/auth";

interface Props {
  children: ReactNode;
}
export default async function AdminLayout({ children }: Props) {
  const session = await auth();

  const allowedIds = [
    "b76a1726-e72e-43ca-b250-840af61dfdfe",
    "59d42d74-5b5a-4b52-aedb-8bcb8f076381",
    "a2b976c5-977d-41f3-8152-3ff7eec41f11",
    "abf2ceef-2864-4506-80ac-c4452023f003",
  ];

  if (!session?.user?.id || !allowedIds.includes(session.user.id)) {
    return null;
  }

  // console.log("session", session);
  return <>{children}</>;
}
