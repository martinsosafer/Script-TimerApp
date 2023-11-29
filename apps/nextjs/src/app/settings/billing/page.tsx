import { db, desc, eq, schema } from "@voiceai/db";
import { checkSession } from "@voiceai/pay";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import Stripe from "~/app/_components/subscription/stripe";

export default async function SettingsAccountPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (searchParams?.session_id) {
    const session = await checkSession(searchParams?.session_id as string);

    await db
      .insert(schema.subscriptions)
      .values({
        userId: session.client_reference_id!,
        plan: "STARTER",
        status: session.status === "complete" ? "ACTIVE" : "INACTIVE",
        metadata: session,
      })
      .onConflictDoUpdate({
        target: schema.subscriptions.userId,
        set: {
          status: session.status === "complete" ? "ACTIVE" : "INACTIVE",
          metadata: session,
        },
      });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Subscribe, change your plan, and cancel
        </p>
      </div>
      <Separator />

      <Stripe />
    </div>
  );
}
