export interface LandingPage {
  id?: string;
  segment: string;
  title: string;
  type: "regular" | "tools" | "saasy";
  description: string;
  sub_description: string;
  video_url: string;
  is_active: "active" | "inactive";
}
