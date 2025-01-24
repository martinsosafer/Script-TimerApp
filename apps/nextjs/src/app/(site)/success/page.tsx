import { auth } from "@voiceai/auth";

import { poppins } from "~/app/fonts";
import type { Plan } from "../plans-OLD/types";
import { getSubscription } from "../plans-OLD/utils";
import SuccessPage from "./sucesspage";

export default async function NewPlansPage() {
  const userSession = await auth();
  let subscription;

  if (userSession) {
    subscription = await getSubscription(
      userSession?.user.subscription?.planId,
    );
  }

  return (
    <div>
      <SuccessPage
        userSession={userSession}
        subscription={(subscription?.plan as Plan) ?? null}
      />
    </div>
  );
}
