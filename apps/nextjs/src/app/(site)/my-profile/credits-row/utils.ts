// utils.ts
type Plan =
  | "INACTIVE"
  | "PAUSED"
  | "ACTIVE"
  | "FREE"
  | "FREE_TRIAL"
  | "STUDENT"
  | "CREATOR"
  | "BUSINESS"
  | "STUDENTCLMO"
  | "CREATORCLMO"
  | "BUSINESSCLMO"
  | "STUDENTCLYR"
  | "CREATORCLYR"
  | "BUSINESSCLYR"
  | "1"
  | "2";

// First declare all credit constants
export const STARTING_CL_CREDITS: Record<Plan, number> = {
  INACTIVE: 0,
  PAUSED: 0,
  ACTIVE: 5,
  FREE: 5,
  FREE_TRIAL: 5,
  STUDENT: 6,
  CREATOR: 7,
  BUSINESS: 8,
  STUDENTCLMO: 40,
  CREATORCLMO: 60,
  BUSINESSCLMO: 80,
  STUDENTCLYR: 40,
  CREATORCLYR: 60,
  BUSINESSCLYR: 80,
  "1": 7,
  "2": 8,
};

export const STARTING_IMG_CREDITS: Record<Plan, number> = {
  INACTIVE: 0,
  PAUSED: 0,
  ACTIVE: 3,
  FREE: 3,
  FREE_TRIAL: 3,
  STUDENT: 25,
  CREATOR: 50,
  BUSINESS: 100,
  STUDENTCLMO: 25,
  CREATORCLMO: 50,
  BUSINESSCLMO: 100,
  STUDENTCLYR: 25,
  CREATORCLYR: 50,
  BUSINESSCLYR: 100,
  "1": 50,
  "2": 100,
};

export const STARTING_11CL_CREDITS: Record<Plan, number> = {
  INACTIVE: 0,
  PAUSED: 0,
  ACTIVE: 2000,
  FREE: 2000,
  FREE_TRIAL: 2000,
  STUDENT: 40000,
  CREATOR: 80000,
  BUSINESS: 125000,
  STUDENTCLMO: 40000,
  CREATORCLMO: 80000,
  BUSINESSCLMO: 125000,
  STUDENTCLYR: 40000,
  CREATORCLYR: 80000,
  BUSINESSCLYR: 125000,
  "1": 50000,
  "2": 100000,
};

export const STARTING_OPENAI_CREDITS: Record<Plan, number> = {
  INACTIVE: 0,
  PAUSED: 0,
  ACTIVE: 10000,
  FREE: 10000,
  FREE_TRIAL: 10000,
  STUDENT: 200000,
  CREATOR: 400000,
  BUSINESS: 1000000,
  STUDENTCLMO: 200000,
  CREATORCLMO: 400000,
  BUSINESSCLMO: 1000000,
  STUDENTCLYR: 200000,
  CREATORCLYR: 400000,
  BUSINESSCLYR: 1000000,
  "1": 200000,
  "2": 750000,
};

// Then define displayData using the constants
export const displayData = {
  FREE: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.FREE,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.FREE,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.FREE,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.FREE,
    },
  },
  FREE_TRIAL: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.FREE_TRIAL,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.FREE_TRIAL,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.FREE_TRIAL,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.FREE_TRIAL,
    },
  },
  STUDENT: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.STUDENT,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.STUDENT,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.STUDENT,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.STUDENT,
    },
  },
  CREATOR: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.CREATOR,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.CREATOR,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.CREATOR,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.CREATOR,
    },
  },
  BUSINESS: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.BUSINESS,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.BUSINESS,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.BUSINESS,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.BUSINESS,
    },
  },
  STUDENTCLMO: {
    cl_credit: {
      label: "Plagiarism and AI detector",
      credits: STARTING_CL_CREDITS.STUDENTCLMO,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.STUDENTCLMO,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.STUDENTCLMO,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.STUDENTCLMO,
    },
  },
  CREATORCLMO: {
    cl_credit: {
      label: "Plagiarism and AI detector",
      credits: STARTING_CL_CREDITS.CREATORCLMO,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.CREATORCLMO,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.CREATORCLMO,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.CREATORCLMO,
    },
  },
  BUSINESSCLMO: {
    cl_credit: {
      label: "Plagiarism and AI detector",
      credits: STARTING_CL_CREDITS.BUSINESSCLMO,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.BUSINESSCLMO,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.BUSINESSCLMO,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.BUSINESSCLMO,
    },
  },
  STUDENTCLYR: {
    cl_credit: {
      label: "Plagiarism and AI detector",
      credits: STARTING_CL_CREDITS.STUDENTCLYR,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.STUDENTCLYR,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.STUDENTCLYR,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.STUDENTCLYR,
    },
  },
  CREATORCLYR: {
    cl_credit: {
      label: "Plagiarism and AI detector",
      credits: STARTING_CL_CREDITS.CREATORCLYR,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.CREATORCLYR,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.CREATORCLYR,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.CREATORCLYR,
    },
  },
  BUSINESSCLYR: {
    cl_credit: {
      label: "Plagiarism and AI detector",
      credits: STARTING_CL_CREDITS.BUSINESSCLYR,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.BUSINESSCLYR,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.BUSINESSCLYR,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.BUSINESSCLYR,
    },
  },
  ACTIVE: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.ACTIVE,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.ACTIVE,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.ACTIVE,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.ACTIVE,
    },
  },
  INACTIVE: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.INACTIVE,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.INACTIVE,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.INACTIVE,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.INACTIVE,
    },
  },
  PAUSED: {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS.PAUSED,
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS.PAUSED,
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS.PAUSED,
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS.PAUSED,
    },
  },
  "1": {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS["1"],
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS["1"],
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS["1"],
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS["1"],
    },
  },
  "2": {
    cl_credit: {
      label: "Pagiarism and AI detector",
      credits: STARTING_CL_CREDITS["2"],
    },
    "11labs_credit": {
      label: "Voice",
      credits: STARTING_11CL_CREDITS["2"],
    },
    img_credit: {
      label: "Images",
      credits: STARTING_IMG_CREDITS["2"],
    },
    openai_credit: {
      label: "Script coach",
      credits: STARTING_OPENAI_CREDITS["2"],
    },
  },
};
