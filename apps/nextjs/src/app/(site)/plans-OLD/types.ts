import type { Session } from "@voiceai/auth";

export interface MarketingFeature {
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  metadata: {
    carddescription: string;
    mostpopular: string;
    price: number;
    notincluded1: string | null;
    notincluded2: string | null;
    notincluded3: string | null;
    notincluded4: string | null;
  };
  marketing_features: MarketingFeature[];
}

export interface PriceCardsProps {
  monthlyPlans: Product[];
  yearlyPlans: Product[];
  plagiarismMonthlyPlans: Product[];
  plagiarismYearlyPlans: Product[];
  currentPlan?: string | undefined;
  planInterval?: string;
  session: Session | null;
}

export interface PriceCardProps {
  product: Product;
  currentPlan: string | undefined;
  interval: string | undefined;
  isYearly?: boolean;
  session: Session | null;
}
export interface Plan {
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
  plan?: Plan;
}
export interface I_AppSumoSubscription {
  userId: string;
  tier: number;
  license_key: string;
  created_at: Date;
}
export type SubscriptionType = I_Subscription | I_AppSumoSubscription | null;
