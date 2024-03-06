import { authRouter } from "./router/auth";
import { historyRouter } from "./router/history";
import { scriptRouter } from "./router/script";
import { subscriptionRouter } from "./router/subscription";
import { userRouter } from "./router/user";
import { voiceRouter } from "./router/voice";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  history: historyRouter,
  script: scriptRouter,
  subscription: subscriptionRouter,
  voice: voiceRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
