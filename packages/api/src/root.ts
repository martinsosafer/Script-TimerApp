import { authRouter } from "./router/auth";
import { historyRouter } from "./router/history";
import { subscriptionRouter } from "./router/subscription";
import { voiceRouter } from "./router/voice";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  history: historyRouter,
  subscription: subscriptionRouter,
  voice: voiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
