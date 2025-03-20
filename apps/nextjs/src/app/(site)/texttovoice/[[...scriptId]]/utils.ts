export const characters: Record<string, string> = {
  FREE: "500 characters",
  FREE_TRIAL: "1600 characters",
  STUDENT: "2000 characters",
  CREATOR: "5000 characters",
  BUSINESS: "10000 characters",
  STUDENTCLMO: "2000 characters",
  CREATORCLMO: "5000 characters",
  BUSINESSCLMO: "10000 characters",
  STUDENTCLYR: "2000 characters",
  CREATORCLYR: "5000 characters",
  BUSINESSCLYR: "10000 characters",
  "1": "5000 characters",
  "2": "5000 characters",
};

// Function to get total credits based on the subscription status
export const getTotalCredits = (status: string | undefined): number => {
  if (!status) return 0;

  switch (status) {
    case "FREE":
    case "FREE_TRIAL":
      return 2000;

    case "STUDENT":
    case "STUDENTCLMO":
    case "STUDENTCLYR":
      return 40000;

    case "CREATOR":
    case "CREATORCLMO":
    case "CREATORCLYR":
      return 80000;

    case "BUSINESS":
    case "BUSINESSCLMO":
    case "BUSINESSCLYR":
      return 125000;
    case "1":
      return 50000;
    case "2":
      return 100000;

    default:
      return 0;
  }
};
