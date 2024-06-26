/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import { createHash } from "crypto";
import CredentialsProviders from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, tableCreator } from "@voiceai/db";

import { env } from "./env.mjs";

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
      } | null;
    } & DefaultSession["user"];
  }
}

function compareHashPassword(password: string, hashedPassword: string) {
  if (hashPassword(password) === hashedPassword) {
    return { success: true, message: "Password matched" };
  }
  return { success: false, message: "Password not matched" };
}

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
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
          where: (users, { eq }) => eq(users.email, email),
        });

        const result = compareHashPassword(
          password as string,
          user?.password ?? "",
        );

        if (result.success && user) {
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
  ],
  callbacks: {
    async session({ session, user, token }) {
      const subscriptionStatus = await db.query.subscriptions.findFirst({
        where: (subscriptions, { eq }) =>
          eq(subscriptions.userId, user?.id ?? token.sub),
      });

      const subscription = {
        userId: user?.id ?? token.sub,
        status: subscriptionStatus?.status,
        planId: subscriptionStatus?.plan_id ?? null,
      };

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: user?.id ?? token.sub,
          subscription: subscription,
        },
      };

      return updatedSession;
    },
  },
});
