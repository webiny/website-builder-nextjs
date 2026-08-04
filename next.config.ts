import path from "path";
import type { NextConfig } from "next";
import { injectThemeCss } from "@webiny/sdk-nextjs/webpack.js";
import { trailingSlash } from "@/constants";

export default async (): Promise<NextConfig> => {
    // Create webpack plugins for theme injection.
    const { getPlugins } = await injectThemeCss(path.resolve("theme/theme.css"));

    return {
        devIndicators: false,
        trailingSlash,
        productionBrowserSourceMaps: false,
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname:
                        String(process.env.NEXT_PUBLIC_WEBINY_API_HOST).replace(
                            "https://",
                            ""
                        ) || "",
                    pathname: "/**"
                }
            ]
        },
        async headers() {
            return [
                {
                    source: "/:path*",
                    headers: [
                        {
                            key: "Content-Security-Policy",
                            value: [
                                "frame-ancestors",
                                "http://localhost:3001",
                                ...whitelistedDomains()
                            ].join(" ")
                            // Example: "frame-ancestors http://localhost:3001 https://d3fak6u4cx01ke.cloudfront.net"
                        }
                    ]
                }
            ];
        },
        webpack: (config, context) => {
            config.externals.push({
                "thread-stream": "commonjs thread-stream",
                "pino-pretty": "commonjs pino-pretty"
            });

            // Add plugins responsible for theme compilation.
            config.plugins.push(...getPlugins(context));

            return config;
        }
    };
};

function whitelistedDomains(): string[] {
    const adminHost = process.env.NEXT_PUBLIC_WEBINY_ADMIN_HOST ?? "";
    return adminHost.split(",").map(host => host.trim());
}
