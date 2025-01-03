export interface Prompt {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
  subcategoryId?: string;
  prompt_ai: string;
  prompt_display: string;
  additional_fields?: string[] | null;
  ai_model_type?: "CHAT" | "IMAGE" | "VOICE" | "OTHER";
  created_at?: Date;
}
