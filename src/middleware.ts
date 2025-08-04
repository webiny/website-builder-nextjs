import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { initializeContentSdk } from "@/src/contentSdk";

const ENABLE_DRAFT_MODE_ROUTE = "/api/preview";

export async function middleware(request: NextRequest) {
    const { searchParams, pathname } = request.nextUrl;
    // Check if the preview/editing flag is set.
    const previewRequested =
        searchParams.get("wb.preview") === "true" || searchParams.get("wb.editing") === "true";

    const requestHeaders = new Headers(request.headers);

    // Detect tenant id
    const tenantId = searchParams.get("wb.tenant") ?? undefined;
    if (tenantId) {
        requestHeaders.set("X-Tenant", tenantId);
    }

    const requestHeaders = new Headers(request.headers);

    // Detect tenant id
    const tenantId = searchParams.get("wb.tenant");
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
            return response;
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

    // Check if there's a redirect defined for the requested page.
    initializeContentSdk({ tenantId });

    const redirect = await contentSdk.getRedirectByPath(pathname);
    if (redirect) {
        return NextResponse.redirect(new URL(redirect.to, request.url), redirect.permanent ? 308 : 307);
    }

    // For all other requests, continue as normal without any modifications.
    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}

export const config = {
    matcher: [
        "/((?!_next|api|static|favicon.ico|.well-known).*)"
    ]
};
