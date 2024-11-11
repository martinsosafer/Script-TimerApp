export type Page =
  | "ALL"
  | "VOICE"
  | "CHAT"
  | "IMAGES"
  | "PLAGIARISM"
  | "UNIVERSITY"
  | "PLANS";

export interface MonthlySpecial {
  id?: string;
  name: string;
  type: "promo" | "announcement";
  description: string;
  pages_display: Page[];
  promo_code: string | null;
  link?: string | null;
  start_date: string;
  end_date: string;
  is_active: "active" | "inactive";
}
