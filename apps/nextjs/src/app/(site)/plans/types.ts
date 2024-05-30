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
}
