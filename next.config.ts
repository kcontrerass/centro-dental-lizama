import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "centrodentallizamabackend.aumenta.do",
      },
      {
        protocol: "http",
        hostname: "centrodentallizamabackend.aumenta.do",
      },
    ],
  },
};

export default nextConfig;
