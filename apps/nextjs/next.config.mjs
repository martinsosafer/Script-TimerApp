// Importing env files here to validate on build
import "./src/env.mjs";
import "@voiceai/auth/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@voiceai/api", "@voiceai/auth", "@voiceai/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["xsgames.co", "images.unsplash.com", "plus.unsplash.com"], 
  },
};

export default config;
