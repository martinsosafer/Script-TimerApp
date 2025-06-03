export interface SubData {
  userId: string;
  status: string;
  planId: string | null;
  trialExpiration: Date | null;
}

export interface SessionProps {
  subData: SubData | null | undefined;
}

export type BoosterType = "IMAGES" | "PLAGIARISM" | "VOICES" | "MASTERCLASS";
