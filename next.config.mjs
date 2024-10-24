/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.starknet.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
