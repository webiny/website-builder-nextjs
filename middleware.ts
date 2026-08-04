import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { backend, isBackendConfigured } from "@/sdk/backend";

const ENABLE_DRAFT_MODE_ROUTE = "/api/preview";

/**
 * Decides who may embed this frontend in an iframe, which is what the page editor does.
 *
 * A configured instance names its own admin app(s) via `NEXT_PUBLIC_WEBINY_ADMIN_HOST`. With nothing
 * configured, this frontend is meant to be opened from any Webiny instance, and the only thing we
 * know about the admin that opened us is the origin it passes in `wb.referrer` — so we allow exactly
 * that origin, per request. Nothing here is worth clickjacking: the page holds no session and no
 * data of its own.
 *
 * This header must live in middleware rather than `next.config.ts`, because it depends on the
 * request. Two `Content-Security-Policy` headers would be intersected by the browser, so there must
 * be only one source of it.
 */
function frameAncestors(referrer: string | null): string {
    const configured = backend.adminHost
        .split(",")
        .map(host => host.trim())
        .filter(Boolean);

    if (configured.length > 0) {
        return ["'self'", ...configured].join(" ");
    }

    try {
        const { origin, protocol } = new URL(referrer ?? "");
        return protocol === "http:" || protocol === "https:" ? `'self' ${origin}` : "'self'";
    } catch {
        return "'self'";
    }
}

function allowEmbedding(response: NextResponse, request: NextRequest): NextResponse {
    const referrer = request.nextUrl.searchParams.get("wb.referrer");
    response.headers.set("Content-Security-Policy", `frame-ancestors ${frameAncestors(referrer)}`);
    return response;
}

export async function middleware(request: NextRequest) {
    const { searchParams, pathname } = request.nextUrl;
    // Check if the preview/editing flag is set.
    const previewRequested =
        searchParams.get("wb.preview") === "true" || searchParams.get("wb.editing") === "true";

    const requestHeaders = new Headers(request.headers);

    // Detect tenant id
    const tenantId = searchParams.get("wb.tenant") ?? "root";
    if (tenantId) {
        requestHeaders.set("X-Tenant", tenantId);
    }

    // Retrieve the current draft mode state for this request.
    const previewMode = await draftMode();

    if (previewRequested) {
        // If preview mode is already enabled, disable caching on the response.
        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
        // This ensures fresh content when in preview.
        if (previewMode.isEnabled) {
            response.headers.set("X-Preview-Params", searchParams.toString());
            response.headers.set(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
            );
            response.headers.set("Pragma", "no-cache");
            response.headers.set("Expires", "0");
            return allowEmbedding(response, request);
        }

        // If preview mode is not enabled yet, redirect to the preview API route
        // which will enable draft mode and set the necessary cookies.
        // Passes along all query parameters.
        const url = new URL(request.url);
        url.pathname = ENABLE_DRAFT_MODE_ROUTE;

        return NextResponse.redirect(url);
    } else if (!previewRequested && previewMode.isEnabled) {
        // If the preview query param is missing but draft mode is enabled,
        // disable draft mode to exit preview mode.
        previewMode.disable();

        // Redirect to the same URL to clear draft mode cookies properly.
        return NextResponse.redirect(request.url);
    }

    // Check if there's a redirect defined for the requested page. Redirects are stored in Webiny, so
    // there is nothing to look up when no backend is configured.
    if (isBackendConfigured) {
        const redirectsUrl = new URL(
            `/api/redirects?wb.tenant=${tenantId}&pathname=${encodeURIComponent(pathname)}`,
            request.url
        );

        try {
            const redirectResponse = await fetch(redirectsUrl);

            const { redirect } = await redirectResponse.json();
            if (redirect) {
                return NextResponse.redirect(
                    new URL(redirect.to, request.url),
                    redirect.permanent ? 308 : 307
                );
            }
        } catch {
            // Do nothing. Most probably redirect was simply not found.
        }
    }

    // For all other requests, continue as normal without any modifications.
    return allowEmbedding(
        NextResponse.next({
            request: {
                headers: requestHeaders
            }
        }),
        request
    );
}

export const config = {
    matcher: ["/((?!_next|api|static|favicon.ico|.well-known).*)"]
};
