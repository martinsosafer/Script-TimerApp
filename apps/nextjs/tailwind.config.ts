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
        "cp-primary-light": "#3385FF",
        "cp-primary-lightest": "#7FB2FF",
        "cp-secondary": "#FF9900",
        "cp-secondary-light": "#FFAD33",
        "cp-secondary-lightest": "#FFCB7F",
        "cp-accent": "#13EBDC",
        "cp-accent-light": "#83EFE9",
        "cp-accent-lightest": "#BDF3F0",
        "cp-black": "#212121",
        "cp-white": "#FFFFFF",
        "cp-white-ghost": "#F5F5F7",
        "cp-gray-100": "#F2F2F5",
        "cp-gray-200": "#E2E8F0",
        "cp-gray-300": "#D7D8DC",
        "cp-gray-400": "#898F98",
        "cp-gray-500": "#636D80",
      },
    },
  },
} satisfies Config;
