import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const ENABLE_DRAFT_MODE_ROUTE = "/api/preview";

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
            return keepTenant(response);
        }

        // If preview mode is not enabled yet, redirect to the preview API route
        // which will enable draft mode and set the necessary cookies.
        // Passes along all query parameters.
        const url = new URL(request.url);
        url.pathname = ENABLE_DRAFT_MODE_ROUTE;

        return keepTenant(NextResponse.redirect(url));
    } else if (!previewRequested && previewMode.isEnabled) {
        // If the preview query param is missing but draft mode is enabled,
        // disable draft mode to exit preview mode.
        previewMode.disable();

        // Redirect to the same URL to clear draft mode cookies properly.
        return keepTenant(NextResponse.redirect(request.url));
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
