export interface LandingPage {
  id?: string;
  segment: string;
  title: string;
  lp_type: "regular" | "tools" | "saasy";
  description: string;
  sub_description: string;
  video_url: string;
  is_active: "active" | "inactive";
}
