import { rethrowIfNextControlFlow } from "@/utils/nextControlFlow";

/**
 * Everything that depends on a Webiny backend goes through this module.
 *
 * The starter kit is meant to run without any `NEXT_PUBLIC_WEBINY_*` variables, so that anyone can
 * open it in the page editor and build a page before they have an instance of their own. In that
 * mode there is nothing to fetch: published pages, redirects, languages, the tenant theme, and CMS
 * entries are all unavailable. Editing still works, because the editor sends the page being edited
 * to the preview over `postMessage` rather than through the API.
 */

const trimmed = (value: string | undefined) => (value ?? "").trim();

export const backend = {
    apiHost: trimmed(process.env.NEXT_PUBLIC_WEBINY_API_HOST),
    apiKey: trimmed(process.env.NEXT_PUBLIC_WEBINY_API_KEY),
    tenant: trimmed(process.env.NEXT_PUBLIC_WEBINY_API_TENANT) || "root",
    adminHost: trimmed(process.env.NEXT_PUBLIC_WEBINY_ADMIN_HOST)
};

/**
 * A backend is only usable if we know where it is. Without the host, every request would be sent to
 * the string "undefined" and throw `ERR_INVALID_URL` deep inside the SDK.
 */
export const isBackendConfigured = backend.apiHost.length > 0;

let warned = false;

/**
 * Runs a call against the Webiny API, returning `fallback` instead when there is no backend
 * configured, or when the call fails. Failures are swallowed on purpose: a page that can't reach an
 * API should render empty, not crash.
 */
export async function fromBackend<T>(fallback: T, call: () => Promise<T>): Promise<T> {
    if (!isBackendConfigured) {
        if (!warned) {
            warned = true;
            console.info(
                "[webiny] NEXT_PUBLIC_WEBINY_API_HOST is not set — running without a backend. " +
                    "Page editing works; published pages, redirects, and CMS content do not."
            );
        }
        return fallback;
    }

    try {
        return await call();
    } catch (error) {
        // SDK calls read request headers, so a static render bails out through here. Let that signal
        // pass; only genuine request failures fall back.
        rethrowIfNextControlFlow(error);
        console.error("[webiny] API request failed:", error);
        return fallback;
    }
}
