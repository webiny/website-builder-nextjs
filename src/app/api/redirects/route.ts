import { contentSdk } from "@webiny/website-builder-nextjs";
import { initializeContentSdk } from "@/src/contentSdk";
import { redirectsCacheTtl } from "@/src/constants";

// We don't want to cache the response!
const noCacheHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache no-store",
    Pragma: "no-cache",
    Expires: "0"
};

const cacheControl = [
    `max-age=${redirectsCacheTtl}`,
    `s-maxage=${redirectsCacheTtl}`,
    `stale-while-revalidate=${redirectsCacheTtl - 1}`
];

const headers = {
    "Content-Type": "application/json",
    "Cache-Control": `public, ${cacheControl.join(", ")}`
};

/**
 * This route uses the Content SDK to check if there's a redirect defined for the given pathname.
 */
export async function GET(request: Request) {
    const noRedirectResponse = Response.json({ redirect: null }, { headers: noCacheHeaders });

    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("wb.tenant");
    const pathname = searchParams.get("pathname");

    if (!pathname || !tenantId) {
        return noRedirectResponse;
    }

    // Check if there's a redirect defined for the requested page.
    initializeContentSdk({ tenantId });
    const redirect = await contentSdk.getRedirectByPath(pathname);

    if (redirect) {
        return Response.json({ redirect }, { headers });
    }

    return noRedirectResponse;
}
