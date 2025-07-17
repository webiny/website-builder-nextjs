import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    // this will allow site to be framed under the specified domains for live editing
                    {
                        key: "Content-Security-Policy",
                        value: "frame-ancestors http://localhost:3001"
                    }
                ]
            }
        ];
    },
    webpack: (config, context) => {
        config.externals.push({
            "thread-stream": "commonjs thread-stream"
        });
        return config;
    }
};

export default nextConfig;
