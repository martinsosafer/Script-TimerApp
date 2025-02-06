interface WhResponse {
  license_key: string;
  license_redemption_url: string;
  license_change_plan_url: string;
  event: "purchase" | "avtivate" | "deactivate" | "upgrade" | "downgrade";
  plan_id: string;
  status: "inactive" | "active" | "deactivated";
  tier: 1 | 2 | 3;
  created_at: Date;
  updated_at: Date;
}

export async function POST(req: Request) {
  //const data = req.body;
  const data = (await req.json()) as WhResponse;

  try {
    return new Response(
      JSON.stringify({
        event: "activate",
        success: true,
      }),
    );
  } catch (error) {
    console.error(error);
  }
}
