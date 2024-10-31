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

// Full Access Live product Ids
export const productIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_QsC2gen4V6MFdx", yearly: "prod_QsC2uouKNghxvv" },
  CREATOR: { monthly: "prod_QsC286urBJ7Von", yearly: "prod_QsC2PGXx7AIB9Q" },
  BUSINESS: { monthly: "prod_QsC2n4FMuspdNO", yearly: "prod_QsC2dmRjqQqtlZ" },
};

//Fulll Access Test product Ids
export const testPoductIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_R7eLyo9NiyMoSC", yearly: "prod_R7eOoL49lvZ36p" },
  CREATOR: { monthly: "prod_R7eMnM5Xj4xpCg", yearly: "prod_R7eQCBgTzm1V4y" },
  BUSINESS: { monthly: "prod_R7eOycLIUDvxPy", yearly: "prod_R7eRxmJZG3zMZk" },
};

export const testPriceIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: {
    monthly: "price_1QFP34K0GRmjhtz7BlRXtxRH",
    yearly: "price_1QFP6BK0GRmjhtz7H81xEAA1",
  },
  CREATOR: {
    monthly: "price_1QFP45K0GRmjhtz7BTdsW45M",
    yearly: "price_1QFP7BK0GRmjhtz7Z5TdFlEj",
  },
  BUSINESS: {
    monthly: "price_1QFP5HK0GRmjhtz72Wywo9kG",
    yearly: "price_1QFP8IK0GRmjhtz7CcApemxP",
  },
};
