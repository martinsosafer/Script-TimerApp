/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import CredentialsProviders from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

import { db, tableCreator } from "@voiceai/db";

import {
  checkAndInsertCredits,
  CreateCognitoEntry,
  inserAppSumoUserCredits,
  insertSubscription,
  moveToFreeOrAddExpiration,
} from "./actions";
import { env } from "./env.mjs";
import { sendVerificationRequest } from "./send-verification-request";

export type { Session } from "next-auth";
// Update this whenever adding new providers so that the client can
export const providers = ["google", "credentials", "email"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      subscription?: {
        userId: string;
        status: string;
        planId: string | null;
        trialExpiration: Date | null;
      } | null;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db, tableCreator),
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/auth/error",
    verifyRequest: "/checkemail",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProviders({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, email as string),
        });

        const isAuthed = await bcrypt.compare(
          password as string,
          user?.password ?? "",
        );

        if (isAuthed && user) {
          return {
            id: user?.id,
            email: user?.email,
            name: user?.name,
          };
        } else {
          return null;
        }
      },
    }),
    Google({
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "resend",
      // @ts-expect-error dont know why this is typed wrong from NextAuth
      type: "email",
      sendVerificationRequest,
    },
  ],
  callbacks: {
    async session({ session, user, token }) {
      const userId = user?.id ?? token.sub;

      if (!userId) {
        throw new Error("User ID is missing");
      }

      const appSumoSubscription = await db.query.appSumoSubscription.findFirst({
        where: (appSumoSubscription, { eq }) =>
          eq(appSumoSubscription.userId, userId),
      });

      const subscriptionStatus = await db.query.subscriptions.findFirst({
        where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
      });

      if (appSumoSubscription) {
        const tier = appSumoSubscription.tier?.toString() as "1" | "2";
        await inserAppSumoUserCredits(userId, tier);
      }
      if (!appSumoSubscription) {
        // We check if the user is on a free trial and move them to the free plan if the trial is over, or add an expiration date if it doesn't exist and still within the trial period.
        if (subscriptionStatus?.status === "FREE_TRIAL") {
          await moveToFreeOrAddExpiration(subscriptionStatus, userId);
        }

        // If the user doesn't have a subscription, we insert one with the default values.
        if (!subscriptionStatus) {
          await insertSubscription(userId);
        }

        // We check if the user has credits and insert them if they don't depending on the plan they are on.
        await checkAndInsertCredits(userId);
      }
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
      });

      if (dbUser?.cognito_entry === false) {
        const payload = {
          YourName: {
            First: dbUser?.name?.split(" ")[0] ?? "",
            Last: dbUser?.name?.split(" ")[1] ?? "",
          },
          EnterYourEmail: dbUser?.email,
          YoureWorkingOn: dbUser?.app_sumo_license_key ? "AppSumo User" : "",
        };
        await CreateCognitoEntry(payload, userId);
      }

      const subscription = {
        userId,
        status:
          appSumoSubscription?.tier?.toString() ??
          subscriptionStatus?.status ??
          "FREE_TRIAL",
        planId:
          appSumoSubscription?.plan_id ??
          subscriptionStatus?.plan_id ??
          "initial_plan_id",
        trialExpiration: subscriptionStatus?.free_trial_expiration ?? null,
      };

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: userId,
          subscription: subscription,
        },
      };

      return updatedSession;
    },
  },
});
