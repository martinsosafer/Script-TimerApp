export interface ActorSection {
  id: string;
  voice: Voice | null;
  text: string;
  audioUrl: string | null;
  audioBlob: Blob | null;
  isPlaying: boolean;
  autoPlay: boolean;
  isGenerating: boolean;
  volume: number;
  muted: boolean;
  delay: number;
}
