export interface I_Plan {
  id: string;
  interval: string;
  active: boolean;
  amount: number;
}

export type SubscriptionStatus =
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

export interface I_Subscription {
  billing_cycle_anchor: number;
  current_period_end: number;
  current_period_start: number;
  days_until_due: number | null;
  plan?: I_Plan;
  status: SubscriptionStatus;
}

export interface I_AppSumoSubscription {
  id: string;
  userId: string | null;
  metadata: unknown;
  plan_id: string;
  favorite_voices: unknown;
  custom_voices: unknown;
  current_period_start: Date | null;
  tier: number | null;
  license_status: "active" | "inactive" | "deactivated";
  license_key: string;
  created_at: Date | null;
}

export type Subscription = I_Subscription | I_AppSumoSubscription;
