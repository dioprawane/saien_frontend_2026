import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8090",
        pathname: "/api/showcase/assets/events/images/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8090",
        pathname: "/api/showcase/assets/events/images/**",
      },
      {
        protocol: "https",
        hostname: "api.saien.org",
        pathname: "/api/showcase/assets/events/images/**",
      },
      {
        protocol: "https",
        hostname: "saien.org",
        pathname: "/api/showcase/assets/events/images/**",
      },
      {
        protocol: "https",
        hostname: "lapi3696.odns.fr",
        pathname: "/uploads/events/images/**",
      },
      {
        protocol: "https",
        hostname: "saien.s3.eu-west-par.io.cloud.ovh.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
