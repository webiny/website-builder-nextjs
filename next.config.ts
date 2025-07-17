import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    // this will allow your website to be framed under the specified domains for live editing
                    {
                        key: "Content-Security-Policy",
                        value: "frame-ancestors http://localhost:3001"
                        // Example: "frame-ancestors http://localhost:3001 https://d3fak6u4cx01ke.cloudfront.net"
                    }
                ]
            }
        ];
    },
    webpack: config => {
        config.externals.push({
            "thread-stream": "commonjs thread-stream"
        });
        return config;
    }
};

export default nextConfig;
