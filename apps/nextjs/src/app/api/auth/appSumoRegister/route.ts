import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { CreateCognitoEntry } from "@voiceai/auth/actions";
import { db, eq, schema } from "@voiceai/db";

import {
  fetchTemporaryToken,
  fetchUserLicense,
} from "../../../actions/appSumoLicenceActions";
import type { LicenceResponse, TokenResponse } from "../register/types";

interface User {
  userId: string;
  appSumoCode: string;
  userMail: string;
}

export async function POST(request: Request) {
  try {
    const { appSumoCode, userId, userMail } = (await request.json()) as User;

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

    if (appSumoLicense) {
      await db
        .update(schema.users)
        .set({ app_sumo_license_key: appSumoLicense.license_key })
        .where(eq(schema.users.id, userId))
        .execute();

      await db
        .update(schema.appSumoSubscription)
        .set({ userId: userId })
        .where(
          eq(
            schema.appSumoSubscription.license_key,
            appSumoLicense.license_key,
          ),
        )
        .execute();
      const basicSubscription = await db.query.subscriptions.findFirst({
        where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
      });

      if (basicSubscription) {
        await db
          .delete(schema.subscriptions)
          .where(eq(schema.subscriptions.userId, userId))
          .execute();
      }
      const payload = {
        YourName: {
          First: "",
          Last: "",
        },
        EnterYourEmail: userMail,
        YoureWorkingOn: "AppSumo User",
      };
      await CreateCognitoEntry(payload, userId);
    }

    return new Response("App Sumo user updated");
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
