export interface Prompt {
  id: string;
  name: string;
  description?: string;
  type?: string;
  subtype?: string;
  prompt_ai: string;
  prompt_display: string;
  ai_model_type: "CHAT" | "IMAGE" | "VOICE" | "OTHER";
  created_at: Date;
}
