/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"], // Use the updated key
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google profile pictures
      "avatars.githubusercontent.com", // GitHub profile pictures
      "www.google.com", // Add this to allow images from Google
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
