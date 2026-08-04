/**
 * Next.js uses thrown values for control flow, not just for failures: bailing out of a static render
 * when a request-time API is touched, `redirect()`, `notFound()`, and React's postpone signal. Each
 * one carries a `digest`, and each one has to reach the framework to be acted on.
 *
 * A `catch` that swallows one of them leaves the render in a state Next can't recover from, which
 * surfaces later as the opaque `DYNAMIC_SERVER_USAGE` error in production builds — the render never
 * got the chance to switch from static to dynamic.
 *
 * Call this first in any `catch` wrapping code that might reach `headers()`, `cookies()`,
 * `draftMode()`, or a data fetch that uses them.
 */
export function rethrowIfNextControlFlow(error: unknown): void {
    if (typeof error !== "object" || error === null) {
        return;
    }

    // React's postpone signal, used by Partial Prerendering.
    if ((error as { $$typeof?: symbol }).$$typeof === Symbol.for("react.postpone")) {
        throw error;
    }

    const digest = (error as { digest?: unknown }).digest;

    if (typeof digest !== "string") {
        return;
    }

    // `DYNAMIC_SERVER_USAGE` is the static-render bail-out; `NEXT_*` covers redirect(), notFound(),
    // and the HTTP error fallbacks; the last one is React bailing out to client rendering.
    if (
        digest === "DYNAMIC_SERVER_USAGE" ||
        digest === "BAILOUT_TO_CLIENT_SIDE_RENDERING" ||
        digest.startsWith("NEXT_")
    ) {
        throw error;
    }
}
