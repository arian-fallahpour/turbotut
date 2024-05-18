import { createSecureHeaders } from "next-secure-headers";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ["mongoose"] },
  // api: { bodyParser: { sizeLimit: "1mb" } },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'"],
              baseUri: "self",
              formAction: "self",
              frameAncestors: true,
            },
          },
        }),
      },
    ];
  },
};

export default nextConfig;
