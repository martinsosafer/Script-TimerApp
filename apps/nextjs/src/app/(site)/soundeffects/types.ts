export interface SubData {
  userId: string;
  status: string;
  planId: string | null;
  trialExpiration: Date | null;
}

export interface SessionProps {
  subData: SubData | null | undefined;
}

export interface Blob {
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  url: string;
}
