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
  planData?: Plan;
}

interface Recurring {
  interval: string | undefined;
  interval_count: number;
  trial_period_days: number | null;
  usage_type: string;
}
export interface Plan {
  id: string;
  recurring: Recurring;
}
