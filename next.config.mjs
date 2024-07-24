/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // domains: ["coin-images.coingecko.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
