import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// @ts-expect-error - setupDevPlatform may not be in the types
if (process.env.NODE_ENV === 'development') {
  const { setupDevPlatform } = await import('@cloudflare/next-on-pages/next-dev');
  await setupDevPlatform();
}

export default nextConfig;
