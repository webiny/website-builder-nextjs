import path from "path";
import type { NextConfig } from "next";
import { injectThemeCss } from "@webiny/website-builder-nextjs/webpack";
import { trailingSlash } from "@/src/constants";

export default async (): Promise<NextConfig> => {
    // Create webpack plugins for theme injection.
    const { getPlugins } = await injectThemeCss(path.resolve("src/theme/theme.css"));

    return {
        devIndicators: false,
        trailingSlash,
        productionBrowserSourceMaps: false,
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
                "thread-stream": "commonjs thread-stream"
            });

            // Add plugins responsible for theme compilation.
            config.plugins.push(...getPlugins(context));

            return config;
        }
    };
}

function whitelistedDomains(): string[] {
    const adminHost = process.env.NEXT_PUBLIC_WEBSITE_BUILDER_ADMIN_HOST ?? "";
    return adminHost.split(",").map(host => host.trim());
}
