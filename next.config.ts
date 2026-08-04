import path from "path";
import type { NextConfig } from "next";
import { injectThemeCss } from "@webiny/sdk-nextjs/webpack.js";
import { trailingSlash } from "@/constants";

export default async (): Promise<NextConfig> => {
    // Create webpack plugins for theme injection.
    const { getPlugins } = await injectThemeCss(path.resolve("theme/theme.css"));

    // Read straight from the environment rather than through `sdk/backend`: Next compiles this config
    // on its own, and `@/*` aliases are not resolved in the files it pulls in transitively.
    const apiHost = (process.env.NEXT_PUBLIC_WEBINY_API_HOST ?? "").trim();

    return {
        devIndicators: false,
        trailingSlash,
        productionBrowserSourceMaps: false,
        images: {
            // Only a configured backend serves images. Without one there is no remote host to allow,
            // and an empty pattern list is better than one pointing at the string "undefined".
            remotePatterns: apiHost
                ? [
                      {
                          protocol: "https" as const,
                          hostname: apiHost.replace(/^https?:\/\//, ""),
                          pathname: "/**"
                      }
                  ]
                : []
        },
        // `frame-ancestors` is set in `middleware.ts` instead of here, because who may embed this
        // frontend depends on the request (see the comment there). Sending the header from both
        // places would make the browser intersect the two, and the editor's iframe would be blocked.
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
