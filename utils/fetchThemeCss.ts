import { THEME_ARTIFACT_PATHS } from "@webiny/sdk-nextjs";

/**
 * The active Theme App theme's stylesheet for a tenant, or null when it has none.
 *
 * Fetched on the server and inlined, rather than linked, because the theme route reads the tenant
 * from the `x-tenant` header and a browser `<link>` cannot send one: a link would always get root's
 * theme. The tenant also goes in the query string because the API's CloudFront caches this route by
 * URL and ignores the header, so without it every tenant would be served whichever answer was cached
 * first; root, with no active theme, caches an empty 204 for all of them.
 */
export async function fetchThemeCss(tenantId: string): Promise<string | null> {
    const host = String(process.env.NEXT_PUBLIC_WEBINY_API_HOST);
    const url = `${host}${THEME_ARTIFACT_PATHS.css}?tenant=${encodeURIComponent(tenantId)}`;

    try {
        const response = await fetch(url, {
            headers: { "x-tenant": tenantId },
            // The route's own TTL: an activation reaches the site within a minute.
            next: { revalidate: 60 },
            signal: AbortSignal.timeout(5000)
        });
        if (response.status === 204 || !response.ok) {
            return null;
        }
        return await response.text();
    } catch (e) {
        console.error("Failed to fetch the theme stylesheet:", e);
        return null;
    }
}
