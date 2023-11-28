import { auth } from "@voiceai/auth";

import { History } from "../_components/history";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <History />
    </>
  );
}
