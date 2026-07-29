import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const ENABLE_DRAFT_MODE_ROUTE = "/api/preview";

/**
 * Shape of a single entry returned by the Website Builder's `GET /wb/redirects` endpoint.
 * Declared locally on purpose: middleware runs on every request, so it stays free of runtime
 * dependencies, and `@webiny/website-builder-sdk` (where this type lives) is not a direct
 * dependency of this project.
 */
interface PublicRedirect {
  id: string;
  from: string;
  to: string;
  permanent: boolean;
}

export async function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  // Check if the preview/editing flag is set.
  const previewRequested =
    searchParams.get("wb.preview") === "true" ||
    searchParams.get("wb.editing") === "true";

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
        headers: requestHeaders,
      },
    });
    // This ensures fresh content when in preview.
    if (previewMode.isEnabled) {
      response.headers.set("X-Preview-Params", searchParams.toString());
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate",
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
  //
  // This queries the Website Builder API directly rather than fetching our own /api/redirects
  // route. Fetching our own origin from middleware costs a second function invocation and a full
  // network round trip on every request, and it breaks in ways that are hard to see:
  //
  //   - Behind a local HTTPS proxy the certificate isn't trusted by the Edge runtime, so the
  //     request throws (SELF_SIGNED_CERT_IN_CHAIN) and every redirect silently stops working.
  //   - On a deployment protected by Vercel Authentication, the self-request carries no
  //     credentials and is answered with a 401 or an auth redirect instead of our route.
  //
  // Talking to the API directly avoids both: it is the only host we need to reach, and it has a
  // real certificate and its own authentication.
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST}/wb/redirects`,
      {
        headers: {
          "X-Tenant": tenantId,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Redirects lookup responded with ${response.status}.`);
    }

    const redirects: PublicRedirect[] = await response.json();
    const redirect = redirects.find((item) => item.from === pathname);

    if (redirect) {
      return NextResponse.redirect(
        new URL(redirect.to, request.url),
        redirect.permanent ? 308 : 307,
      );
    }
  } catch (err) {
    // A failed lookup must not take the page down, but it must not be silent either: swallowing it
    // is indistinguishable from "no redirect is configured" and hides real API failures.
    console.error(`[middleware] Redirect lookup failed for "${pathname}":`, err);
  }

  // For all other requests, continue as normal without any modifications.
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico|.well-known).*)"],
};
