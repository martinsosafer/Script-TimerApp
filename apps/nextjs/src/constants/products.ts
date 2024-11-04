export const DESCRIPTION: Record<string, string> = {
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

export const ADD_ON_PRICE: Record<string, Price> = {
  EDUCATION: { monthly: "$9", yearly: "$7.75", total: "$93/year" },
  CREATOR: { monthly: "$14", yearly: "$11", total: "$132/year" },
  BUSINESS: { monthly: "$19", yearly: "$16.41", total: "$197/year" },
};

interface ProductId {
  monthly: string | null;
  yearly: string | null;
}

// Full Access Live product Ids
export const ADD_ON_PRODUCTS_ID: Record<string, ProductId> = {
  EDUCATION: { monthly: "prod_R8aPNKUpHK15NI", yearly: "prod_R8aOoiVgXAlaO1" },
  CREATOR: { monthly: "prod_R8aPs92mmobLLY", yearly: "prod_R8aO8EDEbRfscF" },
  BUSINESS: { monthly: "prod_R8aPFZMbbrlnrM", yearly: "prod_R8aOOWxgAkFEkP" },
};

// Full Access Test product Ids
export const ADD_ON_TEST_PRODUCTS_ID: Record<string, ProductId> = {
  EDUCATION: { monthly: "prod_R7eLyo9NiyMoSC", yearly: "prod_R7eOoL49lvZ36p" },
  CREATOR: { monthly: "prod_R7eMnM5Xj4xpCg", yearly: "prod_R7eQCBgTzm1V4y" },
  BUSINESS: { monthly: "prod_R7eOycLIUDvxPy", yearly: "prod_R7eRxmJZG3zMZk" },
};

// Full Access price Ids
export const ADD_ON_PRICES_ID: Record<string, ProductId> = {
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
export const ADD_ON_TEST_PRICES_ID: Record<string, ProductId> = {
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

// Standart Products prices
export const PRICE: Record<string, Price> = {
  FREE: { monthly: "Free", yearly: "Free" },
  EDUCATION: { monthly: "$9", yearly: "$6.58", total: "$79/year" },
  CREATOR: { monthly: "$19", yearly: "$14.75", total: "$177/year" },
  BUSINESS: { monthly: "$39", yearly: "$24.75", total: "$297/year" },
};

// Standart Products ids
export const PRODUCTS_ID: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_Q6wRBImx4i9jIV", yearly: "prod_Q6wRaa010Ja2QI" },
  CREATOR: { monthly: "prod_Q6wRA3CPKOd872", yearly: "prod_Q6wR4wC3Y5Yili" },
  BUSINESS: { monthly: "prod_Q6wRdg67cs52NR", yearly: "prod_Q6wAIfC2x07sMV" },
};

// Standart Test Products ids
export const TEST_PRODUCTS_ID: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_PwYfAY9nKwQ9iV", yearly: "prod_PwaJpA8vUeG6Wv" },
  CREATOR: { monthly: "prod_PwYzKaNnHflnUj", yearly: "prod_PwaNjdYvuqa5Io" },
  BUSINESS: { monthly: "prod_PwZAZujl0DVkgR", yearly: "prod_PwaRtUe2crIFlW" },
};

// Standart products price Ids
export const PRICES_ID: Record<string, ProductId> = {
  EDUCATION: {
    monthly: "price_1PGiYbK0GRmjhtz7IZ6RDyq6",
    yearly: "price_1PGiYRK0GRmjhtz71R7nWJR3",
  },
  CREATOR: {
    monthly: "price_1PGiYZK0GRmjhtz7ZFzIlJOF",
    yearly: "price_1PGiY9K0GRmjhtz71fb2VTiJ",
  },
  BUSINESS: {
    monthly: "price_1PGiYXK0GRmjhtz7qdIWtxhv",
    yearly: "price_1PGiIdK0GRmjhtz7lbV8t0x1",
  },
};

// Standart test products price Ids
export const TEST_PRICES_ID: Record<string, ProductId> = {
  EDUCATION: {
    monthly: "price_1P6fXuK0GRmjhtz7BSsuCtIA",
    yearly: "price_1P6h95K0GRmjhtz7NAy3Yiqi",
  },
  CREATOR: {
    monthly: "price_1P6frDK0GRmjhtz73Ocnjs1T",
    yearly: "price_1P6hD1K0GRmjhtz754KcsSpE",
  },
  BUSINESS: {
    monthly: "price_1P6g1sK0GRmjhtz7XO00M64R",
    yearly: "price_1P6hGSK0GRmjhtz7ZYvDKJNz",
  },
};
