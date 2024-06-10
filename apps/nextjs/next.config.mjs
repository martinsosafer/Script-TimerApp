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
<<<<<<< HEAD
    domains: [
      "xsgames.co",
      "images.unsplash.com",
      "img.freepik.com",
      "ucc390943f4f100a05700d6f5fa3.previews.dropboxusercontent.com",
      "media.licdn.com",
    ],
=======
    domains: ["xsgames.co", "images.unsplash.com", "plus.unsplash.com"], 
>>>>>>> 76ca18f9bfdc63c0560263c196621e33818500a9
  },
};

export default config;
