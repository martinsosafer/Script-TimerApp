import { displayData } from "./utils";

interface CreditRowProps {
  subscription:
    | "FREE"
    | "FREE_TRIAL"
    | "STUDENT"
    | "CREATOR"
    | "BUSINESS"
    | "STUDENTCLMO"
    | "CREATORCLMO"
    | "BUSINESSCLMO"
    | "STUDENTCLYR"
    | "CREATORCLYR"
    | "BUSINESSCLYR"
    | "INACTIVE"
    | "ACTIVE"
    | "PAUSED"
    | "1"
    | "2";
  type: "cl_credit" | "11labs_credit" | "img_credit" | "openai_credit";
  creditsLeft: number;
}

export default function CreditRow({
  subscription,
  type,
  creditsLeft,
}: CreditRowProps) {
  const subscriptionData = displayData[subscription];
  if (!subscriptionData?.[type]) {
    console.error(`Invalid subscription or type: ${subscription}, ${type}`);
    return null; // Or handle the error appropriately
  }

  const { label, credits } = subscriptionData[type];

  const creditsUsed = credits - creditsLeft;

  // Multiply creditsLeft by 250 if type is "cl_credit"
  const displayedCreditsLeft =
    type === "cl_credit" ? creditsLeft * 250 : creditsLeft;

  return (
    <div className="mt-3 flex gap-4 px-12 py-2">
      <div className="flex flex-col">
        <span className="px-2 text-xs text-gray-400">{label} credits used</span>
        <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
          {creditsUsed}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="px-2 text-xs text-gray-400">
          {label} credits remaining
        </span>
        <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
          {displayedCreditsLeft}
        </div>
      </div>
    </div>
  );
}
