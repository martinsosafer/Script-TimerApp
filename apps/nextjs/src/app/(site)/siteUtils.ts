export function hasValidPlan(plan: string | undefined) {
  const isSubscriptionActive =
    plan === "STUDENT" ||
    plan === "CREATOR" ||
    plan === "BUSINESS" ||
    plan === "FREE_TRIAL";
  return isSubscriptionActive;
}
