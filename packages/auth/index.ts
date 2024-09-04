/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import CredentialsProviders from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

import { db, schema, tableCreator } from "@voiceai/db";

import { STARTING_CL_CREDITS } from "./constants";
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

      // Debugging: log the user ID
      console.log("User ID:", userId);

      const subscriptionStatus = await db.query.subscriptions.findFirst({
        where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
      });

      if (!subscriptionStatus) {
        await db
          .insert(schema.subscriptions)
          .values({
            userId,
            plan: "STARTER",
            status: "FREE_TRIAL",
          })
          .execute();

        await db
          .insert(schema.clCredits)
          .values({
            userId,
          })
          .execute();
      }

      const clCreditStatus = await db.query.clCredits.findFirst({
        where: (clCredits, { eq }) => eq(clCredits.userId, userId),
      });

      if (!clCreditStatus) {
        await db
          .insert(schema.clCredits)
          .values({
            userId,
            credits: STARTING_CL_CREDITS[subscriptionStatus?.status ?? "FREE"],
          })
          .execute();
      }

      const subscription = {
        userId,
        status: subscriptionStatus?.status ?? "FREE_TRIAL",
        planId: subscriptionStatus?.plan_id ?? "initial_plan_id",
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
