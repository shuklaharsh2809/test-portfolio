import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic's GitHub setup runs on 127.0.0.1 (for the OAuth callback); let the dev server serve it there.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
