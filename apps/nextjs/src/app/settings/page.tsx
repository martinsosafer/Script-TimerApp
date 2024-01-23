// import { signIn } from "@voiceai/auth";
import { api } from "~/utils/api";
import Stripe from "../_components/subscription/stripe";

// export const runtime = "edge";

export default async function Profile() {
  return (
    <>
      <Stripe />
    </>
  );
}
