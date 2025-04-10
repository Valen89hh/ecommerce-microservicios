import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        search: '',
      },
    ],
  },
}

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Revisa cambios cada segundo
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
