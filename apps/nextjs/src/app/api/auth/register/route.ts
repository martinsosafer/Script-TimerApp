import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db, eq, schema } from "@voiceai/db";

import {
  fetchTemporaryToken,
  fetchUserLicense,
} from "../../../actions/appSumoLicenceActions";
import type { LicenceResponse, TokenResponse } from "./types";

interface User {
  name: string;
  email: string;
  password: string;
  workingOn?: string;
  appSumoCode?: string;
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password: userPassword,
      appSumoCode,
    } = (await request.json()) as User;

    let appSumoLicenseKey;

    if (appSumoCode) {
      const appSumoToken = (await fetchTemporaryToken(
        appSumoCode,
      )) as TokenResponse;
      if (!appSumoToken) {
        return new Response(
          JSON.stringify({
            error: "Invalid AppSumo code",
          }),
          {
            status: 400,
          },
        );
      }
      const appSumoLicense = (await fetchUserLicense(
        appSumoToken.access_token,
      )) as LicenceResponse;
      appSumoLicenseKey = appSumoLicense.license_key;
    }

    const password = await bcrypt.hash(userPassword, 10);
    const id = uuid();

    const userPayload = {
      id,
      name,
      email: email.toLowerCase(),
      password,
      ...(appSumoLicenseKey ? { app_sumo_license_key: appSumoLicenseKey } : {}),
    };

    const newUser = await db.insert(schema.users).values(userPayload).execute();

    if (appSumoLicenseKey) {
      await db
        .update(schema.appSumoSubscription)
        .set({ userId: id })
        .where(eq(schema.appSumoSubscription.license_key, appSumoLicenseKey))
        .execute();
    }

    return new Response(JSON.stringify(newUser));
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
