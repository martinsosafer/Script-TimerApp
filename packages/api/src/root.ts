import { authRouter } from "./router/auth";
import { historyRouter } from "./router/history";
import { monthlySpecialsRouter } from "./router/monthlySpecials";
import { promptsRouter } from "./router/prompts";
import { scriptRouter } from "./router/script";
import { subscriptionRouter } from "./router/subscription";
import { userRouter } from "./router/user";
import { voiceRouter } from "./router/voice";
import { voiceCustomRouter } from "./router/voiceCustom";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  history: historyRouter,
  script: scriptRouter,
  subscription: subscriptionRouter,
  voice: voiceRouter,
  voiceCustom: voiceCustomRouter,
  user: userRouter,
  prompts: promptsRouter,
  specials: monthlySpecialsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
