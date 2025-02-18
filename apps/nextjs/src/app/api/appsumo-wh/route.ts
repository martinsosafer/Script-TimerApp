import { appSumoSubscription } from "./actions";
import type { WhResponse } from "./types";

export async function POST(req: Request) {
  //const data = req.body;
  const data = (await req.json()) as WhResponse;
  console.log({ data });
  try {
    if (data.event === "purchase") {
      await appSumoSubscription.insertSubscription(data);
    } else if (data.event === "activate") {
      await appSumoSubscription.activateSubscription(data);
    } else if (data.event === "upgrade" || data.event === "downgrade") {
      await appSumoSubscription.upgradeOrDowngradeSubscription(data);
    } else if (data.event === "deactivate") {
      await appSumoSubscription.deactivateSubscription(data);
    }
    return new Response(
      JSON.stringify({
        event: data.event,
        success: true,
      }),
    );
  } catch (error) {
    console.error(error);
  }
}
