export async function fetchTemporaryToken(code: string) {
  const payload = {
    client_id: process.env.APP_SUMO_CLIENT_ID,
    client_secret: process.env.APP_SUMO_CLIENT_SECRET,
    code,
    redirect_uri:
      "https://tuna-possible-thankfully.ngrok-free.app/register?origin=appsumo",
    grant_type: "authorization_code",
  };

  const response = await fetch("https://appsumo.com/openid/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function fetchUserLicense(accessToken: string) {
  const response = await fetch(
    `https://appsumo.com/openid/license_key/?access_token=${accessToken}`,
  );

  return response.json();
}
