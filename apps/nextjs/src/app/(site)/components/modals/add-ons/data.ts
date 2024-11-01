export const description: Record<string, string> = {
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
  EDUCATION: { monthly: "$9", yearly: "$7.75", total: "$93/year" },
  CREATOR: { monthly: "$14", yearly: "$11", total: "$132/year" },
  BUSINESS: { monthly: "$19", yearly: "$16.41", total: "$197/year" },
};

interface ProductId {
  monthly: string;
  yearly: string;
}

// Full Access Live product Ids
export const productIds: Record<string, ProductId> = {
  EDUCATION: { monthly: "prod_R8aPNKUpHK15NI", yearly: "prod_R8aOoiVgXAlaO1" },
  CREATOR: { monthly: "prod_R8aPs92mmobLLY", yearly: "prod_R8aO8EDEbRfscF" },
  BUSINESS: { monthly: "prod_R8aPFZMbbrlnrM", yearly: "prod_R8aOOWxgAkFEkP" },
};

// Full Access Test product Ids
export const testPoductIds: Record<string, ProductId> = {
  EDUCATION: { monthly: "prod_R7eLyo9NiyMoSC", yearly: "prod_R7eOoL49lvZ36p" },
  CREATOR: { monthly: "prod_R7eMnM5Xj4xpCg", yearly: "prod_R7eQCBgTzm1V4y" },
  BUSINESS: { monthly: "prod_R7eOycLIUDvxPy", yearly: "prod_R7eRxmJZG3zMZk" },
};

// Full Access price Ids
export const priceIds: Record<string, ProductId> = {
  EDUCATION: {
    monthly: "price_1QGJEJK0GRmjhtz7fmLnMrCl",
    yearly: "price_1QGJEBK0GRmjhtz7FFqlpx5u",
  },
  CREATOR: {
    monthly: "price_1QGJEGK0GRmjhtz7j5aT8xTb",
    yearly: "price_1QGJE9K0GRmjhtz71CSO5ezx",
  },
  BUSINESS: {
    monthly: "price_1QGJEDK0GRmjhtz7kSe4M6lV",
    yearly: "price_1QGJE1K0GRmjhtz7XCwpEmaJ",
  },
};

// Full Access test price Ids
export const testPriceIds: Record<string, ProductId> = {
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
