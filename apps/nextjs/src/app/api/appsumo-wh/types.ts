export interface WhResponse {
  license_key: string;
  prev_license_key?: string;
  license_redemption_url?: string;
  license_change_plan_url?: string;
  event: "purchase" | "activate" | "deactivate" | "upgrade" | "downgrade";
  plan_id: string;
  status: "inactive" | "active" | "deactivated";
  tier?: 1 | 2 | 3;
  created_at: Date;
  updated_at: Date;
}
