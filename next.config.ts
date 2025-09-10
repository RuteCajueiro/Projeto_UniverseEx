import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mars.jpl.nasa.gov",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
