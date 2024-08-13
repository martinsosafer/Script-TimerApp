import type { Config } from "tailwindcss";

import baseConfig from "@voiceai/tailwind-config";

const emptyArray = new Array(101).fill(0);
const withsArray = emptyArray.map((_, i) => `w-[${i}%]`);

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui-library/@/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [...withsArray],
  presets: [baseConfig],
} satisfies Config;
