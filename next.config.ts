// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
        ],
    },

    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@backend": path.resolve(__dirname, "../backend/src"), // alias backend
        };
        return config;
    },
};

export default nextConfig;
