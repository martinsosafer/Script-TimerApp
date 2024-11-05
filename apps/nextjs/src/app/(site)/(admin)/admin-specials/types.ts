export interface MonthlySpecial {
  id?: string;
  name: string;
  description: string;
  pages_display:
    | "ALL"
    | "VOICE"
    | "CHAT"
    | "IMAGES"
    | "PLAGIARISM"
    | "UNIVERSITY"
    | "PLANS";
  promo_code: string;
  link: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}
