/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import CredentialsProviders from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

import { db, schema, tableCreator } from "@voiceai/db";

import { STARTING_CL_CREDITS, STARTING_IMG_CREDITS } from "./constants";
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
      const subscriptionStatus = await db.query.subscriptions.findFirst({
        where: (subscriptions, { eq }) =>
          eq(subscriptions.userId, user?.id ?? token.sub),
      });

      if (!subscriptionStatus) {
        await db
          .insert(schema.subscriptions)
          .values({
            userId: user?.id ?? token.sub,
            plan: "STARTER",
            status: "FREE_TRIAL",
          })
          .execute();

        await db
          .insert(schema.clCredits)
          .values({
            userId: user?.id ?? token.sub,
          })
          .execute();

        await db
          .insert(schema.imgCredit)
          .values({
            userId: user?.id ?? token.sub,
          })
          .execute();
      }

      const clCreditStatus = await db.query.clCredits.findFirst({
        where: (clCredits, { eq }) =>
          eq(clCredits.userId, user?.id ?? token.sub),
      });

      if (!clCreditStatus) {
        await db
          .insert(schema.clCredits)
          .values({
            userId: user?.id ?? token.sub,
            credits: STARTING_CL_CREDITS[subscriptionStatus?.status ?? "FREE"],
          })
          .execute();
      }

      const imgCreditStatus = await db.query.imgCredit.findFirst({
        where: (imgCredit, { eq }) =>
          eq(imgCredit.userId, user?.id ?? token.sub),
      });

      if (!imgCreditStatus) {
        await db
          .insert(schema.imgCredit)
          .values({
            userId: user?.id ?? token.sub,
            credits: STARTING_IMG_CREDITS[subscriptionStatus?.status ?? "FREE"],
          })
          .execute();
      }

      const subscription = {
        userId: user?.id ?? token.sub,
        status: subscriptionStatus?.status ?? "FREE_TRIAL",
        planId: subscriptionStatus?.plan_id ?? "initial_plan_id",
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
