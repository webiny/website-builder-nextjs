import path from "path";
import type { NextConfig } from "next";
import { injectThemeCss } from "@webiny/website-builder-nextjs/webpack";
import { trailingSlash } from "@/src/constants";

export default async (): Promise<NextConfig> => {
    // Create webpack plugins for theme injection.
    const {getPlugins} = await injectThemeCss(path.resolve("src/theme/theme.css"));

    return {
        devIndicators: false,
        trailingSlash,
        productionBrowserSourceMaps: false,
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
        webpack: (config, { dev }) => {
            config.externals.push({
                "thread-stream": "commonjs thread-stream"
            });

            // Add plugins responsible for theme compilation.
            config.plugins.push(...getPlugins(dev));

            return config;
        }
    };
}
