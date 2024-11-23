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
  theme: {
    extend: {
      colors: {
        "cp-background": "#F5F5F7",
        "cp-primary": "#0066FF",
        "cp-secondary": "#FF9900",
        "cp-secondary-light": "#FFAD33",
        "cp-secondary-lightest": "#FFCB7F",
        "cp-accent": "#13EBDC",
      },
    },
  },
} satisfies Config;
