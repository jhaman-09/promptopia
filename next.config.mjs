/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"], // Use the updated key
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google profile pictures
      "avatars.githubusercontent.com", // GitHub profile pictures
    ],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
