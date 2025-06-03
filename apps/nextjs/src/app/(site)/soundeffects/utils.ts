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

// Get sound or music name from URL
export const formatSoundNameFromUrl = (pathname: string) => {
  const splitPath = pathname.split("/");
  const soundName = splitPath[splitPath.length - 1]?.split(".")[0];
  const formattedSoundName = soundName?.replace(/-/g, " ");
  return formattedSoundName;
};
