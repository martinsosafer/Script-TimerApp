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
  EDUCATION: { monthly: "$9", yearly: "$7.75", total: "$93/year" },
  CREATOR: { monthly: "$14", yearly: "$11", total: "$132/year" },
  BUSINESS: { monthly: "$19", yearly: "$16.41", total: "$197/year" },
};

interface ProductId {
  monthly: string | null;
  yearly: string | null;
}

//Live product Ids
export const productIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_QsC2gen4V6MFdx", yearly: "prod_QsC2uouKNghxvv" },
  CREATOR: { monthly: "prod_QsC286urBJ7Von", yearly: "prod_QsC2PGXx7AIB9Q" },
  BUSINESS: { monthly: "prod_QsC2n4FMuspdNO", yearly: "prod_QsC2dmRjqQqtlZ" },
};

//Test product Ids
export const testPoductIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_Qpsuj4pfwigoce", yearly: "prod_QpsuGyXva9dKLW" },
  CREATOR: { monthly: "prod_QpsrhfYRpJokHB", yearly: "prod_QpspBNC8085JtD" },
  BUSINESS: { monthly: "prod_QpstEY5wQbjQb8", yearly: "prod_Qpst51UXUqyaUQ" },
};
