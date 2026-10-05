import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the local network load dev assets, so the page can hydrate.
  allowedDevOrigins: ["192.168.4.47"],
  // The free-trial signup flow was replaced by early access.
  async redirects() {
    return [{ source: "/signup", destination: "/early-access", permanent: false }];
  },
};

export default nextConfig;
