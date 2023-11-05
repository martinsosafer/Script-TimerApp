import { authRouter } from "./router/auth";
import { voiceRouter } from "./router/voice";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  voice: voiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
