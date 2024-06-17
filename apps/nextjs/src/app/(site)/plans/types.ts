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

export interface PriceCardProps {
  monthlyPlans: Product[];
  yearlyPlans: Product[];
  currentPlan?: string | undefined;
  planInterval?: string;
}

// interface Recurring {
//   interval: string | undefined;
//   interval_count: number;
//   trial_period_days: number | null;
//   usage_type: string;
// }
export interface Plan {
  id: string;
  interval: string;
  active: boolean;
  amount: number;
}

// interface SubscriptionItem {
//   data: { plan: Plan[] };
// }

export interface I_Subscription {
  billing_cycle_anchor: number;
  current_period_end: number;
  current_period_start: number;
  days_until_due: number | null;
  plan?: Plan;
}
