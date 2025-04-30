export interface Voice {
  id: string;
  name: string;
  external_id: string;
  type: string;
  gender: string;
  picture: string;
  description: string;
  favorite: boolean;
}

export interface ActorSection {
  id: string;
  voice: Voice | null;
  text: string;
  lastGeneratedText: string;
  lastGeneratedVoiceId?: string;
  audioUrl: string | null;
  audioBlob: Blob | null;
  isPlaying: boolean;
  autoPlay: boolean;
  isGenerating: boolean;
  volume: number;
  previousVolume?: number;
  muted: boolean;
  delay: number;
}

export type MergeType = "sequential" | "overlap";
export type FilterType = "all" | "gender" | "type";
