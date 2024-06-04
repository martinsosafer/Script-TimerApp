/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import Discord from "@auth/core/providers/discord";
import Facebook from "@auth/core/providers/facebook";
import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, tableCreator } from "@voiceai/db";

import { env } from "./env.mjs";
import { sendVerificationRequest } from "./send-verification-request";

export type { Session } from "next-auth";
// Update this whenever adding new providers so that the client can
export const providers = ["discord", "google", "email"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      subscription?: {
        userId: string;
        status: string;
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

    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
  providers: [
    Discord,
    Google({
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: env.AUTH_FACEBOOK_CLIENT_ID,
      clientSecret: env.AUTH_FACEBOOK_CLIENT_SECRET,
    }),
    {
      id: "resend",
      // @ts-expect-error dont know why this is typed wrong from NextAuth
      type: "email",
      sendVerificationRequest,
    },
  ],
  callbacks: {
    session: ({ session, user }) => {
      const subscription = {
        userId: user.id,
        status: "FREE", // Example static data, replace this with actual subscription data
      };

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          subscription: subscription,
        },
      };

      // Log the updated session object for debugging

      return updatedSession;
    },
  },
  authorized({ auth }) {
    return !!auth?.user;
  },
});
