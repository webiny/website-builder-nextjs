import path from "path";
import type { NextConfig } from "next";
import { injectThemeCss } from "@webiny/sdk-nextjs/webpack.js";
// Imported from `@webiny/sdk-frontend` rather than the `@webiny/sdk-nextjs` facade: the facade
// re-exports `@webiny/website-builder-nextjs`, whose ESM output does an extensionless
// `import "next/image"` that Node's ESM loader (used to load this config) cannot resolve.
import { createThemeRewrite } from "@webiny/sdk-frontend";
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
                        String(process.env.NEXT_PUBLIC_WEBINY_API_HOST).replace("https://", "") ||
                        "",
                    pathname: "/**"
                }
            ]
        },
        async rewrites() {
            // Proxy `/_webiny/theme/*` to the Webiny API so the browser loads the immutable theme
            // artifacts from the site's own origin (CDN-cached under the site domain) rather than
            // cross-origin. Paired with `sameOrigin: true` on the SDK; a no-op if the API host is unset.
            const apiHost = process.env.NEXT_PUBLIC_WEBINY_API_HOST;
            return apiHost ? [createThemeRewrite(apiHost)] : [];
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
