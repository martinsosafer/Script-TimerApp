// export enum Plan {
//   STUDENT = "Student Plan",
//   CREATOR = "Creator Plan",
//   BUSINESS = "Business Plan",
//   STUDENTCLMO = "Education Pro with Plagiarism Detection Monthly",
//   CREATORCLMO = "Creator Pro with Plagiarism Detection Monthly",
//   BUSINESSCLMO = "Business Pro with Plagiarism Detection Monthly",
//   STUDENTCLYR = "Education Pro with Plagiarism Detection Yearly",
//   CREATORCLYR = "Creator Pro with Plagiarism Detection Yearly",
//   BUSINESSCLYR = "Business Pro with Plagiarism Detection Yearly",
// }

type Plan =
  | "STUDENT"
  | "CREATOR"
  | "BUSINESS"
  | "STUDENTCLMO"
  | "CREATORCLMO"
  | "BUSINESSCLMO"
  | "STUDENTCLYR"
  | "CREATORCLYR"
  | "BUSINESSCLYR";

export const plans: Record<string, Plan> = {
  "Student Plan": "STUDENT",
  "Creator Plan": "CREATOR",
  "Business Plan": "BUSINESS",
  "Education Pro with Plagiarism Detection Monthly": "STUDENTCLMO",
  "Creator Pro with Plagiarism Detection Monthly": "CREATORCLMO",
  "Business Pro with Plagiarism Detection Monthly": "BUSINESSCLMO",
  "Education Pro with Plagiarism Detection Yearly": "STUDENTCLYR",
  "Creator Pro with Plagiarism Detection Yearly": "CREATORCLYR",
  "Business Pro with Plagiarism Detection Yearly": "BUSINESSCLYR",
};
