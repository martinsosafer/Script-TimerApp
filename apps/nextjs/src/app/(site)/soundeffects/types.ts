import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

export interface SubData {
  userId: string;
  status: string;
  planId: string | null;
  trialExpiration: Date | null;
}

export interface SessionProps {
  subData: SubData | null | undefined;
}

// export interface Blob {
//   downloadUrl: string;
//   pathname: string;
//   size: number;
//   uploadedAt: string;
//   url: string;
// }

export interface SoundTypeNeon {
  id: string;
  created_at: Date;
  updated_at: Date;
  pathname: string;
  url: string;
  downloadurl: string;
}

export interface RefetchFavorites {
  refetchFavorites: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<string[] | undefined, Error>>;
}
