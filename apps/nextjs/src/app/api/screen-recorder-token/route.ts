import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(req: NextRequest) {
  const PRIVATE_PEM = process.env.LOOM_PRIVATE_KEY; // Your private key for JWT signing

  if (!PRIVATE_PEM) {
    return NextResponse.json(
      { error: "Private key is missing" },
      { status: 500 },
    );
  }

  try {
    const privateKey = await jose.importPKCS8(PRIVATE_PEM, "RS256");

    const jws = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setIssuer("4e177b43-827a-4e02-8b2b-5a4e02bc5c2e")
      .setExpirationTime("2m")
      .sign(privateKey);

    return NextResponse.json({ token: jws }, { status: 200 });
  } catch (error) {
    console.error("Error generating JWT:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 },
    );
  }
}
