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
    domains: [
      "xsgames.co",
      "images.unsplash.com",
      "plus.unsplash.com",
      "img.freepik.com",
      "ucc390943f4f100a05700d6f5fa3.previews.dropboxusercontent.com",
      "media.licdn.com",
      "drive.google.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "upload.wikimedia.org",
      "imgur.com",
      "i.imgur.com",
      "images.pexels.com",
      "8ipgp5xevb8hkgbh.public.blob.vercel-storage.com",
    ],
  },

  async redirects() {
    return [
      {
        source: "/texttospeech",
        destination: "/texttovoice",
        permanent: true,
      },
    ];
  },

  experimental: {
    serverActions: true,
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias["@google-cloud/speech"] = "@google-cloud/speech";
    }
    return config;
  },
};

export default config;
// Importing env files here to validate on build
//previous next.config

// import "./src/env.mjs";
// import "@voiceai/auth/env.mjs";

// /** @type {import("next").NextConfig} */
// const config = {
//   reactStrictMode: true,
//   /** Enables hot reloading for local packages without a build step */
//   transpilePackages: ["@voiceai/api", "@voiceai/auth", "@voiceai/db"],
//   /** We already do linting and typechecking as separate tasks in CI */
//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },

//   images: {
//     domains: [
//       "xsgames.co",
//       "images.unsplash.com",
//       "plus.unsplash.com",
//       "img.freepik.com",
//       "ucc390943f4f100a05700d6f5fa3.previews.dropboxusercontent.com",
//       "media.licdn.com",
//       "drive.google.com",
//       "oaidalleapiprodscus.blob.core.windows.net",
//       "upload.wikimedia.org",
//       "imgur.com",
//       "i.imgur.com",
//       "images.pexels.com",
//     ],
//   },
// };

// export default config;
