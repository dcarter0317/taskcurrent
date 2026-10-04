import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the local network load dev assets, so the page can hydrate.
  allowedDevOrigins: ["192.168.4.47"],
};

export default nextConfig;
