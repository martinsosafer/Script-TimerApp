export interface LandingPage {
  id?: string;
  segment: string;
  title: string;
  lp_type: "regular" | "tools" | "free demo";
  description: string;
  sub_description: string;
  video_url: string;
  is_active: "active" | "inactive";
}
