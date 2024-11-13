export const description: Record<string, string> = {
  FREE: "Good for hobbyist",
  EDUCATION: "Discounted for .edu emails",
  CREATOR: "Ideal for creatives professionals",
  BUSINESS: "Best for brand marketers",
};

interface Price {
  monthly: string;
  yearly: string;
  total?: string;
}

export const price: Record<string, Price> = {
  FREE: { monthly: "Free", yearly: "Free" },
  EDUCATION: { monthly: "$9", yearly: "$6.58", total: "$79/year" },
  CREATOR: { monthly: "$19", yearly: "$14.75", total: "$177/year" },
  BUSINESS: { monthly: "$39", yearly: "$24.75", total: "$297/year" },
};

interface ProductId {
  monthly: string | null;
  yearly: string | null;
}

export const productIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_Q6wRBImx4i9jIV", yearly: "prod_Q6wRaa010Ja2QI" },
  CREATOR: { monthly: "prod_Q6wRA3CPKOd872", yearly: "prod_Q6wR4wC3Y5Yili" },
  BUSINESS: { monthly: "prod_Q6wRdg67cs52NR", yearly: "prod_Q6wAIfC2x07sMV" },
};

export const testProductIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_PwYfAY9nKwQ9iV", yearly: "prod_PwaJpA8vUeG6Wv" },
  CREATOR: { monthly: "prod_PwYzKaNnHflnUj", yearly: "prod_PwaNjdYvuqa5Io" },
  BUSINESS: { monthly: "prod_PwZAZujl0DVkgR", yearly: "prod_PwaRtUe2crIFlW" },
};
