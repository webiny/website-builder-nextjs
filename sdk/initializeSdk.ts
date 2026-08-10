import { sdk, type WebsiteBuilderThemeInput } from "@webiny/sdk-nextjs";
import { componentGroups } from "./groups";

/**
 * How long the theme artifacts are cached on the frontend, in seconds.
 *
 * Matched to their own `Cache-Control: max-age=60` from the API. Delivery serves whichever version is
 * active at a stable, version-less URL, so activating a theme in Admin reaches the live site within
 * this window on its own — no webhook to wire up and no extra route to deploy. The short timer is the
 * whole activation mechanism.
 */
const THEME_REVALIDATE_SECONDS = 60;

interface ContentSdkOptions {
    tenantId?: string;
    preview?: boolean;
    theme?: WebsiteBuilderThemeInput;
}

const initializeSdk = ({ tenantId, preview, theme }: ContentSdkOptions = {}) => {
    sdk.init({
        endpoint: String(process.env.NEXT_PUBLIC_WEBINY_API_HOST),
        token: String(process.env.NEXT_PUBLIC_WEBINY_API_KEY),
        tenant: tenantId ?? String(process.env.NEXT_PUBLIC_WEBINY_API_TENANT),
        preview,
        wb: { theme, componentGroups },
        // Active-theme consumption. `sameOrigin` makes the artifact `<link>` a relative
        // `/_webiny/theme/*` path that `createThemeRewrite` (see next.config) proxies to the API, so the
        // browser loads it CDN-cached under the site's own origin. `revalidate` re-reads the active
        // pointer on a short timer so a newly activated theme appears automatically — no webhook, no
        // extra endpoint to deploy or maintain.
        theme: {
            sameOrigin: true,
            requestInit: { next: { revalidate: THEME_REVALIDATE_SECONDS } }
        }
    });
};

export { sdk, initializeSdk };
