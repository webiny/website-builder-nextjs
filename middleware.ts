import { NextResponse, type NextRequest } from "next/server";

const ENABLE_DRAFT_MODE_ROUTE = "/api/preview";

/**
 * The cookie Next.js carries draft mode in.
 *
 * Read directly, because `draftMode()` does not report enabled state in middleware — it is for
 * Server Components and Route Handlers. Asking it here returned `isEnabled: false` whether the
 * cookie was present or not, which made the hand-off below unconditional: every preview request
 * redirected to /api/preview, which enabled draft mode and redirected back, forever. The editor's
 * canvas never loaded.
 *
 * The name is Next's internal one, which is the price of doing this in middleware at all.
 */
const DRAFT_MODE_COOKIE = "__prerender_bypass";

/**
 * The tenant a visitor arrived at with `?wb.tenant=`, kept for the rest of their visit.
 *
 * A composed page's links are plain paths, so without this a click inside a migrated tenant's site
 * fell back to root and rendered root's page at the same path — the same site's content, from the
 * wrong tenant, with nothing showing it (2026-10-09). Session-scoped (no expiry), so it ends with the
 * browser session, and `?wb.tenant=` always overrides it: `?wb.tenant=root` clears it.
 */
const TENANT_COOKIE = "wb_tenant";

export async function middleware(request: NextRequest) {
    const { searchParams, pathname } = request.nextUrl;
    // Check if the preview/editing flag is set.
    const previewRequested =
        searchParams.get("wb.preview") === "true" || searchParams.get("wb.editing") === "true";

    const requestHeaders = new Headers(request.headers);

    // Detect tenant id: the query parameter, else the visit's tenant, else root.
    const tenantParam = searchParams.get("wb.tenant");
    const tenantId = tenantParam ?? request.cookies.get(TENANT_COOKIE)?.value ?? "root";
    const keepTenant = (response: NextResponse): NextResponse => {
        if (tenantParam === null) {
            return response;
        }
        if (tenantParam === "root") {
            response.cookies.delete(TENANT_COOKIE);
        } else {
            response.cookies.set(TENANT_COOKIE, tenantParam, {
                path: "/",
                httpOnly: true,
                sameSite: "lax"
            });
        }
        return response;
    };
    if (tenantId) {
        requestHeaders.set("X-Tenant", tenantId);
    }

    // Retrieve the current draft mode state for this request.
    const previewEnabled = Boolean(request.cookies.get(DRAFT_MODE_COOKIE));

    if (previewRequested) {
        // If preview mode is already enabled, disable caching on the response.
        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
        // This ensures fresh content when in preview.
        if (previewEnabled) {
            response.headers.set("X-Preview-Params", searchParams.toString());
            response.headers.set(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
            );
            response.headers.set("Pragma", "no-cache");
            response.headers.set("Expires", "0");
            return keepTenant(response);
        }

        // If preview mode is not enabled yet, redirect to the preview API route
        // which will enable draft mode and set the necessary cookies.
        // Passes along all query parameters.
        const url = new URL(request.url);
        url.pathname = ENABLE_DRAFT_MODE_ROUTE;

        return keepTenant(NextResponse.redirect(url));
    } else if (previewEnabled) {
        /*
         * The preview flag is gone but draft mode is still on, so exit preview.
         *
         * By clearing the cookie on the response rather than calling `previewMode.disable()`, which
         * is unavailable here for the same reason `isEnabled` is. Clearing it on this response
         * matters: the redirected request must not arrive still carrying the cookie, or this branch
         * fires again and becomes its own loop.
         */
        const response = NextResponse.redirect(request.url);
        response.cookies.delete(DRAFT_MODE_COOKIE);
        return keepTenant(response);
    }

    // Check if there's a redirect defined for the requested page.
    const redirectsUrl = new URL(
        `/api/redirects?wb.tenant=${tenantId}&pathname=${encodeURIComponent(pathname)}`,
        request.url
    );

    try {
        const redirectResponse = await fetch(redirectsUrl);

        const { redirect } = await redirectResponse.json();
        if (redirect) {
            return keepTenant(
                NextResponse.redirect(
                    new URL(redirect.to, request.url),
                    redirect.permanent ? 308 : 307
                )
            );
        }
    } catch {
        // Do nothing. Most probably redirect was simply not found.
    }

    // For all other requests, continue as normal without any modifications.
    return keepTenant(
        NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    );
}

export const config = {
    matcher: ["/((?!_next|api|static|favicon.ico|.well-known).*)"]
};
