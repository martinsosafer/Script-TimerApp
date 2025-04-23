import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as elevenLabsCredit from "./schema/11LabsCredits";
import * as appSumoSubscription from "./schema/appSumoSubscrition";
import * as auth from "./schema/auth";
import * as clCredit from "./schema/copyLeaksCredit";
import * as credit from "./schema/credit";
import * as generation from "./schema/generation";
import * as imgCredit from "./schema/imgCredit";
import * as landingPage from "./schema/landingPage";
import * as monthlySpecials from "./schema/monthlySpecials";
import * as openAiCredit from "./schema/openAiCredit";
import * as plagiarism from "./schema/plagiarism";
import * as promptCategory from "./schema/prompt_category";
import * as promptSubcategory from "./schema/prompt_subcategory";
import * as prompts from "./schema/prompts";
import * as script from "./schema/script";
import * as soundEffects from "./schema/soundEffects";
import * as subscription from "./schema/subscription";
import * as voice from "./schema/voice";
import * as voiceCustom from "./schema/voiceCustom";

export const schema = {
  ...auth,
  ...credit,
  ...generation,
  ...script,
  ...subscription,
  ...voice,
  ...voiceCustom,
  ...plagiarism,
  ...clCredit,
  ...elevenLabsCredit,
  ...imgCredit,
  ...openAiCredit,
  ...prompts,
  ...monthlySpecials,
  ...landingPage,
  ...promptCategory,
  ...promptSubcategory,
  ...appSumoSubscription,
  ...soundEffects,
};

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
