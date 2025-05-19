# Script Timer Ai

This app is a vitual assistant for content creators.

- [Description](#description)
- [Project Stack](#project-stack)
- [Environments](#environments)
- [Scripts](#scripts)
- [Dependnecies](#dependencies)
- [Linter](#linter)
- [Payments](#payments)
- [Credits](#Credits)
- [Email](#Email)

## Description

Script Timer Ai is an application that uses multiple Ai models to assist with multimedia content creation.

## Project Stack

## Environments

## Scripts

## Dependencies

## Linter

## Payments

## Credits

## Email

**Resend** is the dependency used to send emails to users.
The singleton is located at: `/packages/email/resend/client.ts`

### Register

- When a user request an email link (to create an account) on the pop-up modal or with "Send me a link" on the `/register` page, Next Auth triggers `/packages/auth/send-verification-request.ts`.

- If the email was delivered successfully, the app redirects to `/checkemail` to inform the user.

> Resend will bounce fake or blacklisted emails and label as "Bounced" (red). If the email is sent successfully, but the user email account sends it to the Span folder it will be labeled as "Complained" (yelllow) on the Resend dashboard.

> To **test** if the Resend service is working correctly use:
>
> `delivered@resend.dev` - Email being delivered.
>
> `bounced@resend.dev` - Email bouncing.

---

### - Old Docs -

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
