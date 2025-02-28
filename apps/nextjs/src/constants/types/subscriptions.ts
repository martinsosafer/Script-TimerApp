export interface I_Plan {
  id: string;
  interval: string;
  active: boolean;
  amount: number;
}

export interface I_Subscription {
  billing_cycle_anchor: number;
  current_period_end: number;
  current_period_start: number;
  days_until_due: number | null;
  plan?: I_Plan;
  status: string;
}

export interface I_AppSumoSubscription {
  userId: string | null;
  tier: number | null;
  license_key: string;
  created_at: Date;
}
